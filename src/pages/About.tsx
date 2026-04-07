import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Heart, MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
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
            className="text-xl text-navy-200 text-center max-w-3xl mx-auto"
          >
            Your local plumbing company. Family-owned water system specialists dedicated to quality, integrity, and your home's comfort.
          </motion.p>
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src="/images/jacinto-lefebre.jpg" 
                  alt="Jacinto Lefebre, Owner and Master Plumber" 
                  className="rounded-2xl shadow-2xl w-full object-cover"
                />
                <div className="absolute -bottom-4 -right-4 bg-pnf-red-600 text-white px-6 py-4 rounded-xl shadow-lg">
                  <p className="text-2xl font-bold">28+</p>
                  <p className="text-sm uppercase tracking-wider">Years Experience</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
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
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-pnf-red-600" />
                  <span className="font-bold">Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-pnf-red-600 font-bold uppercase tracking-wider mb-4">Our Values</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">The Principles That Drive Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-2xl shadow-lg">
              <div className="bg-navy-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-pnf-red-600" size={32} />
              </div>
              <h4 className="text-2xl font-bold mb-4">Unmatched Integrity</h4>
              <p className="text-gray-600">We believe in honest pricing and transparent communication. No hidden fees, no unnecessary upsells—just what your home needs.</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-lg">
              <div className="bg-navy-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-pnf-red-600" size={32} />
              </div>
              <h4 className="text-2xl font-bold mb-4">Customer First</h4>
              <p className="text-gray-600">Your satisfaction is our top priority. We go above and beyond to ensure every customer is happy with their new water system.</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-lg">
              <div className="bg-navy-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-pnf-red-600" size={32} />
              </div>
              <h4 className="text-2xl font-bold mb-4">Local Commitment</h4>
              <p className="text-gray-600">We&apos;re proud to be a part of the San Antonio community. We support local initiatives and strive to make our city a better place.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white relative overflow-hidden">
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
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Experience the Difference</h2>
          <p className="text-xl text-navy-200 mb-10 max-w-2xl mx-auto">
            Ready to work with a team that actually cares about your home? Give us a call today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a 
              href={`tel:${PHONE_NUMBER_RAW}`} 
              className="bg-white text-pnf-red-600 px-10 py-5 rounded-2xl text-2xl font-black hover:bg-gray-100 transition-all flex items-center justify-center gap-3"
            >
              <Phone size={28} />
              {PHONE_NUMBER}
            </a>
            <Link to="/contact" className="bg-navy-800 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-navy-700 transition-all">
              Get a Free Estimate
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
