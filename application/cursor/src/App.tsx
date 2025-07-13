import React from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from './config/blockchain';
import Header from './components/Header';
import Hero from './components/Hero';
import CredentialVerifier from './components/CredentialVerifier';
import UserCredentials from './components/UserCredentials';
import TrustedBy from './components/TrustedBy';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import InstitutionDashboard from './components/InstitutionDashboard';
import CTA from './components/CTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import StudentDashboard from './components/StudentDashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-slate-900">
          <Header />
          <Hero />
          <CredentialVerifier />
          <UserCredentials />
          <StudentDashboard />
          <TrustedBy />
          <Features />
          <HowItWorks />
          <InstitutionDashboard />
          <CTA />
          <FAQ />
          <Footer />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;