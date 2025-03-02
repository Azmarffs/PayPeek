import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = 'signin' }) => {
  const [view, setView] = useState<'signin' | 'signup'>(initialView);
  const { authSuccess, setAuthSuccess, currentUser } = useAuth();
  const navigate = useNavigate();

  // Reset to initial view when modal is closed
  useEffect(() => {
    if (!isOpen) {
      // Small delay to ensure animation completes before resetting
      const timer = setTimeout(() => {
        setView(initialView);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setView(initialView);
    }
  }, [isOpen, initialView]);

  // Close modal when auth is successful and redirect to dashboard
  useEffect(() => {
    if (authSuccess && isOpen) {
      const timer = setTimeout(() => {
        onClose();
        // Reset success state after modal closes
        setTimeout(() => {
          setAuthSuccess(false);
          // Redirect to dashboard
          navigate('/dashboard');
        }, 300);
      }, 1500); // Reduced from 2000ms to 1500ms for faster redirection
      return () => clearTimeout(timer);
    }
  }, [authSuccess, isOpen, onClose, setAuthSuccess, navigate]);

  // Automatically redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (currentUser && isOpen) {
      navigate('/dashboard');
      onClose();
    }
  }, [currentUser, isOpen, navigate, onClose]);

  const handleViewToggle = () => {
    setView(view === 'signin' ? 'signup' : 'signin');
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <div 
              className="w-full max-w-md bg-gradient-to-br from-secondary-900 to-primary-950 rounded-xl shadow-2xl border border-white/20 overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button - positioned in the top right corner */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-secondary-300 hover:text-white transition-colors z-10 bg-secondary-800/50 p-1.5 rounded-full backdrop-blur-sm"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
              
              {/* Success message overlay */}
              <AnimatePresence>
                {authSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-br from-secondary-900/95 to-primary-950/95 backdrop-blur-sm"
                  >
                    <div className="bg-green-500/20 border border-green-500/30 rounded-full p-3 mb-4">
                      <CheckCircle className="h-12 w-12 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Authentication Successful!</h3>
                    <p className="text-secondary-200">
                      Welcome{currentUser?.user_metadata?.display_name ? `, ${currentUser.user_metadata.display_name}` : ''}!
                    </p>
                    <p className="text-secondary-300 text-sm mt-2">Redirecting to dashboard...</p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Content */}
              <div className="p-6">
                {view === 'signin' ? (
                  <SignInForm onToggleView={handleViewToggle} />
                ) : (
                  <SignUpForm onToggleView={handleViewToggle} />
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;