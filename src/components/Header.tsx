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
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Water Quiz', path: '/quiz' },
    { name: 'Service Areas', path: '/service-areas' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3"
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="h-12 max-w-[140px] flex items-center">
          <img 
            src={LOGO_URL} 
            alt={COMPANY_NAME}
            className="h-auto max-h-full object-contain rounded-lg"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-3 2xl:gap-5">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => cn(
                "text-xs 2xl:text-sm font-medium transition-colors hover:text-pnf-red-600 text-navy-800 whitespace-nowrap",
                isActive && "text-pnf-red-600 border-b-2 border-pnf-red-600"
              )}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 xl:gap-4">
          <a
            href={`tel:${PHONE_NUMBER_RAW}`}
            className="hidden md:flex items-center gap-2 bg-pnf-red-600 hover:bg-pnf-red-700 text-white px-3 xl:px-4 py-2 rounded-full font-bold transition-transform hover:scale-105 text-sm xl:text-base whitespace-nowrap"
          >
            <Phone size={18} className="shrink-0" />
            <span className="hidden lg:inline">Get My FREE Quote Now</span>
            <span className="lg:hidden">Free Quote</span>
          </a>
          
          <button
            className="xl:hidden p-2 rounded-md"
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
            className="xl:hidden bg-white border-t overflow-hidden"
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
                className="flex items-center justify-center gap-2 bg-pnf-red-600 text-white py-3 rounded-lg font-semibold text-sm mt-4"
              >
                <Phone size={16} />
                <span>Get My FREE Quote Now</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
