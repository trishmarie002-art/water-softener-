import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import LeadForm from '../components/LeadForm';
import { PHONE_NUMBER, PHONE_NUMBER_RAW, EMAIL } from '../constants';

const Contact = () => {
  return (
    <div className="pt-24">
      <section className="bg-navy-900 py-20 text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Get Your FREE Water Test Today</h1>
          <p className="text-xl text-navy-200 max-w-2xl mx-auto mb-8">
            Stop letting San Antonio&apos;s hard water damage your home. Call now for your <strong>FREE water test</strong> and same-day appointment.
          </p>
          <a 
            href={`tel:${PHONE_NUMBER_RAW}`}
            className="inline-flex items-center gap-2 bg-pnf-red-600 hover:bg-pnf-red-700 text-white px-10 py-5 rounded-xl font-black text-xl transition-all animate-pulse hover:animate-none"
          >
            <Phone size={24} /> CALL NOW - {PHONE_NUMBER}
          </a>
        </div>
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24-qXgwh1FXgUHroZUDBcq8eqniRQe4rI.webp" 
            alt="PNF Water Heaters & Softeners truck" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
              <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                Whether you have a question about water softeners, need an emergency water heater replacement, or want to schedule a free water test, our team is ready to assist you.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="bg-navy-100 p-4 rounded-2xl shrink-0 text-pnf-red-600">
                    <Phone size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">Call Us</h4>
                    <a href={`tel:${PHONE_NUMBER_RAW}`} className="text-2xl font-black text-pnf-red-600 hover:underline">
                      {PHONE_NUMBER}
                    </a>
                    <p className="text-gray-500 mt-1">Available for emergencies 24/7</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="bg-navy-100 p-4 rounded-2xl shrink-0 text-pnf-red-600">
                    <Mail size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">Email Us</h4>
                    <a href={`mailto:${EMAIL}`} className="text-lg font-bold text-gray-700 hover:text-pnf-red-600 transition-colors break-all">
                      {EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="bg-navy-100 p-4 rounded-2xl shrink-0 text-pnf-red-600">
                    <Clock size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">Business Hours</h4>
                    <p className="text-gray-700 font-medium">Mon - Fri: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-700 font-medium">Sat: 9:00 AM - 3:00 PM</p>
                    <p className="text-pnf-red-600 font-bold mt-1">24/7 Emergency Service Available</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="bg-navy-100 p-4 rounded-2xl shrink-0 text-pnf-red-600">
                    <MapPin size={32} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">Service Area</h4>
                    <p className="text-gray-700 font-medium">San Antonio, TX & Surrounding Areas</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="sticky top-32">
                <LeadForm 
                  title="Schedule Your FREE Water Test" 
                  subtitle="Find out exactly what's in your San Antonio water. No cost, no obligation - we'll show you the results on the spot."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] bg-gray-200 relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-2xl z-10 text-center">
            <MapPin className="text-pnf-red-600 mx-auto mb-2" size={32} />
            <h4 className="font-bold text-gray-900">San Antonio Water Solutions</h4>
            <p className="text-sm text-gray-500">San Antonio, TX</p>
          </div>
        </div>
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%281%29-IuygaLd5EPfrCEPoqTS9z6mkARM4ST.webp" 
          alt="PNF plumbing work" 
          className="w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
      </section>
    </div>
  );
};

export default Contact;
