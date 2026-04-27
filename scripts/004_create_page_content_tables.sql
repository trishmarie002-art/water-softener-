-- Create page_content table to store all page-specific content
CREATE TABLE IF NOT EXISTS page_content (
  id TEXT PRIMARY KEY,
  page_name TEXT NOT NULL,
  section_name TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read page_content" ON page_content FOR SELECT USING (true);

-- Allow public write (admin panel handles auth)
CREATE POLICY "Allow public write page_content" ON page_content FOR ALL USING (true);

-- Seed default Home page content
INSERT INTO page_content (id, page_name, section_name, content) VALUES
('home_intro', 'home', 'intro', '{
  "badge": "Stop Hard Water Damage Today",
  "headline": "San Antonio''s Hard Water Is Costing You $800+ Per Year",
  "description": "Here''s the truth: San Antonio water averages 15-20 grains of hardness - that''s 3x the recommended level. Every day without a water softener, you''re paying more for:",
  "bullets": [
    "Appliances that break down 30% faster",
    "Energy bills up to 25% higher from scale buildup",
    "Plumbing repairs from clogged pipes",
    "Extra soap, shampoo, and cleaning products"
  ],
  "features": ["Licensed & Insured", "Same-Day Service Available", "On-Site Consultations"],
  "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%281%29-IuygaLd5EPfrCEPoqTS9z6mkARM4ST.webp"
}'::jsonb),
('home_owner', 'home', 'owner', '{
  "badge": "Meet the Owner",
  "name": "Jacinto Lefebre",
  "title": "Master Plumber",
  "bio1": "With 28+ years of hands-on plumbing experience and over a decade as a certified master plumber, Jacinto Lefebre brings unmatched expertise to every job. His commitment to quality workmanship and honest service has made PNF Water Heaters & Softeners the trusted choice for San Antonio homeowners.",
  "bio2": "When you work with PNF, you''re not just getting a service provider—you''re getting a dedicated professional who treats your home like his own.",
  "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000004496.jpg-zk2JdT3h7UvxFobdVosOceSAKvdEqf.jpeg"
}'::jsonb),
('home_services', 'home', 'services', '{
  "badge": "Water Softener Installation San Antonio TX",
  "headline": "Protect Your Home. Protect Your Family. Save Money.",
  "description": "We install premium water softeners, tankless water heaters, and whole-home filtration systems. Same-day installation available."
}'::jsonb),
('home_why_us', 'home', 'why_us', '{
  "badge": "Why San Antonio Homeowners Choose Us",
  "headline": "Over 500+ San Antonio Families Trust Us With Their Water",
  "items": [
    {"title": "Licensed & Certified", "description": "Our technicians are fully licensed and undergo regular training to stay ahead of industry standards."},
    {"title": "Punctual & Professional", "description": "We respect your time. We arrive on schedule and treat your home with the utmost care and cleanliness."},
    {"title": "Premium Equipment", "description": "We only install top-tier, high-efficiency systems from brands we trust and stand behind."}
  ]
}'::jsonb),
('home_testimonials', 'home', 'testimonials', '{
  "badge": "Real San Antonio Homeowners",
  "headline": "See Why Your Neighbors Chose Us",
  "description": "Don''t take our word for it - hear from San Antonio families who solved their hard water problems.",
  "items": [
    {"name": "Sarah J.", "location": "Stone Oak", "text": "The water softener installation was quick and professional. No more hard water spots on my dishes!"},
    {"name": "Michael R.", "location": "Alamo Heights", "text": "Switched to a tankless water heater and couldn''t be happier. Endless hot water and lower bills."},
    {"name": "David L.", "location": "Helotes", "text": "Great service from start to finish. They explained everything clearly and the price was fair."}
  ]
}'::jsonb),
('home_cta', 'home', 'cta', '{
  "headline": "Stop Paying for Hard Water Damage",
  "description": "Every day you wait costs you money. Call us today and see exactly what''s in your San Antonio water.",
  "urgency": "Call now - Same day appointments available!",
  "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp"
}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Seed default About page content
INSERT INTO page_content (id, page_name, section_name, content) VALUES
('about_hero', 'about', 'hero', '{
  "headline": "About PNF Water Heaters & Softeners",
  "description": "Family-owned water softener experts serving San Antonio for 28+ years. We''ve helped over 500 local families solve their hard water problems.",
  "background_image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24-qXgwh1FXgUHroZUDBcq8eqniRQe4rI.webp"
}'::jsonb),
('about_owner', 'about', 'owner', '{
  "badge": "Meet the Owner",
  "name": "Jacinto Lefebre, Master Plumber",
  "years_experience": "28+",
  "bio1": "With over 28 years of hands-on plumbing experience and more than a decade as a certified master plumber, Jacinto Lefebre has built PNF Water Heaters & Softeners into San Antonio''s premier water system service provider.",
  "bio2": "Jacinto understands the unique challenges of San Antonio''s hard water. His dedication to quality craftsmanship and honest service has built a reputation that speaks for itself. We don''t just install systems; we build lasting relationships based on trust and exceptional service.",
  "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000004496.jpg-zk2JdT3h7UvxFobdVosOceSAKvdEqf.jpeg",
  "features": ["Locally Owned", "Family Operated", "Expert Technicians", "Quality Guaranteed"]
}'::jsonb),
('about_values', 'about', 'values', '{
  "badge": "Our Values",
  "headline": "The Principles That Drive Us",
  "items": [
    {"title": "Unmatched Integrity", "description": "We believe in honest pricing and transparent communication. No hidden fees, no unnecessary upsells—just what your home needs."},
    {"title": "Customer First", "description": "Your satisfaction is our top priority. We go above and beyond to ensure every customer is happy with their new water system."},
    {"title": "Local Commitment", "description": "We''re proud to be a part of the San Antonio community. We support local initiatives and strive to make our city a better place."}
  ]
}'::jsonb),
('about_cta', 'about', 'cta', '{
  "headline": "Your San Antonio Neighbors Trust Us - You Can Too",
  "description": "Stop letting hard water damage your home. Call us today and see exactly what''s in your water.",
  "urgency": "No cost, no obligation - Same day appointments available!",
  "background_image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24%20%282%29-XSqDPqrNjs3jJof5tMG0gyMnleXSJm.webp"
}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Seed default Contact page content
INSERT INTO page_content (id, page_name, section_name, content) VALUES
('contact_hero', 'contact', 'hero', '{
  "headline": "Contact Us Today",
  "description": "Stop letting San Antonio''s hard water damage your home. Call now for a same-day appointment.",
  "background_image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24-qXgwh1FXgUHroZUDBcq8eqniRQe4rI.webp"
}'::jsonb),
('contact_info', 'contact', 'info', '{
  "headline": "Get In Touch",
  "description": "Whether you have a question about water softeners, need an emergency water heater replacement, or want to schedule a water test, our team is ready to assist you.",
  "phone": "(210) 769-5161",
  "phone_raw": "2107695161",
  "email": "pnfwaterheatersandsofteners@gmail.com",
  "hours_weekday": "Mon - Fri: 8:00 AM - 6:00 PM",
  "hours_saturday": "Sat: 9:00 AM - 3:00 PM",
  "emergency": "24/7 Emergency Service Available",
  "service_area": "San Antonio, TX & Surrounding Areas"
}'::jsonb),
('contact_form', 'contact', 'form', '{
  "title": "Schedule Your Water Test",
  "subtitle": "Find out exactly what''s in your San Antonio water. We''ll show you the results on the spot."
}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Seed default Service Areas content
INSERT INTO page_content (id, page_name, section_name, content) VALUES
('service_areas_hero', 'service_areas', 'hero', '{
  "headline": "Water Softener Installation Near You",
  "description": "Serving San Antonio, Boerne, New Braunfels, Helotes, Stone Oak, and all surrounding areas. Same-day service available.",
  "background_image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2026-03-24-qXgwh1FXgUHroZUDBcq8eqniRQe4rI.webp"
}'::jsonb),
('service_areas_main', 'service_areas', 'main', '{
  "headline": "San Antonio Water Softener Installation",
  "description": "San Antonio has some of the hardest water in Texas - averaging 15-20 grains of hardness. That means every home in our service area is at risk for:",
  "risks": [
    "Scale buildup destroying appliances",
    "Clogged pipes and reduced water pressure",
    "Dry skin, dull hair, and spotted dishes",
    "Higher energy bills from inefficient water heaters"
  ],
  "areas": ["San Antonio", "New Braunfels", "Schertz", "Cibolo", "Converse", "Universal City", "Boerne", "Helotes", "Seguin"],
  "not_listed_title": "Don''t see your city?",
  "not_listed_description": "We often travel outside our standard service area for larger installations. Give us a call to see if we can help you!"
}'::jsonb),
('service_areas_seo', 'service_areas', 'seo_blurbs', '{
  "headline": "Why San Antonio Homeowners Choose Us",
  "description": "We understand the unique water challenges in every neighborhood we serve.",
  "items": [
    {"title": "Water Softener San Antonio", "description": "From Stone Oak to Southtown, we know San Antonio water. Our systems are specifically calibrated for the extreme hardness levels (15-20 grains) found in the Edwards Aquifer region.", "highlight": "Call us for water testing"},
    {"title": "Water Softener New Braunfels & Schertz", "description": "Fast response times for our neighbors to the northeast. We provide same-day water softener and water heater installation for homes in New Braunfels, Schertz, and Cibolo.", "highlight": "Same-day installation available"},
    {"title": "Water Softener Boerne & Helotes", "description": "Serving the Texas Hill Country with premium water softeners and filtration systems. We understand the unique well water challenges in these areas and have solutions for every home.", "highlight": "Well water specialists"}
  ]
}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Seed default quiz page content
INSERT INTO page_content (id, page_name, section_name, content) VALUES
('quiz_config', 'quiz', 'config', '{
  "title": "Is San Antonio''s Hard Water Damaging YOUR Home?",
  "description": "Answer these quick questions to find out your hard water risk level.",
  "cta_text": "Get Your Results",
  "results_high": "HIGH RISK: Your home is likely experiencing significant hard water damage right now.",
  "results_medium": "MEDIUM RISK: You''re seeing early signs of hard water problems.",
  "results_low": "LOW RISK: You may have some protection, but San Antonio water is still harder than recommended."
}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Store site-wide settings
INSERT INTO page_content (id, page_name, section_name, content) VALUES
('site_settings', 'global', 'settings', '{
  "company_name": "PNF Water Heaters & Softeners",
  "phone": "(210) 769-5161",
  "phone_raw": "2107695161",
  "email": "pnfwaterheatersandsofteners@gmail.com",
  "logo_url": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1000004386.jpg-QH60MYNMQSUbQELnvoiIdLPz4IRnw0.jpeg"
}'::jsonb)
ON CONFLICT (id) DO NOTHING;
