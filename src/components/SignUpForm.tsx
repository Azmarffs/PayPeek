import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, User, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SignUpFormProps {
  onToggleView: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onToggleView }) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUpWithEmail, signInWithGoogle, setAuthSuccess } = useAuth();

  const validatePassword = (password: string): boolean => {
    // Password must be at least 8 characters with at least one uppercase, one lowercase, and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!displayName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, and one number');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const { error, data } = await signUpWithEmail(email, password, displayName);
      
      if (error) {
        setError(error.message || 'Failed to create account');
      } else if (data) {
        setAuthSuccess(true);
        // No need to navigate here - AuthModal will handle redirection
      }
      setIsSubmitting(false);
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsSubmitting(true);
      await signInWithGoogle();
      setIsSubmitting(false);
    } catch (err: any) {
      setError(err.message || 'Failed to sign up with Google');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-md">
            <Heart className="h-6 w-6 text-white" />
          </div>
        </div>
        <h2 className="mt-3 text-center text-2xl font-bold text-white">
          Create account
        </h2>
        <p className="mt-1 text-center text-sm text-secondary-300">
          Join PayPeek to monetize your content
        </p>
      </div>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex items-start shadow-md backdrop-blur-sm"
        >
          <AlertCircle className="h-5 w-5 text-red-400 mr-2.5 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-200 font-medium">{error}</p>
        </motion.div>
      )}
      
      <form className="space-y-4" onSubmit={handleEmailSignUp}>
        <div className="grid grid-cols-1 gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-primary-400" />
            </div>
            <input
              id="display-name"
              name="display-name"
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="appearance-none rounded-lg relative block w-full px-3 py-2.5 pl-10 border border-white/20 placeholder-secondary-400 text-white bg-secondary-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 text-sm shadow-sm backdrop-blur-sm transition-all duration-200"
              placeholder="Full name"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-primary-400" />
            </div>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-lg relative block w-full px-3 py-2.5 pl-10 border border-white/20 placeholder-secondary-400 text-white bg-secondary-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 text-sm shadow-sm backdrop-blur-sm transition-all duration-200"
              placeholder="Email address"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-primary-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-lg relative block w-full px-3 py-2.5 pl-10 border border-white/20 placeholder-secondary-400 text-white bg-secondary-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 text-sm shadow-sm backdrop-blur-sm transition-all duration-200"
              placeholder="Password"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-primary-400" />
            </div>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="appearance-none rounded-lg relative block w-full px-3 py-2.5 pl-10 border border-white/20 placeholder-secondary-400 text-white bg-secondary-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 text-sm shadow-sm backdrop-blur-sm transition-all duration-200"
              placeholder="Confirm password"
            />
          </div>
        </div>
        
        <p className="text-xs text-secondary-400 mt-1">
          Password must be at least 8 characters with uppercase, lowercase, and number
        </p>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 font-medium shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <UserPlus className="h-5 w-5 text-primary-300 group-hover:text-primary-200" />
            </span>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </div>
      </form>
      
      <div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2.5 py-0.5 bg-gradient-to-r from-secondary-900/80 to-primary-950/80 backdrop-blur-sm text-secondary-300 rounded-full">or</span>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleGoogleSignUp}
            disabled={isSubmitting}
            className="w-full flex justify-center items-center px-4 py-2.5 border border-white/20 rounded-lg shadow-md text-sm font-medium text-white bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed backdrop-blur-sm"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
      
      <div className="text-center mt-3">
        <p className="text-sm text-secondary-300">
          Already have an account?{' '}
          <button 
            onClick={onToggleView}
            className="font-medium text-primary-400 hover:text-primary-300 transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;