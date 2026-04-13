import React from 'react';
import { motion } from 'motion/react';

import { ShieldCheck, Users, Heart, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import { COMPANY_NAME, PHONE_NUMBER, PHONE_NUMBER_RAW } from '../constants';

const About = () => {
  return (
    <div className="pt-24">
      {/* Hero Header */}
      <section className="bg-navy-900 py-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-center"
          >
            About {COMPANY_NAME}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-navy-200 text-center max-w-3xl mx-auto mb-8"
          >
            Family-owned water softener experts serving San Antonio for 28+ years. We&apos;ve helped over 500 local families solve their hard water problems.
          </motion.p>
          <div className="flex justify-center">
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              href={`tel:${PHONE_NUMBER_RAW}`}
              className="inline-flex items-center gap-2 bg-pnf-red-600 hover:bg-pnf-red-700 text-white px-8 py-4 rounded-xl font-black text-lg transition-all"
            >
              <Phone size={20} /> Get Your FREE Water Test
            </motion.a>
          </div>
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

      {/* Our Story */}
      <section className="pt-8 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/3 relative"
            >
              <div className="relative max-w-[260px] mx-auto">
                <img 
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000004496.jpg-zk2JdT3h7UvxFobdVosOceSAKvdEqf.jpeg" 
                  alt="Jacinto Lefebre, Owner and Master Plumber" 
                  className="rounded-2xl shadow-2xl w-full aspect-[3/4] object-cover object-top border-4 border-white"
                />
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="absolute -bottom-3 -right-3 bg-pnf-red-600 text-white px-4 py-3 rounded-lg shadow-lg"
                >
                  <p className="text-xl font-bold">28+</p>
                  <p className="text-xs uppercase tracking-wider">Years Experience</p>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-2/3 lg:pt-8"
            >
              <h2 className="text-pnf-red-600 font-bold uppercase tracking-wider mb-4">Meet the Owner</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Jacinto Lefebre, Master Plumber</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                With over 28 years of hands-on plumbing experience and more than a decade as a certified master plumber, Jacinto Lefebre has built {COMPANY_NAME} into San Antonio&apos;s premier water system service provider.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Jacinto understands the unique challenges of San Antonio&apos;s hard water. His dedication to quality craftsmanship and honest service has built a reputation that speaks for itself. We don&apos;t just install systems; we build lasting relationships based on trust and exceptional service.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-pnf-red-600" />
                  <span className="font-bold">Locally Owned</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-pnf-red-600" />
                  <span className="font-bold">Family Operated</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-pnf-red-600" />
                  <span className="font-bold">Expert Technicians</span>
                </div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="text-pnf-red-600" />
                  <span className="font-bold">Quality Guaranteed</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-pnf-red-600 font-bold uppercase tracking-wider mb-4"
          >
            Our Values
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-16"
          >
            The Principles That Drive Us
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: "Unmatched Integrity", description: "We believe in honest pricing and transparent communication. No hidden fees, no unnecessary upsells—just what your home needs." },
              { icon: Users, title: "Customer First", description: "Your satisfaction is our top priority. We go above and beyond to ensure every customer is happy with their new water system." },
              { icon: Heart, title: "Local Commitment", description: "We're proud to be a part of the San Antonio community. We support local initiatives and strive to make our city a better place." }
            ].map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -10, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                className="bg-white p-10 rounded-2xl shadow-lg"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                  className="bg-navy-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <value.icon className="text-pnf-red-600" size={32} />
                </motion.div>
                <h4 className="text-2xl font-bold mb-4">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp" 
            alt="Pressure gauge plumbing work" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-[1px]" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Your San Antonio Neighbors Trust Us - You Can Too</h2>
          <p className="text-xl text-navy-200 mb-4 max-w-2xl mx-auto">
            Stop letting hard water damage your home. Get your FREE water test today and see exactly what&apos;s in your water.
          </p>
          <p className="text-lg text-yellow-400 font-bold mb-10">
            No cost, no obligation - Same day appointments available!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a 
              href={`tel:${PHONE_NUMBER_RAW}`} 
              className="bg-white text-pnf-red-600 px-10 py-5 rounded-2xl text-2xl font-black hover:bg-gray-100 transition-all flex items-center justify-center gap-3"
            >
              <Phone size={28} />
              Get My FREE Quote Now
            </a>
            <a 
              href={`sms:${PHONE_NUMBER_RAW}?body=${encodeURIComponent("Hi! I'd like a free quote for my water system.")}`}
              className="bg-navy-800 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-navy-700 transition-all flex items-center justify-center gap-3"
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

export default About;
