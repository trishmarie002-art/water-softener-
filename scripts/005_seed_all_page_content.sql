-- Seed all page content with actual website content
-- This populates the page_content table with the current live content

-- Clear existing page content to avoid duplicates
DELETE FROM page_content;

-- HOME PAGE CONTENT
INSERT INTO page_content (id, page, section, content) VALUES
('home_hero', 'home', 'hero', '{
  "badge": "San Antonio''s Trusted Water Experts",
  "title": "Hard Water Is Destroying Your San Antonio Home Right Now",
  "titleHighlight": "Destroying",
  "subtitle": "San Antonio has some of the HARDEST water in Texas. Every day without a water softener costs you money in damaged appliances, higher energy bills, and plumbing repairs. Call us today.",
  "trustBadges": ["Same-Day Service", "100% Local San Antonio", "28+ Years Experience", "Water Testing Available"],
  "backgroundImages": [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%284%29-RvHGOWWeQJaPYX7Q2X9brTxLWMrd3n.webp",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%281%29-IuygaLd5EPfrCEPoqTS9z6mkARM4ST.webp",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp"
  ]
}'),
('home_intro', 'home', 'intro', '{
  "sectionTitle": "Stop Hard Water Damage Today",
  "mainTitle": "San Antonio''s Hard Water Is Costing You $800+ Per Year",
  "description": "Here''s the truth: San Antonio water averages 15-20 grains of hardness - that''s 3x the recommended level. Every day without a water softener, you''re paying more for:",
  "bulletPoints": [
    "Appliances that break down 30% faster",
    "Energy bills up to 25% higher from scale buildup",
    "Plumbing repairs from clogged pipes",
    "Extra soap, shampoo, and cleaning products"
  ],
  "features": ["Licensed & Insured", "Same-Day Service Available", "On-Site Consultations"],
  "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%281%29-IuygaLd5EPfrCEPoqTS9z6mkARM4ST.webp",
  "yearsExperience": "28+"
}'),
('home_owner', 'home', 'owner', '{
  "sectionTitle": "Meet the Owner",
  "ownerName": "Jacinto Lefebre",
  "ownerTitle": "Master Plumber",
  "ownerImage": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000004496.jpg-zk2JdT3h7UvxFobdVosOceSAKvdEqf.jpeg",
  "bio1": "With 28+ years of hands-on plumbing experience and over a decade as a certified master plumber, Jacinto Lefebre brings unmatched expertise to every job. His commitment to quality workmanship and honest service has made PNF Water Heaters & Softeners the trusted choice for San Antonio homeowners.",
  "bio2": "When you work with PNF, you''re not just getting a service provider—you''re getting a dedicated professional who treats your home like his own."
}'),
('home_services', 'home', 'services', '{
  "sectionTitle": "Water Softener Installation San Antonio TX",
  "mainTitle": "Protect Your Home. Protect Your Family. Save Money.",
  "subtitle": "We install premium water softeners, tankless water heaters, and whole-home filtration systems. Same-day installation available."
}'),
('home_why_choose', 'home', 'whyChooseUs', '{
  "sectionTitle": "Why San Antonio Homeowners Choose Us",
  "mainTitle": "Over 500+ San Antonio Families Trust Us With Their Water",
  "features": [
    {"title": "Licensed & Certified", "description": "Our technicians are fully licensed and undergo regular training to stay ahead of industry standards."},
    {"title": "Punctual & Professional", "description": "We respect your time. We arrive on schedule and treat your home with the utmost care and cleanliness."},
    {"title": "Premium Equipment", "description": "We only install top-tier, high-efficiency systems from brands we trust and stand behind."}
  ],
  "formTitle": "Schedule Your Water Test Today",
  "formSubtitle": "Find out exactly what''s in YOUR water. We''ll test your water and show you the results."
}'),
('home_testimonials', 'home', 'testimonials', '{
  "sectionTitle": "Real San Antonio Homeowners",
  "mainTitle": "See Why Your Neighbors Chose Us",
  "subtitle": "Don''t take our word for it - hear from San Antonio families who solved their hard water problems.",
  "previewReviews": [
    {"name": "Sarah J.", "location": "Stone Oak", "text": "The water softener installation was quick and professional. No more hard water spots on my dishes!"},
    {"name": "Michael R.", "location": "Alamo Heights", "text": "Switched to a tankless water heater and couldn''t be happier. Endless hot water and lower bills."},
    {"name": "David L.", "location": "Helotes", "text": "Great service from start to finish. They explained everything clearly and the price was fair."}
  ]
}'),
('home_cta', 'home', 'cta', '{
  "title": "Stop Paying for Hard Water Damage",
  "subtitle": "Every day you wait costs you money. Call us today and see exactly what''s in your San Antonio water.",
  "urgencyText": "Call now - Same day appointments available!",
  "backgroundImage": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp"
}');

-- ABOUT PAGE CONTENT
INSERT INTO page_content (id, page, section, content) VALUES
('about_hero', 'about', 'hero', '{
  "title": "About PNF Water Heaters & Softeners",
  "subtitle": "Family-owned water softener experts serving San Antonio for 28+ years. We''ve helped over 500 local families solve their hard water problems.",
  "backgroundImage": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24-qXgwh1FXgUHroZUDBcq8eqniRQe4rI.webp"
}'),
('about_owner', 'about', 'owner', '{
  "sectionTitle": "Meet the Owner",
  "ownerName": "Jacinto Lefebre, Master Plumber",
  "ownerImage": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000004496.jpg-zk2JdT3h7UvxFobdVosOceSAKvdEqf.jpeg",
  "yearsExperience": "28+",
  "bio1": "With over 28 years of hands-on plumbing experience and more than a decade as a certified master plumber, Jacinto Lefebre has built PNF Water Heaters & Softeners into San Antonio''s premier water system service provider.",
  "bio2": "Jacinto understands the unique challenges of San Antonio''s hard water. His dedication to quality craftsmanship and honest service has built a reputation that speaks for itself. We don''t just install systems; we build lasting relationships based on trust and exceptional service.",
  "highlights": ["Locally Owned", "Family Operated", "Expert Technicians", "Quality Guaranteed"]
}'),
('about_values', 'about', 'values', '{
  "sectionTitle": "Our Values",
  "mainTitle": "The Principles That Drive Us",
  "values": [
    {"title": "Unmatched Integrity", "description": "We believe in honest pricing and transparent communication. No hidden fees, no unnecessary upsells—just what your home needs."},
    {"title": "Customer First", "description": "Your satisfaction is our top priority. We go above and beyond to ensure every customer is happy with their new water system."},
    {"title": "Local Commitment", "description": "We''re proud to be a part of the San Antonio community. We support local initiatives and strive to make our city a better place."}
  ]
}'),
('about_cta', 'about', 'cta', '{
  "title": "Your San Antonio Neighbors Trust Us - You Can Too",
  "subtitle": "Stop letting hard water damage your home. Call us today and see exactly what''s in your water.",
  "urgencyText": "No cost, no obligation - Same day appointments available!",
  "backgroundImage": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp"
}');

-- SERVICE AREAS PAGE CONTENT
INSERT INTO page_content (id, page, section, content) VALUES
('service_areas_hero', 'service_areas', 'hero', '{
  "title": "Water Softener Installation Near You",
  "subtitle": "Serving San Antonio, Boerne, New Braunfels, Helotes, Stone Oak, and all surrounding areas. Same-day service available.",
  "backgroundImage": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24-qXgwh1FXgUHroZUDBcq8eqniRQe4rI.webp"
}'),
('service_areas_main', 'service_areas', 'main', '{
  "title": "San Antonio Water Softener Installation",
  "description": "San Antonio has some of the hardest water in Texas - averaging 15-20 grains of hardness. That means every home in our service area is at risk for:",
  "riskList": [
    "Scale buildup destroying appliances",
    "Clogged pipes and reduced water pressure",
    "Dry skin, dull hair, and spotted dishes",
    "Higher energy bills from inefficient water heaters"
  ],
  "areas": ["San Antonio", "New Braunfels", "Schertz", "Cibolo", "Converse", "Universal City", "Boerne", "Helotes", "Seguin"],
  "outsideAreaTitle": "Don''t see your city?",
  "outsideAreaText": "We often travel outside our standard service area for larger installations. Give us a call to see if we can help you!"
}'),
('service_areas_local', 'service_areas', 'localSeo', '{
  "title": "Why San Antonio Homeowners Choose Us",
  "subtitle": "We understand the unique water challenges in every neighborhood we serve.",
  "blurbs": [
    {"title": "Water Softener San Antonio", "description": "From Stone Oak to Southtown, we know San Antonio water. Our systems are specifically calibrated for the extreme hardness levels (15-20 grains) found in the Edwards Aquifer region.", "highlight": "Call us for water testing"},
    {"title": "Water Softener New Braunfels & Schertz", "description": "Fast response times for our neighbors to the northeast. We provide same-day water softener and water heater installation for homes in New Braunfels, Schertz, and Cibolo.", "highlight": "Same-day installation available"},
    {"title": "Water Softener Boerne & Helotes", "description": "Serving the Texas Hill Country with premium water softeners and filtration systems. We understand the unique well water challenges in these areas and have solutions for every home.", "highlight": "Well water specialists"}
  ]
}'),
('service_areas_cta', 'service_areas', 'cta', '{
  "title": "Ready to Stop Hard Water Damage?",
  "subtitle": "Call us today and see exactly what''s in your water.",
  "buttonText": "Call Now - Same Day Service"
}');

-- CONTACT PAGE CONTENT
INSERT INTO page_content (id, page, section, content) VALUES
('contact_hero', 'contact', 'hero', '{
  "title": "Contact Us Today",
  "subtitle": "Stop letting San Antonio''s hard water damage your home. Call now for a same-day appointment.",
  "backgroundImage": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24-qXgwh1FXgUHroZUDBcq8eqniRQe4rI.webp"
}'),
('contact_info', 'contact', 'info', '{
  "title": "Get In Touch",
  "description": "Whether you have a question about water softeners, need an emergency water heater replacement, or want to schedule a water test, our team is ready to assist you.",
  "phone": "(210) 769-5161",
  "phoneNote": "Available for emergencies 24/7",
  "email": "pnfwaterheatersandsofteners@gmail.com",
  "businessHours": {
    "weekdays": "Mon - Fri: 8:00 AM - 6:00 PM",
    "saturday": "Sat: 9:00 AM - 3:00 PM",
    "emergency": "24/7 Emergency Service Available"
  },
  "serviceArea": "San Antonio, TX & Surrounding Areas",
  "formTitle": "Schedule Your Water Test",
  "formSubtitle": "Find out exactly what''s in your San Antonio water. We''ll show you the results on the spot."
}');

-- GLOBAL/SITE-WIDE CONTENT
INSERT INTO page_content (id, page, section, content) VALUES
('global_company', 'global', 'company', '{
  "name": "PNF Water Heaters & Softeners",
  "phone": "(210) 769-5161",
  "phoneRaw": "2107695161",
  "email": "pnfwaterheatersandsofteners@gmail.com",
  "logoUrl": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000004386.jpg-QH60MYNMQSUbQELnvoiIdLPz4IRnw0.jpeg"
}');

-- Copy to default_content table for reset functionality
DELETE FROM default_content WHERE content_type = 'page_content';
INSERT INTO default_content (content_type, content_key, content_data)
SELECT 'page_content', id, content FROM page_content;
