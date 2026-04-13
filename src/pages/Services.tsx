import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Droplets, Thermometer, Filter, CheckCircle2, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { PHONE_NUMBER, PHONE_NUMBER_RAW } from '../constants';

const Services = () => {
  const services = [
    {
      id: 'water-softeners',
      title: 'Water Softener Installation San Antonio',
      icon: Droplets,
      description: 'San Antonio has some of the HARDEST water in Texas (15-20 grains). Without a water softener, hard water destroys your appliances, clogs your pipes, and costs you hundreds in extra soap and energy bills every year.',
      features: [
        'Stops scale buildup that destroys appliances',
        'Extends water heater life by 5+ years',
        'Softer skin, shinier hair, cleaner dishes',
        'Save up to $800/year on soap & energy',
        'FREE water hardness test included'
      ],
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%283%29-eVGKCjJfKNFf225V5TmycvQFh6jkWZ.webp'
    },
    {
      id: 'water-heaters',
      title: 'Tankless Water Heater Installation San Antonio',
      icon: Thermometer,
      description: 'Tired of running out of hot water? Tankless water heaters provide UNLIMITED hot water on demand while cutting your energy bills by up to 30%. We offer same-day installation.',
      features: [
        'Unlimited hot water - never run out again',
        'Save up to 30% on energy bills',
        'Lasts 20+ years (vs 10 for tank heaters)',
        'Same-day installation available',
        'FREE estimate - no obligation'
      ],
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%284%29-RvHGOWWeQJaPYX7Q2X9brTxLWMrd3n.webp'
    },
    {
      id: 'water-filtration',
      title: 'Whole Home Water Filtration San Antonio',
      icon: Filter,
      description: 'San Antonio tap water contains chlorine, sediment, and contaminants you can taste and smell. Our whole-home filtration systems give you pure, clean water from EVERY tap - for drinking, cooking, and bathing.',
      features: [
        'Removes chlorine, sediment & contaminants',
        'Better tasting water from every faucet',
        'Protects your family from harmful chemicals',
        'No more buying bottled water',
        'Professional installation included'
      ],
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp'
    }
  ];

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
            Water Softener & Water Heater Services in San Antonio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-navy-200 max-w-2xl mx-auto mb-8"
          >
            Professional installation, repair, and maintenance for water softeners, tankless water heaters, and whole-home filtration systems. <strong>Same-day service available.</strong>
          </motion.p>
          <motion.a 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            href={`tel:${PHONE_NUMBER_RAW}`}
            className="inline-flex items-center gap-2 bg-pnf-red-600 hover:bg-pnf-red-700 text-white px-8 py-4 rounded-xl font-black text-lg transition-all"
          >
            <Phone size={20} /> Call Now For FREE Quote
          </motion.a>
        </div>
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%281%29-IuygaLd5EPfrCEPoqTS9z6mkARM4ST.webp" 
            alt="Plumbing installation" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
              >
                <motion.div 
                  className="lg:w-1/2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="absolute -bottom-4 -right-4 bg-pnf-red-600 text-white p-4 rounded-xl shadow-lg"
                    >
                      <service.icon size={32} />
                    </motion.div>
                  </div>
                </motion.div>
                <div className="lg:w-1/2">
                  <motion.h2 
                    initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-navy-800 mb-4"
                  >
                    {service.title}
                  </motion.h2>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <motion.li 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className="text-pnf-red-600 shrink-0" size={20} />
                        <span className="text-navy-700 font-medium">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Link 
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 bg-pnf-red-600 hover:bg-pnf-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all hover:gap-3"
                  >
                    Learn More
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "San Antonio Installations" },
              { value: "28+", label: "Years Experience" },
              { value: "5", label: "Star Rating" },
              { value: "$800+", label: "Avg. Annual Savings" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.p 
                  className="text-5xl font-black text-pnf-red-400 mb-2"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-navy-200">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp" 
            alt="Pressure gauge plumbing work" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-navy-900/70 backdrop-blur-[1px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Don&apos;t Let Hard Water Cost You Another Day</h2>
          <p className="text-xl text-navy-200 mb-4 max-w-2xl mx-auto">
            Get your FREE water test and see exactly what&apos;s damaging your San Antonio home. No cost, no obligation.
          </p>
          <p className="text-lg text-yellow-400 font-bold mb-10">
            Same-day appointments available - Call now!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href={`tel:${PHONE_NUMBER_RAW}`} 
              className="inline-flex items-center justify-center gap-3 bg-white text-pnf-red-600 px-10 py-5 rounded-2xl text-2xl font-black hover:bg-gray-100 transition-all shadow-2xl"
            >
              <Phone size={28} />
              Get My FREE Quote Now
            </a>
            <a 
              href={`sms:${PHONE_NUMBER_RAW}?body=${encodeURIComponent("Hi! I'd like a free quote for my water system.")}`}
              className="inline-flex items-center justify-center gap-3 bg-navy-800 hover:bg-navy-700 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all"
            >
              <MessageSquare size={24} />
              Text Us - Let&apos;s Chat!
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
