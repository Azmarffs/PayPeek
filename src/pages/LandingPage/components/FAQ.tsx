import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  
  const faqs = [
    {
      question: 'How does PayPeek protect my content?',
      answer: 'PayPeek uses enterprise-grade encryption and secure access controls to protect your content. Our paywall technology prevents unauthorized access, downloads, and sharing while providing a seamless experience for your paying customers.'
    },
    {
      question: 'What payment methods can my customers use?',
      answer: 'Customers can pay using credit/debit cards, PayPal, Apple Pay, Google Pay, and various cryptocurrencies. We handle all payment processing, security, and compliance so you can focus on creating content.'
    },
    {
      question: 'How quickly will I receive my earnings?',
      answer: 'Earnings are processed on a rolling basis with payouts every 7 days. Once processed, funds typically arrive in your account within 1-3 business days depending on your bank.'
    },
    {
      question: 'What types of content can I sell on PayPeek?',
      answer: 'PayPeek supports a wide range of digital content including images, videos, PDFs, audio files, e-books, and more. If you have a specific content type not listed here, please contact our support team to discuss compatibility.'
    },
    {
      question: 'How much does PayPeek charge per transaction?',
      answer: 'We charge a small processing fee on transactions (2.9% + $0.30 for standard payment methods). This fee covers our platform services, allowing you to keep more of what you earn.'
    },
    {
      question: 'Can I customize the payment page my customers see?',
      answer: 'Yes, you can customize the payment page with your branding, including logo, colors, and custom messages to maintain a consistent experience for your audience.'
    },
    {
      question: 'What access options can I set for my content?',
      answer: 'You can set time-based access (content expires after a set period), view-based access (limited number of views), or permanent access (one-time payment for unlimited access).'
    },
    {
      question: 'Is there a limit to how much content I can upload?',
      answer: 'There are no strict limits on the amount of content you can upload, though there are file size limits for individual files (up to 2GB per file). For extremely large collections, contact our support team for custom solutions.'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg mb-6"
          >
            <HelpCircle className="h-8 w-8 text-white" />
          </motion.div>
          <motion.h2 
            className="text-3xl font-display font-bold text-white sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Frequently asked questions
          </motion.h2>
          <motion.p 
            className="mt-4 text-xl text-secondary-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything you need to know about PayPeek
          </motion.p>
        </div>
        
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <button
                className="w-full px-5 py-3 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <span className="ml-6 flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 text-primary-400" />
                  ) : (
                    <Plus className="h-5 w-5 text-secondary-400" />
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-3">
                  <p className="text-secondary-200">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-secondary-200">
            Still have questions? We're here to help.
          </p>
          <a 
            href="#contact" 
            className="mt-3 inline-flex items-center text-primary-400 font-medium hover:text-primary-300 transition-colors"
          >
            Contact our support team
            <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;