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
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm py-1.5"
    >
      <div className="container mx-auto px-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img 
            src={LOGO_URL} 
            alt={COMPANY_NAME}
            className="h-9 w-auto rounded"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => cn(
                "text-xs font-semibold transition-colors hover:text-pnf-red-600 text-navy-800 px-2 py-1 whitespace-nowrap",
                isActive && "text-pnf-red-600 border-b-2 border-pnf-red-600"
              )}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${PHONE_NUMBER_RAW}`}
            className="hidden lg:flex items-center gap-2 bg-pnf-red-600 hover:bg-pnf-red-700 text-white px-3 py-1.5 rounded-full text-xs font-bold transition-transform hover:scale-105 whitespace-nowrap"
          >
            <Phone size={14} />
            <span className="hidden xl:inline">Get FREE Quote</span>
            <span className="xl:hidden">{PHONE_NUMBER}</span>
          </a>
          
          <button
            className="xl:hidden p-1.5 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="text-navy-800" size={22} />
            ) : (
              <Menu className="text-navy-800" size={22} />
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
                className="flex items-center justify-center gap-2 bg-pnf-red-600 text-white py-4 rounded-xl font-bold mt-4"
              >
                <Phone size={20} />
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
