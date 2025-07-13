import React from 'react';
import { GraduationCap, Globe, BookOpen, Monitor } from 'lucide-react';

const TrustedBy = () => {
  const institutions = [
    { name: 'Innovate University', icon: GraduationCap },
    { name: 'Global Tech Institute', icon: Globe },
    { name: 'NPTEL', icon: BookOpen },
    { name: 'Online Course Hub', icon: Monitor },
  ];

  return (
    <section className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Trusted by Leading Educational Institutions
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Join hundreds of forward-thinking institutions already using EduCred to secure their credentials
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {institutions.map((institution, index) => {
            const IconComponent = institution.icon;
            return (
              <div
                key={index}
                className="group flex flex-col items-center p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:bg-slate-800/80"
              >
                <div className="relative mb-4">
                  <IconComponent className="w-12 h-12 text-slate-400 group-hover:text-purple-400 transition-colors" />
                  <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-slate-300 font-medium text-center group-hover:text-white transition-colors">
                  {institution.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;