import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Droplets, Thermometer, Filter, ShieldCheck, Clock, Award, CheckCircle2, ArrowRight, Phone, ChevronDown, MessageSquare, Star } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import LeadForm from '../components/LeadForm';
import { SERVICES, PHONE_NUMBER, PHONE_NUMBER_RAW } from '../constants';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />

      {/* Urgent Quiz Strip */}
      <Link to="/quiz" className="block">
        <div className="bg-gradient-to-r from-pnf-red-700 via-pnf-red-600 to-pnf-red-700 py-4 px-4 relative overflow-hidden group cursor-pointer border-y-2 border-yellow-400">
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="container mx-auto flex items-center justify-center gap-3 text-white relative z-10">
            <span className="bg-yellow-400 text-black text-xs font-black uppercase tracking-wider px-3 py-1 rounded animate-pulse">
              WARNING
            </span>
            <p className="text-sm md:text-base font-bold text-center">
              <span className="hidden sm:inline">San Antonio&apos;s Hard Water Is Damaging Your Home RIGHT NOW - </span>
              Take Our FREE 60-Second Risk Assessment
            </p>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </Link>

      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-pnf-red-600 font-bold uppercase tracking-wider mb-4">Stop Hard Water Damage Today</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  San Antonio&apos;s Hard Water Is Costing You $800+ Per Year
                </h3>
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                  <strong>Here&apos;s the truth:</strong> San Antonio water averages 15-20 grains of hardness - that&apos;s 3x the recommended level. Every day without a water softener, you&apos;re paying more for:
                </p>
                <ul className="text-lg text-gray-600 mb-6 space-y-2">
                  <li className="flex items-start gap-2"><span className="text-pnf-red-600 font-bold">-</span> Appliances that break down 30% faster</li>
                  <li className="flex items-start gap-2"><span className="text-pnf-red-600 font-bold">-</span> Energy bills up to 25% higher from scale buildup</li>
                  <li className="flex items-start gap-2"><span className="text-pnf-red-600 font-bold">-</span> Plumbing repairs from clogged pipes</li>
                  <li className="flex items-start gap-2"><span className="text-pnf-red-600 font-bold">-</span> Extra soap, shampoo, and cleaning products</li>
                </ul>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-pnf-red-600" size={24} />
                    <span className="font-semibold text-navy-800">Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-pnf-red-600" size={24} />
                    <span className="font-semibold text-navy-800">Same-Day Service Available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-pnf-red-600" size={24} />
                    <span className="font-semibold text-navy-800">Free On-Site Estimates</span>
                  </div>
                </div>
                <a 
                  href={`tel:${PHONE_NUMBER_RAW}`}
                  className="inline-flex items-center gap-2 bg-pnf-red-600 hover:bg-pnf-red-700 text-white px-5 py-3 rounded-lg font-bold text-sm transition-all"
                >
                  <Phone size={16} /> Get My FREE Water Test Now
                </a>
              </motion.div>
            </div>
            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-2xl"
              >
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%281%29-IuygaLd5EPfrCEPoqTS9z6mkARM4ST.webp" 
                  alt="PNF Plumbing installation work" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute -bottom-6 -left-6 bg-pnf-red-600 text-white p-8 rounded-2xl shadow-xl hidden md:block">
                <p className="text-4xl font-bold mb-1">28+</p>
                <p className="text-sm font-medium uppercase tracking-widest">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Owner */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/4"
            >
              <div className="relative max-w-[260px] mx-auto">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000004496.jpg-zk2JdT3h7UvxFobdVosOceSAKvdEqf.jpeg" 
                  alt="Jacinto Lefebre, Owner of PNF Water Heaters & Softeners" 
                  className="rounded-2xl shadow-2xl w-full aspect-[3/4] object-cover object-top border-4 border-white"
                />
                <div className="absolute -bottom-3 -right-3 bg-navy-900 text-white px-4 py-3 rounded-lg shadow-lg">
                  <p className="font-bold text-sm">Master Plumber</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-3/4"
            >
              <h2 className="text-pnf-red-600 font-bold uppercase tracking-wider mb-4">Meet the Owner</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Jacinto Lefebre</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                With 28+ years of hands-on plumbing experience and over a decade as a certified master plumber, Jacinto Lefebre brings unmatched expertise to every job. His commitment to quality workmanship and honest service has made PNF Water Heaters & Softeners the trusted choice for San Antonio homeowners.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                When you work with PNF, you&apos;re not just getting a service provider—you&apos;re getting a dedicated professional who treats your home like his own.
              </p>
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 bg-pnf-red-600 hover:bg-pnf-red-700 text-white px-5 py-3 rounded-lg font-semibold text-sm transition-all"
              >
                Learn More About Us <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-pnf-red-600 font-bold uppercase tracking-wider mb-4">Water Softener Installation San Antonio TX</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Protect Your Home. Protect Your Family. Save Money.</h3>
            <p className="text-lg text-gray-600">
              We install premium water softeners, tankless water heaters, and whole-home filtration systems. <strong>Same-day installation available.</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="bg-navy-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pnf-red-600 transition-colors">
                  {service.id === 'water-softeners' && <Droplets className="text-navy-600 group-hover:text-white" size={32} />}
                  {service.id === 'water-heaters' && <Thermometer className="text-navy-600 group-hover:text-white" size={32} />}
                  {service.id === 'water-filtration' && <Filter className="text-navy-600 group-hover:text-white" size={32} />}
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Link 
                  to={service.href} 
                  className="inline-flex items-center gap-2 text-pnf-red-600 font-bold group-hover:gap-3 transition-all"
                >
                  Service Details <ArrowRight size={18} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <h2 className="text-pnf-red-400 font-bold uppercase tracking-wider mb-4">Why San Antonio Homeowners Choose Us</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-10 leading-tight">
                Over 500+ San Antonio Families Trust Us With Their Water
              </h3>
              <div className="space-y-8">
                {[
                  { icon: ShieldCheck, title: "Licensed & Certified", description: "Our technicians are fully licensed and undergo regular training to stay ahead of industry standards." },
                  { icon: Clock, title: "Punctual & Professional", description: "We respect your time. We arrive on schedule and treat your home with the utmost care and cleanliness." },
                  { icon: Award, title: "Premium Equipment", description: "We only install top-tier, high-efficiency systems from brands we trust and stand behind." }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="flex gap-4"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-navy-800 p-3 rounded-lg shrink-0"
                    >
                      <item.icon className="text-pnf-red-400" size={28} />
                    </motion.div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-navy-200">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2 w-full"
            >
              <LeadForm 
                title="Get Your FREE Water Test Today" 
                subtitle="Find out exactly what's in YOUR water. No cost, no obligation - we'll test your water and show you the results."
                className="text-gray-900"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-pnf-red-600 font-bold uppercase tracking-wider mb-4">Real San Antonio Homeowners</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900">See Why Your Neighbors Chose Us</h3>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Don&apos;t take our word for it - hear from San Antonio families who solved their hard water problems.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { name: "Sarah J.", location: "Stone Oak", text: "The water softener installation was quick and professional. No more hard water spots on my dishes!" },
              { name: "Michael R.", location: "Alamo Heights", text: "Switched to a tankless water heater and couldn't be happier. Endless hot water and lower bills." },
              { name: "David L.", location: "Helotes", text: "Great service from start to finish. They explained everything clearly and the price was fair." }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-100"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={18} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 italic mb-6">"{review.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.location}, TX</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/reviews" className="bg-pnf-red-600 hover:bg-pnf-red-700 text-white px-5 py-3 rounded-lg font-semibold text-sm transition-all inline-block">
              Read More Reviews
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Preview */}
      <FAQSection />

      {/* Final CTA */}
      <section className="py-16 text-white relative overflow-hidden min-h-[400px]">
        <div className="absolute inset-0 z-0 w-full h-full">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp" 
            alt="Pressure gauge plumbing work" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-[1px]" />
        </div>
        <div className="absolute inset-0 opacity-10 z-10">
          <Droplets className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2" />
          <Droplets className="absolute bottom-0 right-0 w-64 h-64 translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Stop Paying for Hard Water Damage
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-navy-100 mb-4 max-w-2xl mx-auto"
          >
            Every day you wait costs you money. Get your <strong>FREE water test</strong> and see exactly what&apos;s in your San Antonio water.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-yellow-400 font-bold mb-10"
          >
            Call now - Same day appointments available!
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href={`tel:${PHONE_NUMBER_RAW}`} 
              className="bg-white text-pnf-red-600 px-6 py-3 rounded-xl text-base font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              <Phone size={18} />
              Get My FREE Quote Now
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href={`sms:${PHONE_NUMBER_RAW}?body=${encodeURIComponent("Hi! I'd like a free quote for my water system.")}`}
              className="bg-navy-800 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-navy-700 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare size={16} />
              Text Us - Let&apos;s Chat!
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// FAQ Section Component
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is a water softener and why do I need one?",
      a: "A water softener removes calcium, magnesium, and other minerals from your water. San Antonio has some of the hardest water in Texas, which can cause scale buildup in pipes, damage appliances, and leave spots on dishes. A water softener protects your home and improves water quality."
    },
    {
      q: "Should I get a tank or tankless water heater?",
      a: "It depends on your needs. Tank water heaters have lower upfront costs. Tankless water heaters cost more initially but provide endless hot water, last longer (20+ years vs 10-12 years), and save on energy bills. We can assess your home to recommend the best option."
    },
    {
      q: "Do you offer free estimates?",
      a: "Yes! We provide free on-site estimates for all water softener, water heater, and filtration installations. Our technician will assess your needs, answer your questions, and provide a detailed quote with no obligation."
    },
    {
      q: "What areas do you serve?",
      a: "We serve San Antonio and all surrounding communities including Boerne, New Braunfels, Helotes, Stone Oak, Alamo Heights, Schertz, Cibolo, Universal City, Converse, and more. If you're unsure if we service your area, give us a call!"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-pnf-red-600 font-bold uppercase tracking-wider mb-4">Common Questions</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h3>
        </div>
        <div className="max-w-3xl mx-auto space-y-4 mb-10">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-navy-800">{faq.q}</span>
                <ChevronDown 
                  className={cn(
                    "shrink-0 text-pnf-red-600 transition-transform",
                    openIndex === index && "rotate-180"
                  )} 
                  size={24} 
                />
              </button>
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <p className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/faq" className="inline-flex items-center gap-2 text-pnf-red-600 font-bold hover:gap-3 transition-all">
            View All FAQs <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
