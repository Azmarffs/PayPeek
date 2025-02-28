import React from 'react';
import { Star, Quote, Users } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      content: "PayPeek transformed my business. I've increased my revenue by 300% since I started selling my photography collections through their platform.",
      author: "Sarah Johnson",
      role: "Photographer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 5
    },
    {
      content: "The payment system is seamless. My clients can easily purchase access to my design portfolios, and I get paid instantly.",
      author: "Michael Chen",
      role: "Graphic Designer",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 5
    },
    {
      content: "Setting up my paywalled content took minutes, not days. I love how I can set different access options for different collections.",
      author: "Emma Rodriguez",
      role: "Digital Artist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rating: 4
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg mb-6">
            <Quote className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white sm:text-4xl">
            Loved by creators worldwide
          </h2>
          <p className="mt-4 text-xl text-secondary-200">
            See what our customers have to say about their experience with PayPeek
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/10 hover:-translate-y-2"
            >
              <div className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i + testimonial.rating} className="h-5 w-5 text-secondary-500" />
                  ))}
                </div>
                <p className="text-secondary-200 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="h-12 w-12 rounded-full mr-4 object-cover border-2 border-primary-500/30"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.author}</h4>
                    <p className="text-secondary-300 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Creator showcase - Redesigned and height reduced */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-5 shadow-md border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0 md:mr-8">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-white ml-3">Who uses PayPeek?</h3>
              </div>
              <p className="text-secondary-300 max-w-md text-sm">Our platform is perfect for all types of digital creators</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                    <path d="M9 18h6"></path>
                    <path d="M10 22h4"></path>
                  </svg>
                </div>
                <span className="font-medium text-white text-sm">Photographers</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19c-2.3 0-6.4-.2-8.1-.6-.7-.2-1.2-.7-1.4-1.4-.3-1.1-.5-3.4-.5-5s.2-3.9.5-5c.2-.7.7-1.2 1.4-1.4C5.6 5.2 9.7 5 12 5s6.4.2 8.1.6c.7.2 1.2.7 1.4 1.4.3 1.1.5 3.4.5 5s-.2 3.9-.5 5c-.2.7-.7 1.2-1.4 1.4-1.7.4-5.8.6-8.1.6 0 0 0 0 0 0z"></path>
                    <polygon points="10 15 15 12 10 9"></polygon>
                  </svg>
                </div>
                <span className="font-medium text-white text-sm">Video Creators</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12h5"></path>
                    <path d="M17 12h5"></path>
                    <path d="M9 4v16"></path>
                    <path d="M15 4v16"></path>
                  </svg>
                </div>
                <span className="font-medium text-white text-sm">Digital Artists</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z"></path>
                    <path d="M8 7h6"></path>
                    <path d="M8 11h8"></path>
                    <path d="M8 15h6"></path>
                  </svg>
                </div>
                <span className="font-medium text-white text-sm">Writers & Authors</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;