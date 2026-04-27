-- Seed the database with current website content

-- Site Content (Hero, About, General sections)
INSERT INTO site_content (id, section, content) VALUES
('hero', 'hero', '{
  "badge": "San Antonio''s Trusted Water Experts",
  "headline": "Hard Water Is <span class=\"text-pnf-red-400\">Destroying</span> Your San Antonio Home Right Now",
  "subheadline": "<strong>San Antonio has some of the HARDEST water in Texas.</strong> Every day without a water softener costs you money in damaged appliances, higher energy bills, and plumbing repairs. Call us today.",
  "features": ["Same-Day Service", "100% Local San Antonio", "28+ Years Experience", "Water Testing Available"],
  "images": [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%284%29-RvHGOWWeQJaPYX7Q2X9brTxLWMrd3n.webp",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%281%29-IuygaLd5EPfrCEPoqTS9z6mkARM4ST.webp",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp"
  ]
}'::jsonb),
('about_owner', 'about', '{
  "name": "Jacinto Lefebre",
  "title": "Master Plumber",
  "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000004496.jpg-zk2JdT3h7UvxFobdVosOceSAKvdEqf.jpeg",
  "yearsExperience": "28+",
  "bio": "With over 28 years of hands-on plumbing experience and more than a decade as a certified master plumber, Jacinto Lefebre has built PNF Water Heaters & Softeners into San Antonio''s premier water system service provider.",
  "bio2": "Jacinto understands the unique challenges of San Antonio''s hard water. His dedication to quality craftsmanship and honest service has built a reputation that speaks for itself. We don''t just install systems; we build lasting relationships based on trust and exceptional service.",
  "highlights": ["Locally Owned", "Family Operated", "Expert Technicians", "Quality Guaranteed"]
}'::jsonb),
('intro_section', 'home', '{
  "subtitle": "Stop Hard Water Damage Today",
  "title": "San Antonio''s Hard Water Is Costing You $800+ Per Year",
  "intro": "<strong>Here''s the truth:</strong> San Antonio water averages 15-20 grains of hardness - that''s 3x the recommended level. Every day without a water softener, you''re paying more for:",
  "bulletPoints": [
    "Appliances that break down 30% faster",
    "Energy bills up to 25% higher from scale buildup",
    "Plumbing repairs from clogged pipes",
    "Extra soap, shampoo, and cleaning products"
  ],
  "checkmarks": ["Licensed & Insured", "Same-Day Service Available", "On-Site Consultations"],
  "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%281%29-IuygaLd5EPfrCEPoqTS9z6mkARM4ST.webp",
  "yearsExperience": "28+"
}'::jsonb),
('why_choose_us', 'home', '{
  "subtitle": "Why San Antonio Homeowners Choose Us",
  "title": "Over 500+ San Antonio Families Trust Us With Their Water",
  "features": [
    {"title": "Licensed & Certified", "description": "Our technicians are fully licensed and undergo regular training to stay ahead of industry standards."},
    {"title": "Punctual & Professional", "description": "We respect your time. We arrive on schedule and treat your home with the utmost care and cleanliness."},
    {"title": "Premium Equipment", "description": "We only install top-tier, high-efficiency systems from brands we trust and stand behind."}
  ]
}'::jsonb),
('contact_info', 'contact', '{
  "phone": "(210) 769-5161",
  "phoneRaw": "2107695161",
  "email": "pnfwaterheatersandsofteners@gmail.com",
  "businessHours": {
    "weekday": "Mon - Fri: 8:00 AM - 6:00 PM",
    "saturday": "Sat: 9:00 AM - 3:00 PM",
    "emergency": "24/7 Emergency Service Available"
  },
  "serviceArea": "San Antonio, TX & Surrounding Areas"
}'::jsonb),
('values', 'about', '{
  "subtitle": "Our Values",
  "title": "The Principles That Drive Us",
  "items": [
    {"title": "Unmatched Integrity", "description": "We believe in honest pricing and transparent communication. No hidden fees, no unnecessary upsells—just what your home needs."},
    {"title": "Customer First", "description": "Your satisfaction is our top priority. We go above and beyond to ensure every customer is happy with their new water system."},
    {"title": "Local Commitment", "description": "We''re proud to be a part of the San Antonio community. We support local initiatives and strive to make our city a better place."}
  ]
}'::jsonb)
ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content, updated_at = NOW();

-- Gallery Images
INSERT INTO gallery_images (src, alt, category, sort_order) VALUES
('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%284%29-RvHGOWWeQJaPYX7Q2X9brTxLWMrd3n.webp', 'Rheem Professional water heater installation', 'Water Heaters', 1),
('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%281%29-IuygaLd5EPfrCEPoqTS9z6mkARM4ST.webp', 'Plumbing installation work', 'Plumbing', 2),
('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp', 'Pressure gauge testing', 'Service', 3),
('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%283%29-eVGKCjJfKNFf225V5TmycvQFh6jkWZ.webp', 'Modern kitchen sink and faucet', 'Water Softeners', 4),
('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24-qXgwh1FXgUHroZUDBcq8eqniRQe4rI.webp', 'PNF Water Heaters & Softeners service truck', 'Our Team', 5);

-- Services
INSERT INTO services (id, title, description, features, image, sort_order) VALUES
('water-softeners', 'Water Softener Installation San Antonio', 'San Antonio has some of the HARDEST water in Texas (15-20 grains). Without a water softener, hard water destroys your appliances, clogs your pipes, and costs you hundreds in extra soap and energy bills every year.', 
'["Stops scale buildup that destroys appliances", "Extends water heater life by 5+ years", "Softer skin, shinier hair, cleaner dishes", "Save up to $800/year on soap & energy", "Water hardness testing available"]'::jsonb,
'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%283%29-eVGKCjJfKNFf225V5TmycvQFh6jkWZ.webp', 1),
('water-heaters', 'Tankless Water Heater Installation San Antonio', 'Tired of running out of hot water? Tankless water heaters provide UNLIMITED hot water on demand while cutting your energy bills by up to 30%. We offer same-day installation.',
'["Unlimited hot water - never run out again", "Save up to 30% on energy bills", "Lasts 20+ years (vs 10 for tank heaters)", "Same-day installation available", "Same-day service available"]'::jsonb,
'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%284%29-RvHGOWWeQJaPYX7Q2X9brTxLWMrd3n.webp', 2),
('water-filtration', 'Whole Home Water Filtration San Antonio', 'San Antonio tap water contains chlorine, sediment, and contaminants you can taste and smell. Our whole-home filtration systems give you pure, clean water from EVERY tap - for drinking, cooking, and bathing.',
'["Removes chlorine, sediment & contaminants", "Better tasting water from every faucet", "Protects your family from harmful chemicals", "No more buying bottled water", "Professional installation included"]'::jsonb,
'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp', 3)
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title, 
  description = EXCLUDED.description, 
  features = EXCLUDED.features, 
  image = EXCLUDED.image,
  updated_at = NOW();

-- FAQ Items
INSERT INTO faq_items (category, question, answer, sort_order) VALUES
('Water Softeners', 'What is a water softener and why do I need one?', 'A water softener removes calcium, magnesium, and other minerals from your water through a process called ion exchange. San Antonio has some of the hardest water in Texas, which can cause scale buildup in pipes, damage appliances, leave spots on dishes, and make skin and hair feel dry. A water softener protects your home and improves water quality.', 1),
('Water Softeners', 'How often does a water softener need maintenance?', 'Water softeners require minimal maintenance. You''ll need to add salt to the brine tank every 1-2 months depending on your water usage. We recommend an annual inspection to ensure everything is working properly and to clean the resin tank if needed.', 2),
('Water Softeners', 'How long does a water softener last?', 'A quality water softener typically lasts 15-20 years with proper maintenance. The resin beads inside may need replacing after 10-15 years. We install premium systems designed for longevity and offer maintenance plans to maximize your investment.', 3),
('Water Heaters', 'Should I get a tank or tankless water heater?', 'It depends on your needs. Tank water heaters have lower upfront costs and work well for most homes. Tankless water heaters cost more initially but provide endless hot water, last longer (20+ years vs 10-12 years), and save on energy bills. We can assess your home and usage to recommend the best option.', 4),
('Water Heaters', 'How do I know if my water heater needs replacing?', 'Signs include: age over 10 years, rusty or discolored hot water, strange noises (popping or rumbling), water pooling around the unit, inconsistent water temperature, or increasing energy bills. If you notice any of these, give us a call.', 5),
('Water Heaters', 'How long does water heater installation take?', 'A standard tank water heater replacement takes 2-4 hours. Tankless water heater installation typically takes 4-8 hours as it may require electrical upgrades or gas line modifications. We always provide a time estimate before starting work.', 6),
('Water Filtration', 'What contaminants does a whole-home filtration system remove?', 'Our whole-home filtration systems remove chlorine, sediment, rust, and organic compounds. For more comprehensive filtration, we offer reverse osmosis systems that also remove fluoride, lead, arsenic, and other contaminants. We can test your water to recommend the right solution.', 7),
('Water Filtration', 'Is filtered water really better than bottled water?', 'Yes! A whole-home filtration system provides cleaner water than most bottled water at a fraction of the cost. Plus, you''ll reduce plastic waste and have filtered water from every tap in your home, not just for drinking but also for cooking, bathing, and laundry.', 8),
('Water Filtration', 'How often do filters need to be changed?', 'Most whole-home filters need replacing every 6-12 months depending on your water quality and usage. Reverse osmosis membranes last 2-3 years. We offer maintenance plans that include filter replacements so you never have to worry about it.', 9),
('Service & Pricing', 'How do I get started?', 'Simply give us a call! Our technician will assess your needs, answer your questions, and discuss the best solution for your home.', 10),
('Service & Pricing', 'What areas do you serve?', 'We serve San Antonio and all surrounding communities including Boerne, New Braunfels, Helotes, Stone Oak, Alamo Heights, Schertz, Cibolo, Universal City, Converse, and more. If you''re unsure if we service your area, give us a call!', 11),
('Service & Pricing', 'Do you offer emergency services?', 'Yes! We offer 24/7 emergency service for urgent water heater issues like leaks or no hot water. Call us anytime and we''ll dispatch a technician as quickly as possible to get your hot water restored.', 12);

-- Reviews
INSERT INTO reviews (name, location, date, text, service, rating, sort_order) VALUES
('Sarah Jenkins', 'Stone Oak', '2 weeks ago', 'The water softener installation was quick and professional. No more hard water spots on my dishes! The technician was very polite and explained everything clearly.', 'Water Softener Installation', 5, 1),
('Michael Rodriguez', 'Alamo Heights', '1 month ago', 'Switched to a tankless water heater and couldn''t be happier. Endless hot water and lower bills. These guys are the real deal.', 'Tankless Water Heater', 5, 2),
('David Lawson', 'Helotes', '2 months ago', 'Great service from start to finish. They explained everything clearly and the price was fair. Highly recommend for any water system needs.', 'Water Filtration System', 5, 3),
('Amanda Chen', 'New Braunfels', '3 months ago', 'Our old water heater burst on a Sunday and they were out here within 2 hours to replace it. Lifesavers!', 'Emergency Replacement', 5, 4),
('Robert Taylor', 'Schertz', '4 months ago', 'Professional, punctual, and clean. They treated my home with respect and the new softener works perfectly.', 'Water Softener Service', 5, 5),
('Jessica Martinez', 'Cibolo', '5 months ago', 'Best plumbing experience I''ve had in San Antonio. Honest advice and quality work. Will definitely use them again.', 'Whole Home Filtration', 5, 6);

-- Store defaults for reset functionality
INSERT INTO default_content (id, table_name, content) VALUES
('site_content_defaults', 'site_content', (SELECT jsonb_agg(row_to_json(t)) FROM site_content t)),
('gallery_defaults', 'gallery_images', (SELECT jsonb_agg(row_to_json(t)) FROM gallery_images t)),
('services_defaults', 'services', (SELECT jsonb_agg(row_to_json(t)) FROM services t)),
('faq_defaults', 'faq_items', (SELECT jsonb_agg(row_to_json(t)) FROM faq_items t)),
('reviews_defaults', 'reviews', (SELECT jsonb_agg(row_to_json(t)) FROM reviews t))
ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content;
