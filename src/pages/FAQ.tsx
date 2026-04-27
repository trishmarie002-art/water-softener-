import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Phone } from 'lucide-react';
import { PHONE_NUMBER_RAW } from '../constants';
import { cn } from '../lib/utils';
import { useContent } from '../context/ContentContext';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { faqItems } = useContent();

  // Group FAQ items by category
  const faqs = useMemo(() => {
    const grouped: Record<string, { q: string; a: string }[]> = {};
    faqItems.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push({ q: item.question, a: item.answer });
    });
    return Object.entries(grouped).map(([category, questions]) => ({
      category,
      questions
    }));
  }, [faqItems]);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let questionIndex = 0;

  return (
    <div className="pt-24">
      <section className="bg-navy-900 py-20 text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-navy-200 max-w-2xl mx-auto"
          >
            Get answers to common questions about water softeners, water heaters, and filtration systems.
          </motion.p>
        </div>
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%284%29-RvHGOWWeQJaPYX7Q2X9brTxLWMrd3n.webp" 
            alt="Water heater installation" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqs.map((category, catIndex) => (
            <motion.div 
              key={catIndex} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-navy-800 mb-6 pb-2 border-b-2 border-pnf-red-600">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const currentIndex = questionIndex++;
                  return (
                    <motion.div 
                      key={faqIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: faqIndex * 0.1 }}
                      className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(currentIndex)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-semibold text-navy-800">{faq.q}</span>
                        <ChevronDown 
                          className={cn(
                            "shrink-0 text-pnf-red-600 transition-transform",
                            openIndex === currentIndex && "rotate-180"
                          )} 
                          size={24} 
                        />
                      </button>
                      <div 
                        className={cn(
                          "overflow-hidden transition-all duration-300",
                          openIndex === currentIndex ? "max-h-96" : "max-h-0"
                        )}
                      >
                        <p className="px-6 pb-5 text-gray-600 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-navy-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy-800 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Our friendly team is here to help. Give us a call and we'll answer any questions you have about your water system needs.
          </p>
          <a 
            href={`tel:${PHONE_NUMBER_RAW}`} 
            className="inline-flex items-center gap-2 bg-pnf-red-600 hover:bg-pnf-red-700 text-white px-5 py-3 rounded-lg text-sm font-bold transition-all"
          >
            <Phone size={16} />
            Call Us Today
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
