import React from "react";
import { Link } from "react-router-dom";
import { Upload, DollarSign, Link as LinkIcon, Eye, ArrowRight, Lightbulb } from "lucide-react";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      name: "Upload Content",
      description: "Easily upload your best images and videos to sell online.",
      icon: Upload,
      iconBg: "bg-gradient-to-br from-primary-500 to-primary-600",
    },
    {
      id: 2,
      name: "Set Price & Rules",
      description:
        "Set your own price and control how content is accessed securely.",
      icon: DollarSign,
      iconBg: "bg-gradient-to-br from-primary-500 to-primary-600",
    },
    {
      id: 3,
      name: "Share Link",
      description:
        "Share your unique PayPeek link with your audience anywhere.",
      icon: LinkIcon,
      iconBg: "bg-gradient-to-br from-primary-500 to-primary-600",
    },
    {
      id: 4,
      name: "Get Paid",
      description:
        "Get paid instantly when users unlock and view your content.",
      icon: Eye,
      iconBg: "bg-gradient-to-br from-primary-500 to-primary-600",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            How we work
          </h2>
          <p className="text-lg text-secondary-200 max-w-2xl mx-auto">
            Simple steps to start monetizing your content and growing your
            digital business
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="relative"
            >
              {/* Connecting line between steps */}
              {step.id < steps.length && (
                <div className="hidden lg:block absolute top-1/2 left-full w-16 h-0.5 bg-gradient-to-r from-primary-400 to-primary-200 transform -translate-x-6 -translate-y-8 z-0">
                  <div className="absolute right-0 w-3 h-3 rounded-full bg-primary-500 transform -translate-y-1/2 shadow-md z-10"></div>
                </div>
              )}

              <div className="flex flex-col items-center text-center bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-white/10 group relative z-20 hover:-translate-y-2">
                <div
                  className={`flex items-center justify-center h-16 w-16 rounded-full ${step.iconBg} mb-6 shadow-md group-hover:shadow-lg transition-all duration-300`}
                >
                  <step.icon
                    className="h-8 w-8 text-white"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.name}
                </h3>
                <p className="text-secondary-200">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:shadow-xl hover:from-primary-500 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:scale-105"
          >
            Start your journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;