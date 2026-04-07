import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';
import { EMAIL } from '../constants';

interface LeadFormProps {
  title?: string;
  subtitle?: string;
  className?: string;
  compact?: boolean;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const LeadForm = ({ title, subtitle, className, compact = false }: LeadFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    service: 'Water Softener Installation',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Send email via Web3Forms (goes directly to Jacinto's email)
      const web3FormData = new FormData();
      web3FormData.append('access_key', 'YOUR_WEB3FORMS_KEY'); // Will be replaced with actual key
      web3FormData.append('subject', `New Lead: ${formData.service} - ${formData.name}`);
      web3FormData.append('from_name', 'PNF Water Heaters Website');
      web3FormData.append('to', EMAIL);
      web3FormData.append('name', formData.name);
      web3FormData.append('phone', formData.phone);
      web3FormData.append('email', formData.email || 'Not provided');
      web3FormData.append('service', formData.service);
      web3FormData.append('message', formData.message || 'No message provided');

      const emailResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormData
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send email notification');
      }

      // Also save to Supabase database as backup
      try {
        await supabase
          .from('leads')
          .insert([
            {
              full_name: formData.name,
              phone: formData.phone,
              email: compact ? null : formData.email,
              service: formData.service,
              message: formData.message || null
            }
          ]);
      } catch {
        // Database save failed but email was sent - don't fail the submission
        console.warn('Database save failed, but email was sent');
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'Water Softener Installation',
        message: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={cn("grid gap-4", !compact && "md:grid-cols-2")}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pnf-red-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input 
              required
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pnf-red-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Needed</label>
          <select 
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
          >
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
            name="message"
            value={formData.message}
            onChange={handleChange}
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
