import React, { useState, useEffect } from 'react';
import { Award, ExternalLink, Download, Share2, Eye, Calendar, Building } from 'lucide-react';
import { useAccount, useChainId } from 'wagmi';
import { blockchainService } from '../services/blockchain';
import { ipfsService } from '../services/ipfs';
import { Credential } from '../types/blockchain';

const UserCredentials = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected && address) {
      loadCredentials();
    }
  }, [isConnected, address, chainId]);

  const loadCredentials = async () => {
    if (!address) return;
    
    setLoading(true);
    try {
      // Try to load from blockchain, fallback to mock data for demo
      let userCredentials: Credential[];
      try {
        userCredentials = await blockchainService.getCredentialsByOwner(address, chainId);
      } catch (error) {
        console.log('Blockchain query failed, using mock data for demo');
        userCredentials = blockchainService.getMockCredentials();
      }
      
      setCredentials(userCredentials);
    } catch (error) {
      console.error('Failed to load credentials:', error);
    } finally {
      setLoading(false);
    }
  };

  const shareCredential = (credential: Credential) => {
    const shareUrl = `${window.location.origin}/#credential-verifier`;
    const shareText = `Check out my verified ${credential.courseName} certificate from ${credential.institution}! Verify it at ${shareUrl} using token ID: ${credential.tokenId}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Blockchain Credential',
        text: shareText,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Share link copied to clipboard!');
    }
  };

  const downloadCertificate = (credential: Credential) => {
    const url = ipfsService.getFileUrl(credential.ipfsHash);
    window.open(url, '_blank');
  };

  if (!isConnected) {
    return (
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-12">
            <Award className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">
              View Your Credentials
            </h2>
            <p className="text-slate-400 mb-8">
              Connect your wallet to view and manage your blockchain credentials
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-800/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            My Credentials
          </h2>
          <p className="text-xl text-slate-400">
            Your verified blockchain credentials portfolio
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-2 text-slate-400">
              <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Loading your credentials...</span>
            </div>
          </div>
        ) : credentials.length === 0 ? (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No Credentials Found</h3>
            <p className="text-slate-500">
              You don't have any blockchain credentials yet. Complete a course to earn your first credential!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {credentials.map((credential) => (
              <div
                key={credential.id}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Award className="w-6 h-6 text-purple-400" />
                    <span className="text-xs font-medium text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full">
                      Token #{credential.tokenId}
                    </span>
                  </div>
                  {credential.verified && (
                    <div className="flex items-center space-x-1 text-green-400 text-xs">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Verified</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                    {credential.courseName}
                  </h3>
                  
                  <div className="flex items-center space-x-2 text-slate-400">
                    <Building className="w-4 h-4" />
                    <span className="text-sm">{credential.institution}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(credential.issueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => downloadCertificate(credential)}
                    className="flex-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  
                  <button
                    onClick={() => shareCredential(credential)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>IPFS: {credential.ipfsHash.slice(0, 8)}...</span>
                    <a
                      href={`https://etherscan.io/tx/${credential.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 hover:text-purple-400 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Blockchain</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {credentials.length > 0 && (
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{credentials.length}</div>
              <div className="text-slate-400 text-sm">Total Credentials</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {new Set(credentials.map(c => c.institution)).size}
              </div>
              <div className="text-slate-400 text-sm">Institutions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {credentials.filter(c => c.verified).length}
              </div>
              <div className="text-slate-400 text-sm">Verified</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserCredentials;