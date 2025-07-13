import React from 'react';

const BlockchainCube = () => {
  return (
    <div className="relative w-full h-96 flex items-center justify-center perspective-1000">
      {/* Main Blockchain Cube */}
      <div className="blockchain-cube-container">
        <div className="blockchain-cube">
          {/* Front Face */}
          <div className="cube-face front">
            <div className="block-grid">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="block-cell" style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
          
          {/* Back Face */}
          <div className="cube-face back">
            <div className="block-grid">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="block-cell" style={{ animationDelay: `${i * 0.15}s` }}></div>
              ))}
            </div>
          </div>
          
          {/* Right Face */}
          <div className="cube-face right">
            <div className="block-grid">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="block-cell" style={{ animationDelay: `${i * 0.12}s` }}></div>
              ))}
            </div>
          </div>
          
          {/* Left Face */}
          <div className="cube-face left">
            <div className="block-grid">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="block-cell" style={{ animationDelay: `${i * 0.08}s` }}></div>
              ))}
            </div>
          </div>
          
          {/* Top Face */}
          <div className="cube-face top">
            <div className="block-grid">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="block-cell" style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
          </div>
          
          {/* Bottom Face */}
          <div className="cube-face bottom">
            <div className="block-grid">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="block-cell" style={{ animationDelay: `${i * 0.18}s` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Connection Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-30">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              className="connection-line"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default BlockchainCube;