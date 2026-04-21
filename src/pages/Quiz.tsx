import React from 'react';
import { motion } from 'motion/react';
import { Droplets, Clock, Award, ShieldCheck } from 'lucide-react';
import WaterQuiz from '../components/WaterQuiz';

const Quiz = () => {
  return (
    <div className="bg-gradient-to-b from-navy-50 to-white min-h-screen pt-24">
      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-pnf-red-100 text-pnf-red-700 px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
              <Droplets className="w-4 h-4" />
              San Antonio Hard Water Risk Assessment
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6 text-balance">
              Is San Antonio&apos;s Hard Water Destroying Your Home Right Now?
            </h1>
            <p className="text-lg md:text-xl text-navy-600 max-w-2xl mx-auto mb-4 text-pretty">
              <strong>San Antonio has some of the HARDEST water in Texas</strong> - averaging 15-20 grains of hardness. 
              Take this 60-second quiz to find out if your home is at risk.
            </p>
            <p className="text-pnf-red-600 font-bold text-lg mb-8">
              Answer honestly - your home&apos;s health depends on it.
            </p>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-12"
          >
            <div className="flex items-center gap-2 text-navy-600">
              <Clock className="w-5 h-5 text-pnf-red-500" />
              <span className="text-sm font-medium">Takes 2 minutes</span>
            </div>
            <div className="flex items-center gap-2 text-navy-600">
              <Award className="w-5 h-5 text-pnf-red-500" />
              <span className="text-sm font-medium">No obligation</span>
            </div>
            <div className="flex items-center gap-2 text-navy-600">
              <ShieldCheck className="w-5 h-5 text-pnf-red-500" />
              <span className="text-sm font-medium">No obligation</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <WaterQuiz />
        </motion.div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-4 bg-navy-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
            The Hidden Cost of San Antonio&apos;s Hard Water
          </h2>
          <p className="text-navy-300 text-center mb-12 max-w-2xl mx-auto">Every day without a water softener costs you money. Here&apos;s what hard water is doing to your home right now:</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-pnf-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pnf-red-400">15-20</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Grains of Hardness</h3>
              <p className="text-navy-300 text-sm">
                San Antonio water hardness - that&apos;s 3x the recommended level for safe water.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-pnf-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pnf-red-400">$800+</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Yearly Cost to You</h3>
              <p className="text-navy-300 text-sm">
                Extra soap, damaged appliances, higher energy bills, and plumbing repairs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-pnf-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pnf-red-400">50%</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Shorter Appliance Life</h3>
              <p className="text-navy-300 text-sm">
                Water heaters, dishwashers, and washing machines fail years earlier due to scale.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quiz;
