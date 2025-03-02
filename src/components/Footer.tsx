import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Twitter, Instagram, Mail, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-primary-900 to-primary-950 text-white py-6 relative z-10" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="col-span-2">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-md">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-white">PayPeek</span>
            </div>
            <p className="text-primary-200 text-sm mt-2 max-w-xs">
              The secure platform for creators to monetize their digital content with flexible access controls and seamless payments.
            </p>
            
            <div className="mt-3">
              <form className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                <div className="flex-grow">
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full min-w-0 px-3 py-1.5 text-sm text-secondary-900 placeholder-secondary-500 bg-white border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full px-3 py-1.5 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Subscribe
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="hidden md:block">
            <h3 className="text-sm font-semibold text-primary-300 tracking-wider uppercase mb-2">Product</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/features" className="text-sm text-primary-200 hover:text-primary-100 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-sm text-primary-200 hover:text-primary-100 transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-primary-200 hover:text-primary-100 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="hidden md:block">
            <h3 className="text-sm font-semibold text-primary-300 tracking-wider uppercase mb-2">Support</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/help" className="text-sm text-primary-200 hover:text-primary-100 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-primary-200 hover:text-primary-100 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-primary-200 hover:text-primary-100 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-primary-300 tracking-wider uppercase mb-2">Connect</h3>
            <div className="flex space-x-3 mb-3">
              <a href="#" className="text-primary-200 hover:text-primary-100 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-200 hover:text-primary-100 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="mailto:support@paypeek.com" className="text-primary-200 hover:text-primary-100 transition-colors" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <ul className="space-y-1">
              <li>
                <Link to="/privacy" className="text-sm text-primary-200 hover:text-primary-100 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-primary-200 hover:text-primary-100 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-primary-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-primary-300">
            &copy; {new Date().getFullYear()} PayPeek. All rights reserved.
          </p>
          <div className="mt-1 md:mt-0">
            <span className="text-xs text-primary-400">
              Made with <span className="text-primary-500">♥</span> for creators
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;