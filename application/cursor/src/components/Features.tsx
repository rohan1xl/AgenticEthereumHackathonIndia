import React from 'react';
import { Shield, Zap, Globe } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Immutable Security',
      description: 'Certificates are minted as unique NFTs on the blockchain, making them permanently secure and impossible to forge or alter. Authenticity is guaranteed.',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Instant Verification',
      description: 'Anyone, anywhere can verify a credential in seconds using its unique on-chain hash. This eliminates the slow, manual process of contacting institutions.',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      icon: Globe,
      title: 'Decentralized & Portable',
      description: 'Stored on IPFS and owned by the student, credentials are free from a central point of failure. Graduates carry their achievements with them for life, in their own digital wallet.',
      gradient: 'from-blue-500 to-blue-600'
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose EduCred?
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Experience the next generation of credential management with cutting-edge blockchain technology
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;