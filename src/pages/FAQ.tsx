import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Phone } from 'lucide-react';
import { PHONE_NUMBER, PHONE_NUMBER_RAW } from '../constants';
import { cn } from '../lib/utils';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "Water Softeners",
      questions: [
        {
          q: "What is a water softener and why do I need one?",
          a: "A water softener removes calcium, magnesium, and other minerals from your water through a process called ion exchange. San Antonio has some of the hardest water in Texas, which can cause scale buildup in pipes, damage appliances, leave spots on dishes, and make skin and hair feel dry. A water softener protects your home and improves water quality."
        },
        {
          q: "How often does a water softener need maintenance?",
          a: "Water softeners require minimal maintenance. You'll need to add salt to the brine tank every 1-2 months depending on your water usage. We recommend an annual inspection to ensure everything is working properly and to clean the resin tank if needed."
        },
        {
          q: "How long does a water softener last?",
          a: "A quality water softener typically lasts 15-20 years with proper maintenance. The resin beads inside may need replacing after 10-15 years. We install premium systems designed for longevity and offer maintenance plans to maximize your investment."
        }
      ]
    },
    {
      category: "Water Heaters",
      questions: [
        {
          q: "Should I get a tank or tankless water heater?",
          a: "It depends on your needs. Tank water heaters have lower upfront costs and work well for most homes. Tankless water heaters cost more initially but provide endless hot water, last longer (20+ years vs 10-12 years), and save on energy bills. We can assess your home and usage to recommend the best option."
        },
        {
          q: "How do I know if my water heater needs replacing?",
          a: "Signs include: age over 10 years, rusty or discolored hot water, strange noises (popping or rumbling), water pooling around the unit, inconsistent water temperature, or increasing energy bills. If you notice any of these, call us for a free inspection."
        },
        {
          q: "How long does water heater installation take?",
          a: "A standard tank water heater replacement takes 2-4 hours. Tankless water heater installation typically takes 4-8 hours as it may require electrical upgrades or gas line modifications. We always provide a time estimate before starting work."
        }
      ]
    },
    {
      category: "Water Filtration",
      questions: [
        {
          q: "What contaminants does a whole-home filtration system remove?",
          a: "Our whole-home filtration systems remove chlorine, sediment, rust, and organic compounds. For more comprehensive filtration, we offer reverse osmosis systems that also remove fluoride, lead, arsenic, and other contaminants. We can test your water to recommend the right solution."
        },
        {
          q: "Is filtered water really better than bottled water?",
          a: "Yes! A whole-home filtration system provides cleaner water than most bottled water at a fraction of the cost. Plus, you'll reduce plastic waste and have filtered water from every tap in your home, not just for drinking but also for cooking, bathing, and laundry."
        },
        {
          q: "How often do filters need to be changed?",
          a: "Most whole-home filters need replacing every 6-12 months depending on your water quality and usage. Reverse osmosis membranes last 2-3 years. We offer maintenance plans that include filter replacements so you never have to worry about it."
        }
      ]
    },
    {
      category: "Service & Pricing",
      questions: [
        {
          q: "How do I get started?",
          a: "Simply give us a call! Our technician will assess your needs, answer your questions, and discuss the best solution for your home."
        },
        {
          q: "What areas do you serve?",
          a: "We serve San Antonio and all surrounding communities including Boerne, New Braunfels, Helotes, Stone Oak, Alamo Heights, Schertz, Cibolo, Universal City, Converse, and more. If you're unsure if we service your area, give us a call!"
        },
        {
          q: "Do you offer emergency services?",
          a: "Yes! We offer 24/7 emergency service for urgent water heater issues like leaks or no hot water. Call us anytime and we'll dispatch a technician as quickly as possible to get your hot water restored."
        }
      ]
    }
  ];

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
