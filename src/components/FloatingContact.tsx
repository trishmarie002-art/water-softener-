import React, { useState } from 'react';
import { MessageCircle, Phone, X, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PHONE_NUMBER, PHONE_NUMBER_RAW } from '../constants';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const smsMessage = encodeURIComponent("Hi, Do you give FREE quotes?");
  const smsLink = `sms:${PHONE_NUMBER_RAW}?body=${smsMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 flex flex-col gap-3 items-end"
          >
            {/* Call Button */}
            <a
              href={`tel:${PHONE_NUMBER_RAW}`}
              className="flex items-center gap-3 bg-white shadow-lg rounded-full pl-4 pr-2 py-2 hover:shadow-xl transition-all group"
            >
              <span className="text-navy-800 font-semibold whitespace-nowrap">
                Call {PHONE_NUMBER}
              </span>
              <div className="bg-green-500 text-white p-3 rounded-full group-hover:bg-green-600 transition-colors">
                <Phone size={20} />
              </div>
            </a>

            {/* SMS Button */}
            <a
              href={smsLink}
              className="flex items-center gap-3 bg-white shadow-lg rounded-full pl-4 pr-2 py-2 hover:shadow-xl transition-all group"
            >
              <span className="text-navy-800 font-semibold whitespace-nowrap">
                Send SMS
              </span>
              <div className="bg-pnf-red-600 text-white p-3 rounded-full group-hover:bg-pnf-red-700 transition-colors">
                <MessageSquare size={20} />
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-2xl transition-all ${
          isOpen 
            ? 'bg-navy-800 text-white' 
            : 'bg-pnf-red-600 text-white animate-bounce hover:animate-none'
        }`}
        whileTap={{ scale: 0.9 }}
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
