import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { COMPANY_NAME, PHONE_NUMBER, PHONE_NUMBER_RAW, EMAIL, SERVICE_AREAS, LOGO_URL } from '../constants';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Urgent CTA Banner */}
      <div className="bg-pnf-red-600 py-6">
        <div className="container mx-auto px-4 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white text-lg md:text-xl font-bold mb-3"
          >
            San Antonio&apos;s Hard Water Is Costing You Money Every Day You Wait
          </motion.p>
          <motion.a 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            href={`tel:${PHONE_NUMBER_RAW}`}
            className="inline-flex items-center gap-2 bg-white text-pnf-red-600 px-5 py-3 rounded-lg font-bold text-sm hover:bg-gray-100 transition-all"
          >
            <Phone size={16} /> Call Now - FREE Water Test
          </motion.a>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-12 max-w-[140px] mb-6">
              <img 
                src={LOGO_URL} 
                alt={COMPANY_NAME}
                className="h-auto max-h-full object-contain rounded-lg"
              />
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              San Antonio&apos;s trusted water softener and water heater installation experts. Stop hard water damage today with a FREE water test. Serving San Antonio, Boerne, New Braunfels, and surrounding areas for 28+ years.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="bg-navy-100 hover:bg-pnf-red-600 hover:text-white text-navy-700 p-2 rounded-full transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-navy-800 mb-6 border-b border-gray-200 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-pnf-red-600 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-pnf-red-600 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-pnf-red-600 transition-colors">Services</Link></li>
              <li><Link to="/gallery" className="text-gray-600 hover:text-pnf-red-600 transition-colors">Gallery</Link></li>
              <li><Link to="/reviews" className="text-gray-600 hover:text-pnf-red-600 transition-colors">Reviews</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-pnf-red-600 transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-pnf-red-600 transition-colors">Contact</Link></li>
            </ul>
          </motion.div>

          {/* Service Areas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-navy-800 mb-6 border-b border-gray-200 pb-2">Service Areas</h3>
            <ul className="grid grid-cols-2 gap-2">
              {SERVICE_AREAS.map(area => (
                <li key={area}>
                  <Link to="/service-areas" className="text-gray-600 hover:text-pnf-red-600 transition-colors text-sm">
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-navy-800 mb-6 border-b border-gray-200 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="text-pnf-red-600 mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-navy-800">Call Anytime</p>
                  <a href={`tel:${PHONE_NUMBER_RAW}`} className="text-gray-600 hover:text-pnf-red-600 transition-colors">
                    {PHONE_NUMBER}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-pnf-red-600 mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-navy-800">Email Us</p>
                  <a href={`mailto:${EMAIL}`} className="text-gray-600 hover:text-pnf-red-600 transition-colors break-all">
                    {EMAIL}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-pnf-red-600 mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-navy-800">Location</p>
                  <p className="text-gray-600">San Antonio, TX & Surrounding Areas</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="text-center md:text-left">
            <p>© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
            <p className="mt-1">Website created by <a href="https://jayswebdesignservices.com/" target="_blank" rel="noopener noreferrer" className="text-pnf-red-600 hover:text-pnf-red-700 transition-colors font-medium">Jay&apos;s Web Design Services</a></p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-pnf-red-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-pnf-red-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
