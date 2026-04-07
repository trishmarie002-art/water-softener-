import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingContact from './FloatingContact';
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

      {/* Floating Contact Button */}
      <FloatingContact />
    </div>
  );
};

export default Layout;
