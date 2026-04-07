import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_NAME, PHONE_NUMBER, PHONE_NUMBER_RAW, LOGO_URL } from '../constants';
import { cn } from '../lib/utils';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Water Softeners', path: '/services/water-softeners' },
    { name: 'Water Heaters', path: '/services/water-heaters' },
    { name: 'Filtration', path: '/services/water-filtration' },
    { name: 'Service Areas', path: '/service-areas' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3"
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src={LOGO_URL} 
            alt={COMPANY_NAME}
            className="h-12 w-auto rounded-lg"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => cn(
                "text-sm font-medium transition-colors hover:text-pnf-red-600 text-navy-800",
                isActive && "text-pnf-red-600 border-b-2 border-pnf-red-600"
              )}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${PHONE_NUMBER_RAW}`}
            className="hidden md:flex items-center gap-2 bg-pnf-red-600 hover:bg-pnf-red-700 text-white px-4 py-2 rounded-full font-bold transition-transform hover:scale-105"
          >
            <Phone size={18} />
            <span>{PHONE_NUMBER}</span>
          </a>
          
          <button
            className="lg:hidden p-2 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="text-navy-800" />
            ) : (
              <Menu className="text-navy-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => cn(
                    "text-lg font-semibold py-2 border-b border-gray-100",
                    isActive ? "text-pnf-red-600" : "text-navy-800"
                  )}
                >
                  {link.name}
                </NavLink>
              ))}
              <a
                href={`tel:${PHONE_NUMBER_RAW}`}
                className="flex items-center justify-center gap-2 bg-pnf-red-600 text-white py-4 rounded-xl font-bold mt-4"
              >
                <Phone size={20} />
                <span>Call Now: {PHONE_NUMBER}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
