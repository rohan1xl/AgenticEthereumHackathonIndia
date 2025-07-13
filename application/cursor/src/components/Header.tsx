import React, { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import WalletConnect from './WalletConnect';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="EduCred Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold text-white">EduCred</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-purple-400 transition-colors">Features</a>
            <a href="#how-it-works" className="text-slate-300 hover:text-purple-400 transition-colors">How It Works</a>
            <a href="#institutions" className="text-slate-300 hover:text-purple-400 transition-colors">For Institutions</a>
            <a href="#faq" className="text-slate-300 hover:text-purple-400 transition-colors">FAQ</a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <WalletConnect />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-slate-300 hover:text-purple-400 transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-300 hover:text-purple-400 transition-colors">How It Works</a>
              <a href="#institutions" className="text-slate-300 hover:text-purple-400 transition-colors">For Institutions</a>
              <a href="#faq" className="text-slate-300 hover:text-purple-400 transition-colors">FAQ</a>
              <div className="pt-4">
                <WalletConnect />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;