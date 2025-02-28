import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, Menu, X, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthNavbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
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
            {currentUser && (
              <>
                <Link to="/dashboard" className="text-white hover:text-primary-300 font-medium transition-colors relative group">
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/collections" className="text-white hover:text-primary-300 font-medium transition-colors relative group">
                  My Collections
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/analytics" className="text-white hover:text-primary-300 font-medium transition-colors relative group">
                  Analytics
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            {currentUser ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="relative">
                    {currentUser.photoURL ? (
                      <img 
                        src={currentUser.photoURL} 
                        alt={currentUser.displayName || 'User'} 
                        className="h-10 w-10 rounded-full object-cover border-2 border-primary-500"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                        {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-secondary-900"></div>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-white font-medium">{currentUser.displayName || 'User'}</span>
                    <ChevronDown className="h-4 w-4 text-white inline ml-1" />
                  </div>
                </button>
                
                <AnimatePresence>
                  {profileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50"
                    >
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <User className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                          Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <Settings className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                          Settings
                        </Link>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setProfileMenuOpen(false);
                            handleLogout();
                          }}
                          className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <div className="hidden sm:block">
                  <Link
                    to="/signin"
                    className="flex items-center px-6 py-2.5 rounded-full bg-white/10 text-white font-medium border border-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-primary-950 transition-all duration-300 shadow-sm backdrop-blur-sm"
                    aria-label="Sign in to your account"
                  >
                    <span>Sign In</span>
                  </Link>
                </div>
                
                <div>
                  <Link
                    to="/signup"
                    className="flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium shadow-md hover:shadow-lg hover:from-primary-500 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300"
                    aria-label="Create an account"
                  >
                    <span>Get Started</span>
                    <ChevronRight className="ml-1.5 h-4 w-4" />
                  </Link>
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
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-3 rounded-lg text-base font-medium text-white hover:text-primary-300 hover:bg-white/5 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/collections"
                  className="block px-4 py-3 rounded-lg text-base font-medium text-white hover:text-primary-300 hover:bg-white/5 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Collections
                </Link>
                <Link
                  to="/analytics"
                  className="block px-4 py-3 rounded-lg text-base font-medium text-white hover:text-primary-300 hover:bg-white/5 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Analytics
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-3 rounded-lg text-base font-medium text-white hover:text-primary-300 hover:bg-white/5 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-3 rounded-lg text-base font-medium text-white hover:text-primary-300 hover:bg-white/5 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-primary-300 hover:text-primary-200 hover:bg-white/5 transition-all duration-200"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
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
                <Link
                  to="/signin"
                  className="block px-4 py-3 rounded-lg text-base font-medium text-primary-300 hover:text-primary-200 hover:bg-white/5 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <div className="pt-2 pb-1">
                  <Link
                    to="/signup"
                    className="block w-full text-center px-4 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default AuthNavbar;