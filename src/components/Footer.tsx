import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { COMPANY_NAME, PHONE_NUMBER, PHONE_NUMBER_RAW, EMAIL, SERVICE_AREAS, LOGO_URL } from '../constants';

const Footer = () => {
  return (
    <footer className="bg-navy-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <img 
                src={LOGO_URL} 
                alt={COMPANY_NAME}
                className="h-16 w-auto rounded-lg bg-white p-1"
              />
            </div>
            <p className="text-navy-200 mb-6 leading-relaxed">
              Your local plumbing company. Trusted experts for water softeners, water heaters, and whole-home filtration. Quality service done right the first time.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-navy-800 hover:bg-pnf-red-600 p-2 rounded-full transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-navy-800 hover:bg-pnf-red-600 p-2 rounded-full transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-navy-800 hover:bg-pnf-red-600 p-2 rounded-full transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-navy-700 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-navy-200 hover:text-pnf-red-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-navy-200 hover:text-pnf-red-400 transition-colors">About Us</Link></li>
              <li><Link to="/services/water-softeners" className="text-navy-200 hover:text-pnf-red-400 transition-colors">Water Softeners</Link></li>
              <li><Link to="/services/water-heaters" className="text-navy-200 hover:text-pnf-red-400 transition-colors">Water Heaters</Link></li>
              <li><Link to="/services/water-filtration" className="text-navy-200 hover:text-pnf-red-400 transition-colors">Water Filtration</Link></li>
              <li><Link to="/reviews" className="text-navy-200 hover:text-pnf-red-400 transition-colors">Customer Reviews</Link></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-navy-700 pb-2">Service Areas</h3>
            <ul className="grid grid-cols-2 gap-2">
              {SERVICE_AREAS.map(area => (
                <li key={area}>
                  <Link to="/service-areas" className="text-navy-200 hover:text-pnf-red-400 transition-colors text-sm">
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-navy-700 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="text-pnf-red-400 mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-semibold">Call Anytime</p>
                  <a href={`tel:${PHONE_NUMBER_RAW}`} className="text-navy-200 hover:text-pnf-red-400 transition-colors">
                    {PHONE_NUMBER}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-pnf-red-400 mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-semibold">Email Us</p>
                  <a href={`mailto:${EMAIL}`} className="text-navy-200 hover:text-pnf-red-400 transition-colors">
                    {EMAIL}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-pnf-red-400 mt-1 shrink-0" size={20} />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-navy-200">San Antonio, TX & Surrounding Areas</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-navy-300">
          <p>© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
