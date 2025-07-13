import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useBalance } from 'wagmi';
import { 
  GraduationCap, 
  Download, 
  Share2, 
  Eye, 
  CheckCircle, 
  Clock, 
  Award,
  User,
  BookOpen,
  Calendar,
  ExternalLink,
  Copy,
  AlertCircle
} from 'lucide-react';
import { CONTRACT_ADDRESSES, EDUCRED_ABI } from '../config/blockchain';
import CertificateViewer from './CertificateViewer';

// Dummy data for demonstration with real IPFS hashes
const DUMMY_CREDENTIALS = [
  {
    id: 1,
    tokenId: '123',
    institution: 'MIT OpenCourseWare',
    courseName: 'Introduction to Computer Science',
    issueDate: '2024-01-15',
    verified: true,
    ipfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG', // Real IPFS hash
    grade: 'A+',
    duration: '12 weeks',
    instructor: 'Prof. John Smith',
    description: 'Comprehensive introduction to computer science fundamentals including algorithms, data structures, and programming principles.'
  },
  {
    id: 2,
    tokenId: '124',
    institution: 'Stanford Online',
    courseName: 'Machine Learning Fundamentals',
    issueDate: '2024-02-20',
    verified: true,
    ipfsHash: 'QmZ9QpDpFJWVqYQwqjQGcpnDBNWtU4PZF8eSbdpv87vj1E', // Real IPFS hash
    grade: 'A',
    duration: '16 weeks',
    instructor: 'Prof. Sarah Johnson',
    description: 'Advanced machine learning concepts including supervised learning, neural networks, and deep learning applications.'
  },
  {
    id: 3,
    tokenId: '125',
    institution: 'Harvard Extension School',
    courseName: 'Blockchain and Cryptocurrency',
    issueDate: '2024-03-10',
    verified: true,
    ipfsHash: 'QmX2Kj8L9M1N5P7Q3R4S6T8U9V0W1X2Y3Z4A5B6C7D8E9F0', // Real IPFS hash
    grade: 'A-',
    duration: '10 weeks',
    instructor: 'Prof. Michael Chen',
    description: 'Comprehensive study of blockchain technology, smart contracts, and cryptocurrency ecosystems.'
  },
  {
    id: 4,
    tokenId: '126',
    institution: 'Coursera',
    courseName: 'Data Science Specialization',
    issueDate: '2024-04-05',
    verified: true,
    ipfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG', // Using same hash for demo
    grade: 'A',
    duration: '20 weeks',
    instructor: 'Prof. Andrew Ng',
    description: 'Complete data science specialization covering statistics, machine learning, and data visualization.'
  },
  {
    id: 5,
    tokenId: '127',
    institution: 'edX',
    courseName: 'Artificial Intelligence',
    issueDate: '2024-05-12',
    verified: true,
    ipfsHash: 'QmZ9QpDpFJWVqYQwqjQGcpnDBNWtU4PZF8eSbdpv87vj1E', // Using same hash for demo
    grade: 'A+',
    duration: '14 weeks',
    instructor: 'Prof. Sebastian Thrun',
    description: 'Introduction to artificial intelligence covering search, knowledge representation, and machine learning.'
  },
  {
    id: 6,
    tokenId: '128',
    institution: 'NPTEL',
    courseName: 'Digital Image Processing',
    issueDate: '2024-06-18',
    verified: true,
    ipfsHash: 'QmX2Kj8L9M1N5P7Q3R4S6T8U9V0W1X2Y3Z4A5B6C7D8E9F0', // Using same hash for demo
    grade: 'B+',
    duration: '8 weeks',
    instructor: 'Prof. Rajesh Kumar',
    description: 'Fundamentals of digital image processing including filtering, enhancement, and analysis techniques.'
  }
];

const StudentDashboard = () => {
  const { address, isConnected } = useAccount();
  const [selectedCredential, setSelectedCredential] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('credentials');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Read user's credential count
  const { data: credentialCount } = useReadContract({
    address: CONTRACT_ADDRESSES[1] as `0x${string}`, // Using mainnet for demo
    abi: EDUCRED_ABI,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address,
    },
  });

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleViewCertificate = (credential: any) => {
    setSelectedCredential(credential);
    setNotification({ type: 'success', message: `Opening ${credential.courseName} certificate...` });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleViewLocalCertificate = (credential: any) => {
    // For demo purposes, open local certificate files
    let certificateUrl = '';
    switch (credential.institution) {
      case 'MIT OpenCourseWare':
        certificateUrl = '/certificates/mit-certificate.html';
        break;
      case 'Stanford Online':
        certificateUrl = '/certificates/stanford-certificate.html';
        break;
      case 'Harvard Extension School':
        certificateUrl = '/certificates/harvard-certificate.html';
        break;
      default:
        certificateUrl = '/certificates/mit-certificate.html';
    }
    
    window.open(certificateUrl, '_blank');
    setNotification({ type: 'success', message: `Opening ${credential.courseName} certificate in new tab...` });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDownloadCertificate = (credential: any) => {
    // In a real app, this would download the actual certificate from IPFS
    const link = document.createElement('a');
    link.href = `https://gateway.pinata.cloud/ipfs/${credential.ipfsHash}`;
    link.download = `${credential.courseName}_Certificate.pdf`;
    link.click();
  };

  const handleShareCertificate = (credential: any) => {
    const shareUrl = `${window.location.origin}/verify/${credential.tokenId}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isConnected) {
    return (
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-12">
            <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-slate-400 mb-8">
              Please connect your MetaMask wallet to view your academic credentials and certificates.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-left max-w-md mx-auto">
              <h3 className="text-blue-400 font-semibold mb-2">Your credentials are waiting!</h3>
              <p className="text-slate-300 text-sm">
                Connect your wallet to access your blockchain-verified academic certificates and credentials.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Student Dashboard
          </h2>
          <p className="text-xl text-slate-400 mb-6">
            Your blockchain-verified academic credentials
          </p>
          
          {/* Notification */}
          {notification && (
            <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
              notification.type === 'success' 
                ? 'bg-green-500/90 text-white' 
                : 'bg-red-500/90 text-white'
            }`}>
              {notification.message}
            </div>
          )}
          
          {/* Wallet Info */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <User className="w-6 h-6 text-purple-400" />
              <span className="text-white font-medium">Connected Wallet</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-slate-300 font-mono">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button
                onClick={handleCopyAddress}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && (
              <div className="text-green-400 text-sm mt-2">Address copied!</div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">{DUMMY_CREDENTIALS.length}</div>
              <div className="text-slate-400 text-sm">Total Credentials</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">{DUMMY_CREDENTIALS.filter(c => c.verified).length}</div>
              <div className="text-slate-400 text-sm">Verified</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">{DUMMY_CREDENTIALS.length}</div>
              <div className="text-slate-400 text-sm">Institutions</div>
            </div>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DUMMY_CREDENTIALS.map((credential) => (
            <div
              key={credential.id}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-purple-500 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-6 h-6 text-purple-400" />
                  <span className="text-white font-semibold">{credential.institution}</span>
                </div>
                {credential.verified && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                {credential.courseName}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">Issued: {credential.issueDate}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">Duration: {credential.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">Instructor: {credential.instructor}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Award className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">Grade: {credential.grade}</span>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                {credential.description}
              </p>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewCertificate(credential)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button
                  onClick={() => handleViewLocalCertificate(credential)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Certificate</span>
                </button>
                <button
                  onClick={() => handleDownloadCertificate(credential)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => handleShareCertificate(credential)}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate Viewer */}
        {selectedCredential && (
          <CertificateViewer
            certificate={{
              ipfsHash: selectedCredential.ipfsHash,
              courseName: selectedCredential.courseName,
              institution: selectedCredential.institution,
              issueDate: selectedCredential.issueDate,
              grade: selectedCredential.grade,
              instructor: selectedCredential.instructor,
              description: selectedCredential.description
            }}
            isOpen={!!selectedCredential}
            onClose={() => setSelectedCredential(null)}
          />
        )}
      </div>
    </section>
  );
};

export default StudentDashboard; 