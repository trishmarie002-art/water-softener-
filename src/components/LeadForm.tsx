import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  className?: string;
  compact?: boolean;
}

const LeadForm = ({ title, subtitle, className, compact = false }: LeadFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn("bg-white p-8 rounded-2xl shadow-xl text-center", className)}
      >
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-600 w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">Your request has been received. One of our experts will contact you shortly.</p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="mt-6 text-pnf-red-600 font-semibold hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <div className={cn("bg-white p-6 md:p-8 rounded-2xl shadow-xl", className)}>
      {title && <h3 className={cn("font-bold text-gray-900 mb-1", compact ? "text-xl" : "text-2xl")}>{title}</h3>}
      {subtitle && <p className="text-gray-600 mb-6">{subtitle}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={cn("grid gap-4", !compact && "md:grid-cols-2")}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              required
              type="text" 
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pnf-red-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              required
              type="tel" 
              placeholder="(210) 555-0123"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pnf-red-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>
        
        {!compact && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pnf-red-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Needed</label>
          <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white">
            <option>Water Softener Installation</option>
            <option>Water Heater Replacement</option>
            <option>Water Filtration System</option>
            <option>Plumbing Repair</option>
            <option>Other / Free Estimate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
          <textarea 
            rows={compact ? 2 : 4}
            placeholder="Tell us about your project..."
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
          ></textarea>
        </div>

        <button 
          disabled={isLoading}
          type="submit"
          className="w-full bg-pnf-red-600 hover:bg-pnf-red-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Send size={20} />
              <span>Get Free Estimate</span>
            </>
          )}
        </button>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          By clicking, you agree to be contacted via phone or email regarding your request.
        </p>
      </form>
    </div>
  );
};

export default LeadForm;
