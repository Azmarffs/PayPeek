import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ChevronRight, Menu, X, User, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'signin' | 'signup'>('signin');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const openSignIn = () => {
    setAuthModalView('signin');
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const openSignUp = () => {
    setAuthModalView('signup');
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUserMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navigateToDashboard = () => {
    navigate('/dashboard');
    setUserMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-gradient-to-r from-primary-950/90 via-secondary-950/90 to-primary-950/90 backdrop-blur-sm shadow-xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-md group-hover:shadow-lg transition-all duration-300">
                <Heart className="h-6 w-6 text-white transition-all duration-300 group-hover:scale-110" />
              </div>
              <span className="text-2xl font-display font-bold text-white transition-all duration-300 group-hover:text-primary-400">PayPeek</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-white hover:text-primary-300 font-medium transition-colors relative group">
                How we work
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#features" className="text-white hover:text-primary-300 font-medium transition-colors relative group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#testimonials" className="text-white hover:text-primary-300 font-medium transition-colors relative group">
                Testimonials
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#faq" className="text-white hover:text-primary-300 font-medium transition-colors relative group">
                FAQ
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 text-white font-medium border border-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-primary-950 transition-all duration-300 shadow-sm backdrop-blur-sm"
                  >
                    <span className="hidden sm:inline-block">
                      {currentUser.user_metadata?.display_name || currentUser.email?.split('@')[0]}
                    </span>
                    <User className="h-5 w-5" />
                  </button>
                  
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-secondary-900 to-primary-950 rounded-lg shadow-lg py-1 border border-white/10 backdrop-blur-sm z-50">
                      <button
                        onClick={navigateToDashboard}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors flex items-center"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="hidden sm:block">
                    <button
                      onClick={openSignIn}
                      className="flex items-center px-6 py-2.5 rounded-full bg-white/10 text-white font-medium border border-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-primary-950 transition-all duration-300 shadow-sm backdrop-blur-sm"
                      aria-label="Sign in to your account"
                    >
                      <span>Sign In</span>
                    </button>
                  </div>
                  
                  <div>
                    <button
                      onClick={openSignUp}
                      className="flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium shadow-md hover:shadow-lg hover:from-primary-500 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300"
                      aria-label="Create an account"
                    >
                      <span>Get Started</span>
                      <ChevronRight className="ml-1.5 h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
              
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-r from-primary-950/95 to-secondary-950/95 backdrop-blur-sm shadow-xl rounded-b-xl mx-4 border border-primary-800/50">
              <a
                href="#how-it-works"
                className="block px-4 py-3 rounded-lg text-base font-medium text-white hover:text-primary-300 hover:bg-white/5 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                How we work
              </a>
              <a
                href="#features"
                className="block px-4 py-3 rounded-lg text-base font-medium text-white hover:text-primary-300 hover:bg-white/5 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="block px-4 py-3 rounded-lg text-base font-medium text-white hover:text-primary-300 hover:bg-white/5 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <a
                href="#faq"
                className="block px-4 py-3 rounded-lg text-base font-medium text-white hover:text-primary-300 hover:bg-white/5 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>
              
              {currentUser ? (
                <>
                  <button
                    onClick={navigateToDashboard}
                    className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-primary-300 hover:text-primary-200 hover:bg-white/5 transition-all duration-200"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-primary-300 hover:text-primary-200 hover:bg-white/5 transition-all duration-200"
                  >
                    Sign Out
                  </button>
                 </>
              ) : (
                <>
                  <button
                    onClick={openSignIn}
                    className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-primary-300 hover:text-primary-200 hover:bg-white/5 transition-all duration-200"
                  >
                    Sign In
                  </button>
                  <div className="pt-2 pb-1">
                    <button
                      onClick={openSignUp}
                      className="block w-full text-center px-4 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      Get Started
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialView={authModalView}
      />
    </>
  );
};

export default Navbar;