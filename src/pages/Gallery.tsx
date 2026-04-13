import React, { useState } from 'react';
import { X, Phone } from 'lucide-react';
import { PHONE_NUMBER, PHONE_NUMBER_RAW } from '../constants';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%284%29-RvHGOWWeQJaPYX7Q2X9brTxLWMrd3n.webp",
      alt: "Rheem Professional water heater installation",
      category: "Water Heaters"
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%281%29-IuygaLd5EPfrCEPoqTS9z6mkARM4ST.webp",
      alt: "Plumbing installation work",
      category: "Plumbing"
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp",
      alt: "Pressure gauge testing",
      category: "Service"
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%283%29-eVGKCjJfKNFf225V5TmycvQFh6jkWZ.webp",
      alt: "Modern kitchen sink and faucet",
      category: "Water Softeners"
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24-qXgwh1FXgUHroZUDBcq8eqniRQe4rI.webp",
      alt: "PNF Water Heaters & Softeners service truck",
      category: "Our Team"
    }
  ];

  return (
    <div className="pt-24">
      <section className="bg-navy-900 py-20 text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Work Gallery</h1>
          <p className="text-xl text-navy-200 max-w-2xl mx-auto">
            See examples of our professional water heater, water softener, and filtration installations throughout San Antonio.
          </p>
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
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all"
                onClick={() => setSelectedImage(image.src)}
              >
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-pnf-red-400 text-sm font-bold uppercase tracking-wider">{image.category}</span>
                    <p className="text-white font-semibold mt-1">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-4">
              Want to see more of our work? Follow us on social media or contact us for references.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy-800 mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Let us bring this same quality workmanship to your home. Call us today for a free estimate.
          </p>
          <a 
            href={`tel:${PHONE_NUMBER_RAW}`} 
            className="inline-flex items-center gap-3 bg-pnf-red-600 hover:bg-pnf-red-700 text-white px-8 py-4 rounded-xl text-xl font-bold transition-all"
          >
            <Phone size={24} />
            Get My FREE Quote Now
          </a>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-pnf-red-400 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img 
            src={selectedImage}
            alt="Gallery image enlarged"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            referrerPolicy="no-referrer"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;
