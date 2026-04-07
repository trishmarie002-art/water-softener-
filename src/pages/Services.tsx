import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Thermometer, Filter, CheckCircle2, ArrowRight, Phone } from 'lucide-react';
import { PHONE_NUMBER, PHONE_NUMBER_RAW } from '../constants';

const Services = () => {
  const services = [
    {
      id: 'water-softeners',
      title: 'Water Softeners',
      icon: Droplets,
      description: 'Say goodbye to hard water problems. Our water softener systems remove calcium and magnesium, protecting your appliances and giving you softer skin and hair.',
      features: [
        'Removes hard water minerals',
        'Extends appliance lifespan',
        'Softer skin and hair',
        'Eliminates water spots',
        'Reduces soap usage'
      ],
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%283%29-eVGKCjJfKNFf225V5TmycvQFh6jkWZ.webp'
    },
    {
      id: 'water-heaters',
      title: 'Water Heaters',
      icon: Thermometer,
      description: 'From traditional tank heaters to modern tankless systems, we install and service all types of water heaters. Enjoy reliable hot water whenever you need it.',
      features: [
        'Tank & tankless options',
        'Energy-efficient models',
        'Same-day installation',
        'Emergency repairs',
        'Extended warranties'
      ],
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%284%29-RvHGOWWeQJaPYX7Q2X9brTxLWMrd3n.webp'
    },
    {
      id: 'water-filtration',
      title: 'Water Filtration',
      icon: Filter,
      description: 'Get clean, pure water from every tap in your home. Our whole-home filtration systems remove contaminants, chlorine, and sediment for healthier water.',
      features: [
        'Whole-home systems',
        'Reverse osmosis options',
        'Removes chlorine & sediment',
        'Better tasting water',
        'Healthier for your family'
      ],
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp'
    }
  ];

  return (
    <div className="pt-24">
      <section className="bg-navy-900 py-20 text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-navy-200 max-w-2xl mx-auto">
            Professional water softener, water heater, and filtration services for San Antonio homes. Quality installations backed by expert service.
          </p>
        </div>
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%281%29-IuygaLd5EPfrCEPoqTS9z6mkARM4ST.webp" 
            alt="Plumbing installation" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
              >
                <div className="lg:w-1/2">
                  <div className="relative">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-pnf-red-600 text-white p-4 rounded-xl shadow-lg">
                      <service.icon size={32} />
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">{service.title}</h2>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="text-pnf-red-600 shrink-0" size={20} />
                        <span className="text-navy-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 bg-pnf-red-600 hover:bg-pnf-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all hover:gap-3"
                  >
                    Learn More
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-black text-pnf-red-400 mb-2">500+</p>
              <p className="text-navy-200">Installations Completed</p>
            </div>
            <div>
              <p className="text-5xl font-black text-pnf-red-400 mb-2">28+</p>
              <p className="text-navy-200">Years Experience</p>
            </div>
            <div>
              <p className="text-5xl font-black text-pnf-red-400 mb-2">4.9</p>
              <p className="text-navy-200">Star Rating</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp" 
            alt="Pressure gauge plumbing work" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-navy-900/70 backdrop-blur-[1px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-navy-200 mb-10 max-w-2xl mx-auto">
            Contact us today for a free estimate on any of our services. Our friendly team is ready to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href={`tel:${PHONE_NUMBER_RAW}`} 
              className="inline-flex items-center justify-center gap-3 bg-white text-pnf-red-600 px-10 py-5 rounded-2xl text-2xl font-black hover:bg-gray-100 transition-all shadow-2xl"
            >
              <Phone size={28} />
              {PHONE_NUMBER}
            </a>
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-navy-800 hover:bg-navy-700 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all"
            >
              Request a Quote
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
