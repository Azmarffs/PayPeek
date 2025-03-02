import React from 'react';
import { Shield, CreditCard, Clock, Lock, Zap } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      name: 'Content Security',
      description: 'Protect your data with strong encryption and simple access controls.',
      icon: Shield,
      iconBg: 'bg-gradient-to-br from-primary-500 to-primary-600',
    },
    {
      name: 'Easy Payments',
      description: 'Pay with credit cards, PayPal, or crypto, all with low transaction fees.',
      icon: CreditCard,
      iconBg: 'bg-gradient-to-br from-secondary-700 to-secondary-800',
    },
    {
      name: 'Access Control',
      description: 'Set time or view limits to control access to your premium content.',
      icon: Clock,
      iconBg: 'bg-gradient-to-br from-primary-500 to-primary-600',
    },
    {
      name: 'Data Privacy',
      description: 'Secure your content with encryption and easy access management.',
      icon: Lock,
      iconBg: 'bg-gradient-to-br from-secondary-700 to-secondary-800',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg mb-6">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white sm:text-4xl">
            Powerful features for content creators
          </h2>
          <p className="mt-4 text-xl text-secondary-200">
            Everything you need to monetize and grow your digital content business
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/10 group hover:-translate-y-3"
            >
              <div className="p-8">
                <div className={`inline-flex items-center justify-center h-16 w-16 rounded-xl ${feature.iconBg} mb-6 shadow-md group-hover:shadow-lg transition-all duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.name}</h3>
                <p className="text-secondary-200">{feature.description}</p>
              </div>
              <div className="h-2 bg-gradient-to-r from-primary-500 to-primary-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;