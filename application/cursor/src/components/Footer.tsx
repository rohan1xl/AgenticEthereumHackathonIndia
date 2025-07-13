import React from 'react';
import { Shield, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Shield className="w-8 h-8 text-purple-400" />
                <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-sm"></div>
              </div>
              <span className="text-xl font-bold text-white">EduCred</span>
            </div>
            <p className="text-slate-400 mb-6">
              Verifiable Credentials on the Blockchain.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">Home</a></li>
              <li><a href="#features" className="text-slate-400 hover:text-purple-400 transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-slate-400 hover:text-purple-400 transition-colors">How It Works</a></li>
              <li><a href="#faq" className="text-slate-400 hover:text-purple-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">Verify</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#institutions" className="text-slate-400 hover:text-purple-400 transition-colors">For Institutions</a></li>
              <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-slate-400 mb-4 text-sm">
              Get the latest updates on blockchain credentials
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-slate-800 border border-slate-700 rounded-l-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-r-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
          <p className="text-slate-400">
            © 2024 EduCred. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;