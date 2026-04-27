import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

// Types matching database schema
interface SiteContentRow {
  id: string;
  section: string;
  content: Record<string, unknown>;
}

interface PageContentRow {
  id: string;
  page: string;
  section: string;
  content: Record<string, unknown>;
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  sort_order: number;
}

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  sort_order: number;
}

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  sort_order: number;
}

interface Review {
  id: string;
  name: string;
  location: string;
  date: string;
  text: string;
  service: string;
  rating: number;
  sort_order: number;
}

interface ContentContextType {
  siteContent: Record<string, Record<string, unknown>>;
  pageContent: Record<string, Record<string, unknown>>;
  galleryImages: GalleryImage[];
  services: Service[];
  faqItems: FAQItem[];
  reviews: Review[];
  isLoading: boolean;
  refreshContent: () => Promise<void>;
}

// Default content (fallback if database is empty or unavailable)
const defaultSiteContent: Record<string, Record<string, unknown>> = {
  hero: {
    badge: "San Antonio's Trusted Water Experts",
    headline: "Hard Water Is <span class=\"text-pnf-red-400\">Destroying</span> Your San Antonio Home Right Now",
    subheadline: "<strong>San Antonio has some of the HARDEST water in Texas.</strong> Every day without a water softener costs you money in damaged appliances, higher energy bills, and plumbing repairs. Call us today.",
    features: ["Same-Day Service", "100% Local San Antonio", "28+ Years Experience", "Water Testing Available"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%284%29-RvHGOWWeQJaPYX7Q2X9brTxLWMrd3n.webp",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%281%29-IuygaLd5EPfrCEPoqTS9z6mkARM4ST.webp",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp"
    ]
  },
  contact_info: {
    phone: "(210) 769-5161",
    phoneRaw: "2107695161",
    email: "pnfwaterheatersandsofteners@gmail.com",
    businessHours: {
      weekday: "Mon - Fri: 8:00 AM - 6:00 PM",
      saturday: "Sat: 9:00 AM - 3:00 PM",
      emergency: "24/7 Emergency Service Available"
    },
    serviceArea: "San Antonio, TX & Surrounding Areas"
  }
};

const defaultGalleryImages: GalleryImage[] = [
  { id: '1', src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%284%29-RvHGOWWeQJaPYX7Q2X9brTxLWMrd3n.webp", alt: "Rheem Professional water heater installation", category: "Water Heaters", sort_order: 1 },
  { id: '2', src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%281%29-IuygaLd5EPfrCEPoqTS9z6mkARM4ST.webp", alt: "Plumbing installation work", category: "Plumbing", sort_order: 2 },
  { id: '3', src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp", alt: "Pressure gauge testing", category: "Service", sort_order: 3 },
  { id: '4', src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%283%29-eVGKCjJfKNFf225V5TmycvQFh6jkWZ.webp", alt: "Modern kitchen sink and faucet", category: "Water Softeners", sort_order: 4 },
  { id: '5', src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24-qXgwh1FXgUHroZUDBcq8eqniRQe4rI.webp", alt: "PNF Water Heaters & Softeners service truck", category: "Our Team", sort_order: 5 }
];

const defaultServices: Service[] = [
  {
    id: 'water-softeners',
    title: 'Water Softener Installation San Antonio',
    description: 'San Antonio has some of the HARDEST water in Texas (15-20 grains). Without a water softener, hard water destroys your appliances, clogs your pipes, and costs you hundreds in extra soap and energy bills every year.',
    features: ['Stops scale buildup that destroys appliances', 'Extends water heater life by 5+ years', 'Softer skin, shinier hair, cleaner dishes', 'Save up to $800/year on soap & energy', 'Water hardness testing available'],
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%283%29-eVGKCjJfKNFf225V5TmycvQFh6jkWZ.webp',
    sort_order: 1
  },
  {
    id: 'water-heaters',
    title: 'Tankless Water Heater Installation San Antonio',
    description: 'Tired of running out of hot water? Tankless water heaters provide UNLIMITED hot water on demand while cutting your energy bills by up to 30%. We offer same-day installation.',
    features: ['Unlimited hot water - never run out again', 'Save up to 30% on energy bills', 'Lasts 20+ years (vs 10 for tank heaters)', 'Same-day installation available', 'Same-day service available'],
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%284%29-RvHGOWWeQJaPYX7Q2X9brTxLWMrd3n.webp',
    sort_order: 2
  },
  {
    id: 'water-filtration',
    title: 'Whole Home Water Filtration San Antonio',
    description: 'San Antonio tap water contains chlorine, sediment, and contaminants you can taste and smell. Our whole-home filtration systems give you pure, clean water from EVERY tap - for drinking, cooking, and bathing.',
    features: ['Removes chlorine, sediment & contaminants', 'Better tasting water from every faucet', 'Protects your family from harmful chemicals', 'No more buying bottled water', 'Professional installation included'],
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp',
    sort_order: 3
  }
];

const defaultFAQItems: FAQItem[] = [
  { id: '1', category: 'Water Softeners', question: 'What is a water softener and why do I need one?', answer: 'A water softener removes calcium, magnesium, and other minerals from your water through a process called ion exchange. San Antonio has some of the hardest water in Texas, which can cause scale buildup in pipes, damage appliances, leave spots on dishes, and make skin and hair feel dry. A water softener protects your home and improves water quality.', sort_order: 1 },
  { id: '2', category: 'Water Softeners', question: 'How often does a water softener need maintenance?', answer: "Water softeners require minimal maintenance. You'll need to add salt to the brine tank every 1-2 months depending on your water usage. We recommend an annual inspection to ensure everything is working properly and to clean the resin tank if needed.", sort_order: 2 },
  { id: '3', category: 'Water Heaters', question: 'Should I get a tank or tankless water heater?', answer: 'It depends on your needs. Tank water heaters have lower upfront costs and work well for most homes. Tankless water heaters cost more initially but provide endless hot water, last longer (20+ years vs 10-12 years), and save on energy bills. We can assess your home and usage to recommend the best option.', sort_order: 3 },
  { id: '4', category: 'Service & Pricing', question: 'What areas do you serve?', answer: "We serve San Antonio and all surrounding communities including Boerne, New Braunfels, Helotes, Stone Oak, Alamo Heights, Schertz, Cibolo, Universal City, Converse, and more. If you're unsure if we service your area, give us a call!", sort_order: 4 }
];

const defaultReviews: Review[] = [
  { id: '1', name: "Sarah Jenkins", location: "Stone Oak", date: "2 weeks ago", text: "The water softener installation was quick and professional. No more hard water spots on my dishes! The technician was very polite and explained everything clearly.", service: "Water Softener Installation", rating: 5, sort_order: 1 },
  { id: '2', name: "Michael Rodriguez", location: "Alamo Heights", date: "1 month ago", text: "Switched to a tankless water heater and couldn't be happier. Endless hot water and lower bills. These guys are the real deal.", service: "Tankless Water Heater", rating: 5, sort_order: 2 },
  { id: '3', name: "David Lawson", location: "Helotes", date: "2 months ago", text: "Great service from start to finish. They explained everything clearly and the price was fair. Highly recommend for any water system needs.", service: "Water Filtration System", rating: 5, sort_order: 3 },
  { id: '4', name: "Amanda Chen", location: "New Braunfels", date: "3 months ago", text: "Our old water heater burst on a Sunday and they were out here within 2 hours to replace it. Lifesavers!", service: "Emergency Replacement", rating: 5, sort_order: 4 },
  { id: '5', name: "Robert Taylor", location: "Schertz", date: "4 months ago", text: "Professional, punctual, and clean. They treated my home with respect and the new softener works perfectly.", service: "Water Softener Service", rating: 5, sort_order: 5 },
  { id: '6', name: "Jessica Martinez", location: "Cibolo", date: "5 months ago", text: "Best plumbing experience I've had in San Antonio. Honest advice and quality work. Will definitely use them again.", service: "Whole Home Filtration", rating: 5, sort_order: 6 }
];

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [siteContent, setSiteContent] = useState<Record<string, Record<string, unknown>>>(defaultSiteContent);
  const [pageContent, setPageContent] = useState<Record<string, Record<string, unknown>>>({});
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(defaultGalleryImages);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [faqItems, setFaqItems] = useState<FAQItem[]>(defaultFAQItems);
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [isLoading, setIsLoading] = useState(true);

  const refreshContent = async () => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    try {
      const [contentRes, pageContentRes, galleryRes, servicesRes, faqRes, reviewsRes] = await Promise.all([
        supabase.from('site_content').select('*'),
        supabase.from('page_content').select('*'),
        supabase.from('gallery_images').select('*').order('sort_order'),
        supabase.from('services').select('*').order('sort_order'),
        supabase.from('faq_items').select('*').order('sort_order'),
        supabase.from('reviews').select('*').order('sort_order'),
      ]);

      if (contentRes.data && contentRes.data.length > 0) {
        const contentMap: Record<string, Record<string, unknown>> = { ...defaultSiteContent };
        contentRes.data.forEach((row: SiteContentRow) => {
          contentMap[row.id] = row.content as Record<string, unknown>;
        });
        setSiteContent(contentMap);
      }

      if (pageContentRes.data && pageContentRes.data.length > 0) {
        const pageContentMap: Record<string, Record<string, unknown>> = {};
        pageContentRes.data.forEach((row: PageContentRow) => {
          pageContentMap[row.id] = row.content as Record<string, unknown>;
        });
        setPageContent(pageContentMap);
      }

      if (galleryRes.data && galleryRes.data.length > 0) {
        setGalleryImages(galleryRes.data);
      }

      if (servicesRes.data && servicesRes.data.length > 0) {
        setServices(servicesRes.data);
      }

      if (faqRes.data && faqRes.data.length > 0) {
        setFaqItems(faqRes.data);
      }

      if (reviewsRes.data && reviewsRes.data.length > 0) {
        setReviews(reviewsRes.data);
      }
    } catch (error) {
      console.error('Error loading content:', error);
      // Keep using default content on error
    }

    setIsLoading(false);
  };

  useEffect(() => {
    refreshContent();
  }, []);

  return (
    <ContentContext.Provider value={{
      siteContent,
      pageContent,
      galleryImages,
      services,
      faqItems,
      reviews,
      isLoading,
      refreshContent,
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
