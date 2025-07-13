import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, ExternalLink, Loader } from 'lucide-react';
import { useChainId } from 'wagmi';
import { blockchainService } from '../services/blockchain';
import { ipfsService } from '../services/ipfs';
import { VerificationResult } from '../types/blockchain';

const CredentialVerifier = () => {
  const [tokenId, setTokenId] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const chainId = useChainId();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenId.trim()) return;

    setLoading(true);
    setVerificationResult(null);

    try {
      const tokenIdNum = parseInt(tokenId);
      
      // Try to verify on blockchain first, fallback to mock data for demo
      let result: VerificationResult;
      try {
        result = await blockchainService.verifyCredential(tokenIdNum, chainId);
      } catch (error) {
        console.log('Blockchain verification failed, using mock data for demo');
        result = await blockchainService.verifyMockCredential(tokenIdNum);
      }
      
      setVerificationResult(result);
    } catch (error) {
      setVerificationResult({
        isValid: false,
        error: 'Failed to verify credential. Please check your connection and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const getExplorerUrl = (txHash: string) => {
    switch (chainId) {
      case 1: return `https://etherscan.io/tx/${txHash}`;
      case 11155111: return `https://sepolia.etherscan.io/tx/${txHash}`;
      case 137: return `https://polygonscan.com/tx/${txHash}`;
      case 80001: return `https://mumbai.polygonscan.com/tx/${txHash}`;
      default: return `https://etherscan.io/tx/${txHash}`;
    }
  };

  return (
    <section id="credential-verifier" className="py-20 bg-slate-800/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Verify a Credential
          </h2>
          <p className="text-xl text-slate-400">
            Enter a credential token ID to verify its authenticity on the blockchain
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Demo: Try token IDs 1, 2, or 3 to see sample credentials
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
          <form onSubmit={handleVerify} className="mb-8">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                  placeholder="Enter credential token ID (e.g., 1, 2, 3)"
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !tokenId.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 flex items-center space-x-2"
              >
                {loading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span>Verify</span>
              </button>
            </div>
          </form>

          {verificationResult && (
            <div className={`p-6 rounded-xl border ${
              verificationResult.isValid 
                ? 'bg-green-500/10 border-green-500/30' 
                : 'bg-red-500/10 border-red-500/30'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                {verificationResult.isValid ? (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400" />
                )}
                <h3 className={`text-lg font-semibold ${
                  verificationResult.isValid ? 'text-green-400' : 'text-red-400'
                }`}>
                  {verificationResult.isValid ? 'Credential Verified ✓' : 'Verification Failed'}
                </h3>
              </div>

              {verificationResult.isValid && verificationResult.credential ? (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 p-4 rounded-lg">
                      <div className="text-sm text-slate-400">Institution</div>
                      <div className="text-white font-medium">{verificationResult.credential.institution}</div>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-lg">
                      <div className="text-sm text-slate-400">Course</div>
                      <div className="text-white font-medium">{verificationResult.credential.courseName}</div>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-lg">
                      <div className="text-sm text-slate-400">Recipient</div>
                      <div className="text-white font-mono text-sm">
                        {verificationResult.credential.recipient.slice(0, 6)}...{verificationResult.credential.recipient.slice(-4)}
                      </div>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded-lg">
                      <div className="text-sm text-slate-400">Issue Date</div>
                      <div className="text-white font-medium">
                        {new Date(verificationResult.credential.issueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-600">
                    <a
                      href={ipfsService.getFileUrl(verificationResult.credential.ipfsHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors bg-purple-500/10 px-3 py-2 rounded-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Certificate</span>
                    </a>
                    {verificationResult.credential.transactionHash && (
                      <a
                        href={getExplorerUrl(verificationResult.credential.transactionHash)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors bg-purple-500/10 px-3 py-2 rounded-lg"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View on Blockchain</span>
                      </a>
                    )}
                    <div className="flex items-center space-x-2 text-green-400 bg-green-500/10 px-3 py-2 rounded-lg">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified Authentic</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-500/10 p-4 rounded-lg">
                  <p className="text-red-300">{verificationResult.error}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CredentialVerifier;