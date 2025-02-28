import React from 'react';
import Navbar from '../../components/Navbar';
import Hero from "../LandingPage/components/Hero";
import HowItWorks from "../LandingPage/components/HowItWorks";
import Features from "../LandingPage/components/Features";
import Testimonials from "../LandingPage/components/Testimonials";
import FAQ from "../LandingPage/components/FAQ";
import Footer from "../../components/Footer";

const LandingPage: React.FC = () => {
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
        <Hero />
        <HowItWorks />
        <Features />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;