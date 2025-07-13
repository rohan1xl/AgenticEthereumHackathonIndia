import React, { useState, useEffect } from 'react';
import { X, Download, Share2, ExternalLink, FileText, Image, AlertCircle } from 'lucide-react';

interface CertificateViewerProps {
  certificate: {
    ipfsHash: string;
    courseName: string;
    institution: string;
    issueDate: string;
    grade?: string;
    instructor?: string;
    description?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const CertificateViewer: React.FC<CertificateViewerProps> = ({ certificate, isOpen, onClose }) => {
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileType, setFileType] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isOpen && certificate.ipfsHash) {
      loadCertificate();
    }
  }, [isOpen, certificate.ipfsHash]);

  const loadCertificate = async () => {
    setLoading(true);
    setError('');
    
    try {
      const pinataUrl = `https://gateway.pinata.cloud/ipfs/${certificate.ipfsHash}`;
      
      // First, try to fetch the file to determine its type
      const response = await fetch(pinataUrl);
      if (!response.ok) {
        throw new Error('Certificate file not found');
      }

      const contentType = response.headers.get('content-type');
      setFileType(contentType || '');
      setFileUrl(pinataUrl);
    } catch (err) {
      console.error('Error loading certificate:', err);
      setError('Failed to load certificate. It may not be uploaded yet or the IPFS hash is invalid.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${certificate.courseName}_Certificate.${getFileExtension()}`;
    link.click();
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/certificate/${certificate.ipfsHash}`;
    navigator.clipboard.writeText(shareUrl);
    // You could add a toast notification here
  };

  const getFileExtension = (): string => {
    if (fileType.includes('pdf')) return 'pdf';
    if (fileType.includes('image')) return 'jpg';
    return 'pdf'; // default
  };

  const renderCertificateContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-slate-400">Loading certificate...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 mb-4">{error}</p>
            <p className="text-slate-400 text-sm">
              This certificate may not be uploaded yet. Try again later or contact the institution.
            </p>
          </div>
        </div>
      );
    }

    if (fileType.includes('pdf')) {
      return (
        <iframe
          src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
          className="w-full h-96 border-0 rounded-lg"
          title="Certificate PDF"
        />
      );
    }

    if (fileType.includes('image')) {
      return (
        <div className="flex justify-center">
          <img
            src={fileUrl}
            alt={`${certificate.courseName} Certificate`}
            className="max-w-full max-h-96 object-contain rounded-lg"
            onError={() => setError('Failed to load certificate image')}
          />
        </div>
      );
    }

    // Fallback for other file types
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-400 mb-4">Certificate file loaded</p>
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 underline"
          >
            Open in new tab
          </a>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h3 className="text-xl font-bold text-white">{certificate.courseName}</h3>
            <p className="text-slate-400">{certificate.institution}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={handleShare}
              className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Info */}
        <div className="p-6 border-b border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Issue Date:</span>
              <p className="text-white">{new Date(certificate.issueDate).toLocaleDateString()}</p>
            </div>
            {certificate.grade && (
              <div>
                <span className="text-slate-400">Grade:</span>
                <p className="text-white">{certificate.grade}</p>
              </div>
            )}
            {certificate.instructor && (
              <div>
                <span className="text-slate-400">Instructor:</span>
                <p className="text-white">{certificate.instructor}</p>
              </div>
            )}
          </div>
          {certificate.description && (
            <div className="mt-4">
              <span className="text-slate-400">Description:</span>
              <p className="text-white text-sm mt-1">{certificate.description}</p>
            </div>
          )}
        </div>

        {/* Certificate Content */}
        <div className="p-6">
          {renderCertificateContent()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700 bg-slate-900/50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <ExternalLink className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">IPFS Hash:</span>
              <span className="text-white font-mono">{certificate.ipfsHash}</span>
            </div>
            <a
              href={`https://gateway.pinata.cloud/ipfs/${certificate.ipfsHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              View on Pinata IPFS
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateViewer; 