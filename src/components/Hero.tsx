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
    <section className="relative w-full overflow-hidden bg-navy-950 py-10 md:py-20 px-4 md:px-8">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 z-0" />

      {/* Main Container - Mobile: stacked, Desktop: side-by-side */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
        
        {/* Left Column - Text Content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:w-1/2">
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
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6"
          >
            Hard Water Is <span className="text-pnf-red-400">Destroying</span> Your San Antonio Home Right Now
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-base md:text-lg lg:text-xl text-blue-50 mb-6 md:mb-8 max-w-xl leading-relaxed"
          >
            <strong>San Antonio has some of the HARDEST water in Texas.</strong> Every day without a water softener costs you money in damaged appliances, higher energy bills, and plumbing repairs. Get your FREE water test today.
          </motion.p>

          {/* CTAs - Stack on mobile, row on larger screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 md:mb-10 max-w-md lg:max-w-none"
          >
            <a
              href={`tel:${PHONE_NUMBER_RAW}`}
              className="flex items-center justify-center gap-2 bg-pnf-red-600 hover:bg-pnf-red-700 text-white px-6 py-4 rounded-xl text-base md:text-lg font-black transition-all transform hover:scale-105 shadow-lg shadow-pnf-red-600/30 animate-pulse hover:animate-none"
            >
              <Phone size={20} />
              <span>CALL NOW - FREE Quote</span>
            </a>
            <a
              href={`sms:${PHONE_NUMBER_RAW}?body=${encodeURIComponent("Hi! I need help with my hard water problem in San Antonio.")}`}
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-navy-900 px-6 py-4 rounded-xl text-base md:text-lg font-bold transition-all transform hover:scale-105"
            >
              <MessageSquare size={18} />
              <span>Text Us - Fast Response</span>
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-md lg:max-w-none"
          >
            <div className="flex items-center justify-center lg:justify-start gap-2 text-white">
              <Clock className="text-pnf-red-400 shrink-0" size={18} />
              <span className="text-xs md:text-sm font-medium">Same-Day Service</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-white">
              <MapPin className="text-pnf-red-400 shrink-0" size={18} />
              <span className="text-xs md:text-sm font-medium">100% Local San Antonio</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-white">
              <ShieldCheck className="text-pnf-red-400 shrink-0" size={18} />
              <span className="text-xs md:text-sm font-medium">28+ Years Experience</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-white">
              <Droplets className="text-pnf-red-400 shrink-0" size={18} />
              <span className="text-xs md:text-sm font-medium">FREE Water Testing</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Image Slideshow */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="relative w-full max-h-[300px] lg:max-h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt="PNF Water Heaters & Softeners"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full h-full max-h-[300px] lg:max-h-[600px] object-contain"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/50 hidden lg:block"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
