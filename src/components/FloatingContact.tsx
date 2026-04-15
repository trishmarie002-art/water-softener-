import React, { useState } from 'react';
import { MessageCircle, Phone, X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PHONE_NUMBER, PHONE_NUMBER_RAW } from '../constants';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const smsMessage = encodeURIComponent("Hi, Do you give FREE quotes?");
  const smsLink = `sms:${PHONE_NUMBER_RAW}?body=${smsMessage}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 sm:bottom-20 right-0 flex flex-col gap-2 sm:gap-3 items-end"
          >
            {/* Call Button */}
            <a
              href={`tel:${PHONE_NUMBER_RAW}`}
              className="flex items-center gap-2 sm:gap-3 bg-white shadow-lg rounded-full pl-3 sm:pl-4 pr-1.5 sm:pr-2 py-1.5 sm:py-2 hover:shadow-xl transition-all group touch-manipulation"
            >
              <span className="text-navy-800 font-semibold whitespace-nowrap text-sm sm:text-base">
                FREE Quote
              </span>
              <div className="bg-green-500 text-white p-2.5 sm:p-3 rounded-full group-hover:bg-green-600 transition-colors">
                <Phone size={18} className="sm:w-5 sm:h-5" />
              </div>
            </a>

            {/* SMS Button */}
            <a
              href={smsLink}
              className="flex items-center gap-2 sm:gap-3 bg-white shadow-lg rounded-full pl-3 sm:pl-4 pr-1.5 sm:pr-2 py-1.5 sm:py-2 hover:shadow-xl transition-all group touch-manipulation"
            >
              <span className="text-navy-800 font-semibold whitespace-nowrap text-sm sm:text-base">
                Text Us
              </span>
              <div className="bg-pnf-red-600 text-white p-2.5 sm:p-3 rounded-full group-hover:bg-pnf-red-700 transition-colors">
                <MessageSquare size={18} className="sm:w-5 sm:h-5" />
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3.5 sm:p-4 rounded-full shadow-2xl transition-all touch-manipulation min-w-[52px] min-h-[52px] sm:min-w-[60px] sm:min-h-[60px] flex items-center justify-center ${
          isOpen 
            ? 'bg-navy-800 text-white' 
            : 'bg-pnf-red-600 text-white'
        }`}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? 'Close contact menu' : 'Open contact menu'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingContact;
