import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is a blockchain certificate?',
      answer: 'It\'s a digital academic credential represented as a Non-Fungible Token (NFT) on a blockchain. This gives it a unique, verifiable, and tamper-proof identity, unlike a traditional PDF or paper certificate.'
    },
    {
      question: 'How is this more secure than traditional methods?',
      answer: 'Traditional certificates can be easily forged. Blockchain records are immutable, meaning once a certificate is issued (minted), it cannot be changed or deleted. Its authenticity can be mathematically proven by anyone at any time.'
    },
    {
      question: 'Where is the actual certificate file stored?',
      answer: 'The NFT on the blockchain holds the proof of authenticity and a unique link. The actual certificate file (e.g., a PDF or image) is stored on IPFS (InterPlanetary File System), a decentralized storage network that ensures the file is always available and cannot be secretly altered.'
    },
    {
      question: 'What do I need to receive and view my credential?',
      answer: 'All you need is a standard digital wallet (like MetaMask). This wallet acts as your secure portfolio to hold and manage your NFT credentials. Our platform makes it easy to view and share them.'
    },
    {
      question: 'Is the system scalable for large institutions?',
      answer: 'Absolutely. EduCred is built to scale across large universities and massive online course platforms. Our smart contracts are optimized for efficient batch minting of thousands of credentials at once.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Have Questions? We Have Answers.
          </h2>
          <p className="text-xl text-slate-400">
            Everything you need to know about blockchain credentials
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-colors"
            >
              <button
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-slate-800/30 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-purple-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-slate-700 pt-4">
                    <p className="text-slate-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">Still have questions?</p>
          <button className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Contact our support team →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;