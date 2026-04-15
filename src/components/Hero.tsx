import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { Phone, MessageSquare, ShieldCheck, Clock, MapPin, Star, Droplets } from 'lucide-react';
import { PHONE_NUMBER_RAW } from '../constants';

const images = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%284%29-RvHGOWWeQJaPYX7Q2X9brTxLWMrd3n.webp",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%281%29-IuygaLd5EPfrCEPoqTS9z6mkARM4ST.webp",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/70 to-transparent z-10" />
            <img
              src={images[currentIndex]}
              alt="PNF Water Heaters & Softeners"
              className="absolute inset-0 w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-4 relative z-20 pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-pnf-red-600/20 backdrop-blur-md border border-pnf-red-400/30 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-6"
          >
            <Star className="text-yellow-400 fill-yellow-400 w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider">San Antonio&apos;s Trusted Water Experts</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6"
          >
            Hard Water Is <span className="text-pnf-red-400">Destroying</span> Your San Antonio Home Right Now
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-base md:text-xl text-blue-50 mb-6 md:mb-8 max-w-2xl leading-relaxed"
          >
            <strong>San Antonio has some of the HARDEST water in Texas.</strong> Every day without a water softener costs you money in damaged appliances, higher energy bills, and plumbing repairs. Get your FREE water test today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 mb-8 md:mb-10"
          >
            <a
              href={`tel:${PHONE_NUMBER_RAW}`}
              className="flex items-center justify-center gap-3 bg-pnf-red-600 hover:bg-pnf-red-700 text-white px-8 py-5 rounded-xl text-lg md:text-xl font-black transition-all transform hover:scale-105 shadow-lg shadow-pnf-red-600/30 animate-pulse hover:animate-none"
            >
              <Phone size={24} />
              <span>CALL NOW - FREE Quote</span>
            </a>
            <a
              href={`sms:${PHONE_NUMBER_RAW}?body=${encodeURIComponent("Hi! I need help with my hard water problem in San Antonio.")}`}
              className="flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-navy-900 px-8 py-5 rounded-xl text-lg md:text-xl font-bold transition-all transform hover:scale-105"
            >
              <MessageSquare size={24} />
              <span>Text Us - Fast Response</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6"
          >
            <div className="flex items-center gap-2 text-white">
              <Clock className="text-pnf-red-400 shrink-0" size={18} />
              <span className="text-xs md:text-sm font-medium">Same-Day Service</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <MapPin className="text-pnf-red-400 shrink-0" size={18} />
              <span className="text-xs md:text-sm font-medium">100% Local San Antonio</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck className="text-pnf-red-400 shrink-0" size={18} />
              <span className="text-xs md:text-sm font-medium">28+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Droplets className="text-pnf-red-400 shrink-0" size={18} />
              <span className="text-xs md:text-sm font-medium">FREE Water Testing</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
