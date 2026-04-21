import React from 'react';
import { motion } from 'motion/react';
import { Droplets, CheckCircle2, Phone, Zap, Sparkles } from 'lucide-react';
import LeadForm from '../components/LeadForm';
import { PHONE_NUMBER, PHONE_NUMBER_RAW } from '../constants';

const WaterSofteners = () => {
  return (
    <div className="pt-24">
      <section className="bg-navy-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  Water Softener <span className="text-pnf-red-600">Installation</span> in San Antonio
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Protect your home from San Antonio's notoriously hard water. Our high-efficiency softening systems save you money and protect your plumbing.
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  <a href={`tel:${PHONE_NUMBER_RAW}`} className="inline-flex items-center gap-2 bg-pnf-red-600 text-white px-5 py-3 rounded-lg font-bold text-sm hover:bg-pnf-red-700 transition-all">
                    <Phone size={16} /> Call Us Today
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
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-pnf-red-600 font-bold uppercase tracking-wider mb-4">The Problem</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">San Antonio Has Extremely Hard Water</h3>
            <p className="text-lg text-gray-600">
              Hard water contains high levels of calcium and magnesium, which create scale buildup in your pipes, appliances, and fixtures.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <div className="text-red-500 mb-4"><Zap size={32} /></div>
              <h4 className="text-xl font-bold mb-4">Damaged Appliances</h4>
              <p className="text-gray-600">Scale buildup forces your water heater and dishwasher to work harder, leading to frequent repairs and early failure.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <div className="text-red-500 mb-4"><Droplets size={32} /></div>
              <h4 className="text-xl font-bold mb-4">Clogged Plumbing</h4>
              <p className="text-gray-600">Mineral deposits narrow your pipes over time, reducing water pressure and eventually causing expensive leaks.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <div className="text-red-500 mb-4"><Sparkles size={32} /></div>
              <h4 className="text-xl font-bold mb-4">Skin & Hair Issues</h4>
              <p className="text-gray-600">Hard water strips natural oils from your skin and hair, leaving them dry, itchy, and dull after every shower.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h3 className="text-3xl md:text-4xl font-bold mb-8">Benefits of Soft Water</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="text-pnf-red-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-xl">Extend Appliance Life</p>
                    <p className="text-navy-200">Protect your water heater, dishwasher, and washing machine from scale damage.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="text-pnf-red-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-xl">Lower Utility Bills</p>
                    <p className="text-navy-200">Soft water allows your water heater to run more efficiently, saving you money every month.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 w-full">
              <LeadForm title="Request a Water Test" subtitle="Call us to schedule your water analysis." className="text-gray-900" />
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
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Stop Battling Hard Water</h2>
          <a href={`tel:${PHONE_NUMBER_RAW}`} className="inline-flex items-center gap-2 bg-white text-pnf-red-600 px-6 py-3 rounded-xl text-base font-bold hover:bg-gray-100 transition-all shadow-xl">
            <Phone size={18} />
            Call Us Today
          </a>
        </div>
      </section>
    </div>
  );
};

export default WaterSofteners;
