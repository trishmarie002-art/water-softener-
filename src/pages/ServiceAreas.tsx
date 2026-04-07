import React from 'react';
import { MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { SERVICE_AREAS, PHONE_NUMBER, PHONE_NUMBER_RAW } from '../constants';

const ServiceAreas = () => {
  return (
    <div className="pt-24">
      <section className="bg-navy-900 py-20 text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Service Areas</h1>
          <p className="text-xl text-navy-200 max-w-2xl mx-auto">
            Providing expert water system services to San Antonio and all surrounding communities.
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Where We Work</h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                We are proud to serve the greater San Antonio metropolitan area. Our team of expert technicians is always nearby, ready to provide fast and reliable water softener and water heater services.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICE_AREAS.map(area => (
                  <div key={area} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <MapPin className="text-pnf-red-600" size={20} />
                    <span className="font-bold text-gray-800">{area}, TX</span>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-8 bg-navy-50 rounded-2xl border border-navy-100">
                <h3 className="text-xl font-bold text-navy-900 mb-4">Don&apos;t see your city?</h3>
                <p className="text-navy-700 mb-6">We often travel outside our standard service area for larger installations. Give us a call to see if we can help you!</p>
                <a href={`tel:${PHONE_NUMBER_RAW}`} className="text-pnf-red-600 font-black text-2xl flex items-center gap-2">
                  <Phone size={24} /> {PHONE_NUMBER}
                </a>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl h-[500px] flex items-center justify-center overflow-hidden shadow-inner border border-gray-200">
              {/* Placeholder for Map */}
              <div className="text-center p-8">
                <MapPin size={64} className="text-pnf-red-600 mx-auto mb-4 opacity-50" />
                <p className="text-gray-500 font-medium">Interactive Service Map Coming Soon</p>
                <p className="text-sm text-gray-400">Serving all of Bexar, Comal, and Guadalupe Counties</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Blurbs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Trusted Local Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h4 className="text-xl font-bold mb-4">San Antonio Water Experts</h4>
              <p className="text-gray-600">From Stone Oak to Southtown, we know San Antonio water. Our systems are specifically calibrated for the local hardness levels found in the Edwards Aquifer.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h4 className="text-xl font-bold mb-4">New Braunfels & Schertz</h4>
              <p className="text-gray-600">Fast response times for our neighbors to the northeast. We provide same-day water heater replacement for homes in New Braunfels and Schertz.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h4 className="text-xl font-bold mb-4">Boerne & Helotes</h4>
              <p className="text-gray-600">Serving the hill country with premium water filtration and softening solutions. We understand the unique well water challenges in these areas.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceAreas;
