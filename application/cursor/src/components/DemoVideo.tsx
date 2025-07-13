import React, { useState } from 'react';
import { X, Play, ExternalLink } from 'lucide-react';

interface DemoVideoProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoVideo: React.FC<DemoVideoProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h3 className="text-2xl font-bold text-white">Watch Demo</h3>
            <p className="text-slate-400">See how EduCred works in action</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Container */}
        <div className="p-6">
          <div className="relative bg-slate-900 rounded-lg overflow-hidden">
            <div style={{ paddingBottom: '56.25%', position: 'relative' }}>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/HsMpt48mSMg?color=white&fs=0&rel=0" 
                frameBorder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"  
                style={{ position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%' }}
                onLoad={() => setIsPlaying(true)}
              >
                <small>Powered by <a href="https://embed.tube/embed-code-generator/youtube/">youtube embed video</a> generator</small>
              </iframe>
            </div>
          </div>

          {/* Video Info */}
          <div className="mt-6 bg-slate-900 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-3">EduCred Platform Demo</h4>
            <p className="text-slate-300 mb-4">
              Watch this comprehensive demo to see how EduCred revolutionizes academic credential verification 
              using blockchain technology and IPFS storage.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Play className="w-4 h-4 text-purple-400" />
                <span className="text-slate-400">Demo Video</span>
              </div>
              <div className="flex items-center space-x-2">
                <ExternalLink className="w-4 h-4 text-blue-400" />
                <a 
                  href="https://www.youtube.com/watch?v=HsMpt48mSMg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoVideo; 