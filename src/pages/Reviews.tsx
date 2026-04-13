import React from 'react';
import { Star, Quote, CheckCircle2, Phone } from 'lucide-react';
import { PHONE_NUMBER, PHONE_NUMBER_RAW } from '../constants';

const Reviews = () => {
  const reviews = [
    { name: "Sarah Jenkins", location: "Stone Oak", date: "2 weeks ago", text: "The water softener installation was quick and professional. No more hard water spots on my dishes! The technician was very polite and explained everything clearly.", service: "Water Softener Installation" },
    { name: "Michael Rodriguez", location: "Alamo Heights", date: "1 month ago", text: "Switched to a tankless water heater and couldn't be happier. Endless hot water and lower bills. These guys are the real deal.", service: "Tankless Water Heater" },
    { name: "David Lawson", location: "Helotes", date: "2 months ago", text: "Great service from start to finish. They explained everything clearly and the price was fair. Highly recommend for any water system needs.", service: "Water Filtration System" },
    { name: "Amanda Chen", location: "New Braunfels", date: "3 months ago", text: "Our old water heater burst on a Sunday and they were out here within 2 hours to replace it. Lifesavers!", service: "Emergency Replacement" },
    { name: "Robert Taylor", location: "Schertz", date: "4 months ago", text: "Professional, punctual, and clean. They treated my home with respect and the new softener works perfectly.", service: "Water Softener Service" },
    { name: "Jessica Martinez", location: "Cibolo", date: "5 months ago", text: "Best plumbing experience I've had in San Antonio. Honest advice and quality work. Will definitely use them again.", service: "Whole Home Filtration" }
  ];

  return (
    <div className="pt-24">
      <section className="bg-navy-900 py-20 text-center text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Customer Reviews</h1>
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
            </div>
            <span className="text-xl font-bold">5 Star Rating</span>
          </div>
          <p className="text-xl text-navy-200 max-w-2xl mx-auto">
            See why hundreds of San Antonio homeowners trust us with their water systems.
          </p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 relative shadow-sm hover:shadow-md transition-all">
                <Quote className="text-blue-100 absolute top-4 right-4" size={48} />
                <div className="flex text-yellow-400 mb-4 relative z-10">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 italic mb-6 relative z-10 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-200">
                  <div>
                    <p className="font-bold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.location}, TX</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-pnf-red-600 uppercase tracking-wider">{review.service}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp" 
            alt="Pressure gauge plumbing work" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-[1px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready for 5-Star Service?</h2>
          <p className="text-xl text-navy-200 mb-10 max-w-2xl mx-auto">
            Join our list of happy customers. Call us today for your free estimate.
          </p>
          <a 
            href={`tel:${PHONE_NUMBER_RAW}`} 
            className="inline-flex items-center gap-3 bg-white text-pnf-red-600 px-10 py-5 rounded-2xl text-2xl font-black hover:bg-gray-100 transition-all shadow-2xl"
          >
            <Phone size={28} />
            Get My FREE Quote Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
