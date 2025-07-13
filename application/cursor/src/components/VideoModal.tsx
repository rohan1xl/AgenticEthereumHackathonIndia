import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-purple-400 transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Video Container */}
        <div className="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
          {/* Video Header */}
          <div className="bg-slate-800/50 border-b border-slate-700 px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-slate-400 text-sm font-medium">EduCred Demo Video</div>
            </div>
          </div>

          {/* YouTube Video */}
          <div className="relative aspect-video bg-slate-900">
            <div style={{ paddingBottom: '56.25%', position: 'relative' }}>
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/HsMpt48mSMg?color=white&fs=0&rel=0" 
                frameBorder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"  
                style={{ position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%' }}
                className="rounded-lg"
              >
                <small>Powered by <a href="https://embed.tube/embed-code-generator/youtube/">youtube embed video</a> generator</small>
              </iframe>
            </div>
          </div>

          {/* Video Footer */}
          <div className="bg-slate-800/50 border-t border-slate-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-slate-400 text-sm">
                Watch how EduCred revolutionizes credential verification
              </div>
              <div className="flex items-center space-x-4">
                <a 
                  href="https://www.youtube.com/watch?v=HsMpt48mSMg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
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

export default VideoModal;