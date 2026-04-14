import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { SERVICE_AREAS, PHONE_NUMBER, PHONE_NUMBER_RAW } from '../constants';

const ServiceAreas = () => {
  return (
    <div className="pt-24">
      <section className="bg-navy-900 py-20 text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Water Softener Installation Near You
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-navy-200 max-w-2xl mx-auto mb-8"
          >
            Serving San Antonio, Boerne, New Braunfels, Helotes, Stone Oak, and all surrounding areas. <strong>Same-day service available.</strong>
          </motion.p>
          <motion.a 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            href={`tel:${PHONE_NUMBER_RAW}`}
            className="inline-flex items-center gap-2 bg-pnf-red-600 hover:bg-pnf-red-700 text-white px-8 py-4 rounded-xl font-black text-lg transition-all"
          >
            <Phone size={20} /> Call Now - FREE Water Test
          </motion.a>
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

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">San Antonio Water Softener Installation</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                <strong>San Antonio has some of the hardest water in Texas</strong> - averaging 15-20 grains of hardness. That means every home in our service area is at risk for:
              </p>
              <ul className="text-lg text-gray-600 mb-10 space-y-2">
                <li className="flex items-start gap-2"><CheckCircle2 className="text-pnf-red-600 shrink-0 mt-1" size={18} /> Scale buildup destroying appliances</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="text-pnf-red-600 shrink-0 mt-1" size={18} /> Clogged pipes and reduced water pressure</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="text-pnf-red-600 shrink-0 mt-1" size={18} /> Dry skin, dull hair, and spotted dishes</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="text-pnf-red-600 shrink-0 mt-1" size={18} /> Higher energy bills from inefficient water heaters</li>
              </ul>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICE_AREAS.map((area, index) => (
                  <motion.div 
                    key={area}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100"
                  >
                    <MapPin className="text-pnf-red-600" size={20} />
                    <span className="font-bold text-gray-800">{area}, TX</span>
                  </motion.div>
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
      <section className="py-16 bg-navy-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Why San Antonio Homeowners Choose Us</h2>
          <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">We understand the unique water challenges in every neighborhood we serve.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Water Softener San Antonio", description: "From Stone Oak to Southtown, we know San Antonio water. Our systems are specifically calibrated for the extreme hardness levels (15-20 grains) found in the Edwards Aquifer region.", highlight: "FREE water test for all San Antonio homes" },
              { title: "Water Softener New Braunfels & Schertz", description: "Fast response times for our neighbors to the northeast. We provide same-day water softener and water heater installation for homes in New Braunfels, Schertz, and Cibolo.", highlight: "Same-day installation available" },
              { title: "Water Softener Boerne & Helotes", description: "Serving the Texas Hill Country with premium water softeners and filtration systems. We understand the unique well water challenges in these areas and have solutions for every home.", highlight: "Well water specialists" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-pnf-red-600"
              >
                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <p className="text-pnf-red-600 font-bold">{item.highlight}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-pnf-red-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Stop Hard Water Damage?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get your FREE water test today and see exactly what&apos;s in your water. No cost, no obligation.
          </p>
          <a 
            href={`tel:${PHONE_NUMBER_RAW}`}
            className="inline-flex items-center gap-2 bg-white text-pnf-red-600 px-8 py-4 rounded-xl font-black text-lg hover:bg-gray-100 transition-all"
          >
            <Phone size={20} /> Call Now - Same Day Service
          </a>
        </div>
      </section>
    </div>
  );
};

export default ServiceAreas;
