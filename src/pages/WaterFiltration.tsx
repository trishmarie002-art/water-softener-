import React from 'react';
import { motion } from 'motion/react';
import { Filter, CheckCircle2, Phone, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import LeadForm from '../components/LeadForm';
import { PHONE_NUMBER, PHONE_NUMBER_RAW } from '../constants';

const WaterFiltration = () => {
  return (
    <div className="pt-24">
      <section className="bg-navy-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Whole-Home <span className="text-pnf-red-600">Water Filtration</span> Systems
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Enjoy pure, clean, and great-tasting water from every tap in your home. Remove chlorine, chemicals, and contaminants today.
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  <a href={`tel:${PHONE_NUMBER_RAW}`} className="inline-flex items-center gap-2 bg-pnf-red-600 text-white px-5 py-3 rounded-lg font-bold text-sm hover:bg-pnf-red-700 transition-all">
                    <Phone size={16} /> Get My FREE Quote Now
                  </a>
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%283%29-eVGKCjJfKNFf225V5TmycvQFh6jkWZ.webp" 
                alt="Kitchen sink with modern faucet" 
                className="rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl mx-auto">
          <h2 className="text-pnf-red-600 font-bold uppercase tracking-wider mb-4">Pure Water, Pure Life</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Why Install a Whole-Home Filtration System?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="text-pnf-red-600 mb-4"><Sparkles size={32} /></div>
              <h4 className="text-xl font-bold mb-3">Better Taste & Odor</h4>
              <p className="text-gray-600">Remove the "swimming pool" smell and metallic taste from your tap water for better coffee, tea, and cooking.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="text-pnf-red-600 mb-4"><ShieldCheck size={32} /></div>
              <h4 className="text-xl font-bold mb-3">Chemical Removal</h4>
              <p className="text-gray-600">Our systems effectively filter out chlorine, chloramines, pesticides, and other harmful chemicals.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="text-pnf-red-600 mb-4"><Heart size={32} /></div>
              <h4 className="text-xl font-bold mb-3">Healthier Family</h4>
              <p className="text-gray-600">Provide your family with the safest water possible for drinking, bathing, and brushing teeth.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h3 className="text-3xl md:text-4xl font-bold mb-8">Our Filtration Solutions</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="text-pnf-red-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-xl">Carbon Filtration</p>
                    <p className="text-navy-200">The gold standard for removing chlorine and organic compounds.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="text-pnf-red-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-xl">Reverse Osmosis</p>
                    <p className="text-navy-200">Advanced multi-stage filtration for the purest drinking water possible.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="text-pnf-red-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-xl">Sediment Pre-Filters</p>
                    <p className="text-navy-200">Protect your entire plumbing system from sand, silt, and rust particles.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 w-full">
              <LeadForm title="Water Quality Test" subtitle="Schedule a professional water analysis today." className="text-gray-900" />
            </div>
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
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready for Cleaner Water?</h2>
          <a href={`tel:${PHONE_NUMBER_RAW}`} className="inline-flex items-center gap-2 bg-white text-pnf-red-600 px-6 py-3 rounded-xl text-base font-bold hover:bg-gray-100 transition-all shadow-xl">
            <Phone size={18} />
            Get My FREE Quote Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default WaterFiltration;
