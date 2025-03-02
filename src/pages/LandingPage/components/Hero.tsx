import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, LockKeyhole, Sparkles, Link as LinkIcon } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative min-h-screen flex items-center pt-20 pb-12">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[40%] rounded-full bg-gradient-to-br from-primary-600/10 to-primary-700/5 blur-3xl"></div>
        <div className="absolute top-[20%] -left-[5%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-secondary-700/10 to-secondary-800/5 blur-3xl"></div>
        <div className="absolute bottom-[5%] right-[5%] w-[35%] h-[40%] rounded-full bg-gradient-to-bl from-primary-500/10 to-primary-600/5 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 py-8 md:py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 z-10">
            <div className="mt-6 sm:mt-10 lg:mt-0 lg:mr-0 xl:mr-12 pb-4 sm:pb-8">
              <div className="animate-fade-in-up">
                <span className="inline-flex items-center rounded-full bg-primary-900/60 px-4 py-1.5 text-sm font-medium text-primary-200 mb-6 shadow-sm backdrop-blur-sm border border-primary-700/50">
                  <Sparkles className="mr-1.5 h-4 w-4 text-primary-400" />
                  Content Monetization Platform
                </span>
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl animate-fade-in-up">
                <span className="block">Share and monetize</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-300 pb-3">
                  your digital content
                </span>
              </h1>

              <p className="mt-6 text-lg text-secondary-200 max-w-xl animate-fade-in-up">
                Upload images & videos, set your price, and get paid per view.
                Control access with time or view limits—it's all in your hands!
              </p>

              <div className="mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 animate-fade-in-up">
                <button
                  onClick={onGetStarted}
                  className="flex items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-3.5 text-base font-medium text-white shadow-md hover:shadow-lg hover:from-primary-500 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-secondary-900 transition-all duration-300 transform hover:scale-105"
                >
                  Start sharing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <a
                  href="#how-it-works"
                  className="flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm px-8 py-3.5 text-base font-medium text-white shadow-md hover:shadow-lg ring-1 ring-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-secondary-900 transition-all duration-300"
                >
                  <LockKeyhole className="mr-2 h-5 w-5" />
                  See how it works
                </a>
              </div>

              <div className="mt-12 animate-fade-in-up">
                <div className="bg-secondary-800/50 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm border border-secondary-700/50 inline-flex items-center">
                  <div className="bg-primary-500 text-white font-semibold text-sm px-3 py-1 rounded-md mr-3">
                    1,000+
                  </div>
                  <p className="text-sm text-secondary-200 font-medium">
                    creators trust PayPeek for their content
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 mt-12 lg:mt-0">
            <div className="relative mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0 animate-fade-in">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  className="w-full object-cover"
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
                  alt="Creator working on digital content"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/40 to-transparent mix-blend-multiply"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-secondary-900/90 to-transparent">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-white p-1">
                      <div className="h-full w-full rounded-full bg-primary-500 flex items-center justify-center">
                        <Heart className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Premium Content
                      </p>
                      <p className="text-xs text-secondary-300">
                        Pay to access exclusive content
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full opacity-20 blur-3xl"></div>

              <div className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-4 transform rotate-3 border border-white/20">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary-500/30 rounded-full flex items-center justify-center">
                    <LinkIcon className="h-4 w-4 text-primary-300" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">
                      Shared Link
                    </p>
                    <p className="text-sm font-bold text-primary-300">
                      paypeek.com/c/xyz
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -left-6 top-1/2 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-4 transform -rotate-3 border border-white/20">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-secondary-700/50 rounded-full flex items-center justify-center">
                    <LockKeyhole className="h-4 w-4 text-secondary-300" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">
                      Access Fee
                    </p>
                    <p className="text-sm font-bold text-secondary-300">
                      $5.99
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;