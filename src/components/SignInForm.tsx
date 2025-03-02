import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface SignInFormProps {
  onToggleView: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onToggleView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signInWithEmail, signInWithGoogle, setAuthSuccess } = useAuth();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const { error, data } = await signInWithEmail(email, password);
      
      if (error) {
        setError(error.message || 'Failed to sign in');
      } else if (data) {
        setAuthSuccess(true);
        // No need to navigate here - AuthModal will handle redirection
      }
      setIsSubmitting(false);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(true);
      setError('');
      await signInWithGoogle();
      setIsSubmitting(false);
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="text-center">
        <div className="flex justify-center">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-md">
            <Heart className="h-6 w-6 text-white" />
          </div>
        </div>
        <h2 className="mt-3 text-center text-2xl font-bold text-white">
          Welcome back
        </h2>
        <p className="mt-1 text-center text-sm text-secondary-300">
          Sign in to continue to PayPeek
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
      
      <form className="space-y-4" onSubmit={handleEmailSignIn}>
        <div className="space-y-3">
          <div>
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
          </div>
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-primary-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2.5 pl-10 border border-white/20 placeholder-secondary-400 text-white bg-secondary-800/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 text-sm shadow-sm backdrop-blur-sm transition-all duration-200"
                placeholder="Password"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-500 rounded bg-secondary-800/50"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-300">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <Link to="/forgot-password" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
              Forgot?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 font-medium shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LogIn className="h-5 w-5 text-primary-300 group-hover:text-primary-200" />
            </span>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
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
            type="button"
            onClick={handleGoogleSignIn}
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
      
      <div className="text-center mt-4">
        <p className="text-sm text-secondary-300">
          Don't have an account?{' '}
          <button 
            onClick={onToggleView}
            className="font-medium text-primary-400 hover:text-primary-300 transition-colors"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;