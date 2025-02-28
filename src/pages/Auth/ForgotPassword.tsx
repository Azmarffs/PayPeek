import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resetPassword } = useAuth();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await resetPassword(email);
      setMessage('Check your email for password reset instructions');
      setEmail('');
    } catch (err) {
      // Error is handled in the AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-950 via-secondary-900 to-primary-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[40%] rounded-full bg-gradient-to-br from-primary-600/10 to-primary-700/5 blur-3xl"></div>
        <div className="absolute top-[20%] -left-[5%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-secondary-700/10 to-secondary-800/5 blur-3xl"></div>
        <div className="absolute bottom-[5%] right-[5%] w-[35%] h-[40%] rounded-full bg-gradient-to-bl from-primary-500/10 to-primary-600/5 blur-3xl"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-white/20 relative z-10"
      >
        <div>
          <div className="flex justify-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-md">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold text-white">PayPeek</span>
            </Link>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-secondary-200">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex items-start">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}
        
        {message && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 flex items-start">
            <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm text-green-200">{message}</p>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
          <div>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-secondary-400" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-white/20 placeholder-secondary-400 text-white bg-white/5 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 font-medium shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send reset link'}
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <Link to="/signin" className="flex items-center justify-center text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;