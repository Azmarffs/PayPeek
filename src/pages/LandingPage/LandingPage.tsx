import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "../../components/Footer";
import AuthModal from '../../components/AuthModal';

const LandingPage: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'signin' | 'signup'>('signup');

  const handleGetStarted = () => {
    setAuthModalView('signup');
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen relative">
      {/* Fixed background that spans the entire page */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-950 via-secondary-900 to-primary-950">
          <img 
            src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-950/90 via-secondary-900/90 to-primary-950/90 mix-blend-multiply"></div>
      </div>
      
      <Navbar />
      <main className="relative z-10">
        <Hero onGetStarted={handleGetStarted} />
        <HowItWorks />
        <Features />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      
      {/* Auth Modal - This is a duplicate instance that can be triggered from the Hero section */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialView={authModalView}
      />
    </div>
  );
};

export default LandingPage;