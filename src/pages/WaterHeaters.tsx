import React from 'react';
import { motion } from 'motion/react';
import { Thermometer, CheckCircle2, Phone, Zap, Clock, ShieldCheck } from 'lucide-react';
import LeadForm from '../components/LeadForm';
import { PHONE_NUMBER, PHONE_NUMBER_RAW } from '../constants';

const WaterHeaters = () => {
  return (
    <div className="pt-24">
      <section className="bg-navy-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Water Heater <span className="text-pnf-red-600">Installation</span> & Replacement
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Don't get left in the cold. We provide fast, professional water heater replacement and installation for San Antonio homes.
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  <a href={`tel:${PHONE_NUMBER_RAW}`} className="bg-pnf-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-pnf-red-700 transition-all shadow-lg shadow-pnf-red-600/20">
                    Call Now: {PHONE_NUMBER}
                  </a>
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="/input_file_0.png" 
                alt="Water heater installation" 
                className="rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-pnf-red-600 font-bold uppercase tracking-wider mb-4">Our Expertise</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Traditional & Tankless Options</h3>
            <p className="text-lg text-gray-600">
              Whether you need a standard tank replacement or want to upgrade to an endless hot water tankless system, we've got you covered.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100">
              <h4 className="text-2xl font-bold mb-4 text-navy-700">Traditional Tank Heaters</h4>
              <p className="text-gray-600 mb-6">Reliable and cost-effective solutions for every home size. We install high-efficiency models that meet all modern standards.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={18} /> Lower upfront cost</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={18} /> Proven reliability</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={18} /> Fast installation</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100">
              <h4 className="text-2xl font-bold mb-4 text-navy-700">Tankless Water Heaters</h4>
              <p className="text-gray-600 mb-6">Enjoy endless hot water and save space with a modern tankless system. Perfect for large families and energy savings.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={18} /> Endless hot water</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={18} /> Space-saving design</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={18} /> 20+ year lifespan</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h3 className="text-3xl md:text-4xl font-bold mb-8">Signs You Need a New Unit</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-navy-800 p-3 rounded-lg shrink-0"><Clock className="text-pnf-red-400" size={24} /></div>
                  <div>
                    <h4 className="text-xl font-bold">Age Over 10 Years</h4>
                    <p className="text-navy-200">Most traditional heaters last 8-12 years. If yours is older, it&apos;s time to plan.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-navy-800 p-3 rounded-lg shrink-0"><Zap className="text-pnf-red-400" size={24} /></div>
                  <div>
                    <h4 className="text-xl font-bold">Rusty or Discolored Water</h4>
                    <p className="text-navy-200">This often indicates internal corrosion and a potential tank failure.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-navy-800 p-3 rounded-lg shrink-0"><ShieldCheck className="text-pnf-red-400" size={24} /></div>
                  <div>
                    <h4 className="text-xl font-bold">Strange Noises</h4>
                    <p className="text-navy-200">Popping or rumbling sounds are caused by sediment buildup at the bottom.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <LeadForm title="Water Heater Quote" subtitle="Get a fast estimate for your replacement." className="text-gray-900" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523362628242-f513a30ef270?auto=format&fit=crop&q=80&w=1920" 
            alt="Water background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-[1px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Need Hot Water Now?</h2>
          <a href={`tel:${PHONE_NUMBER_RAW}`} className="inline-flex items-center gap-3 bg-white text-pnf-red-600 px-10 py-5 rounded-2xl text-2xl font-black hover:bg-gray-100 transition-all shadow-2xl">
            <Phone size={28} />
            {PHONE_NUMBER}
          </a>
        </div>
      </section>
    </div>
  );
};

export default WaterHeaters;
