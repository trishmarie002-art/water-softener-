import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { PHONE_NUMBER_RAW } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans selection:bg-pnf-red-100 selection:text-pnf-red-900">
      <Header />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Floating Mobile Call Button */}
      <a
        href={`tel:${PHONE_NUMBER_RAW}`}
        className="fixed bottom-6 right-6 z-40 md:hidden bg-pnf-red-600 text-white p-4 rounded-full shadow-2xl animate-bounce hover:animate-none transition-all active:scale-90"
      >
        <Phone size={28} />
      </a>
    </div>
  );
};

export default Layout;
