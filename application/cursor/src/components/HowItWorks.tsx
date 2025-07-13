import React from 'react';
import { FileText, Wallet, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: FileText,
      title: 'Institutions Mint Credentials',
      description: 'Using our secure portal and smart contracts, universities and platforms like NPTEL can issue certificates as NFTs with just a few clicks.',
      color: 'purple'
    },
    {
      number: '02',
      icon: Wallet,
      title: 'Students Own & Store',
      description: 'Graduates receive the NFT credential directly to their personal crypto wallet. The certificate data is stored decentrally and permanently on IPFS.',
      color: 'pink'
    },
    {
      number: '03',
      icon: CheckCircle,
      title: 'Anyone Can Verify',
      description: 'Employers or other institutions can instantly confirm a credential\'s authenticity by checking its unique hash on the blockchain via our public verification tool.',
      color: 'blue'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            A Simple, Transparent Process
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            From issuance to verification, our streamlined process ensures security and simplicity at every step
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transform -translate-y-1/2"></div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const colorClasses = {
                purple: 'from-purple-500 to-purple-600',
                pink: 'from-pink-500 to-pink-600',
                blue: 'from-blue-500 to-blue-600'
              };

              return (
                <div key={index} className="relative">
                  {/* Step Card */}
                  <div className="relative bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 group">
                    {/* Step Number */}
                    <div className={`absolute -top-4 left-8 w-12 h-12 bg-gradient-to-br ${colorClasses[step.color]} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="mt-8 mb-6">
                      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${colorClasses[step.color]} shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-slate-400 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Hover Effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colorClasses[step.color]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  </div>

                  {/* Connection Dots for Mobile */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-8">
                      <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;