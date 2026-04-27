-- Create tables for editable site content

-- Site content table for general text content (hero, about sections, etc.)
CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  category TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]',
  image TEXT,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQ items table
CREATE TABLE IF NOT EXISTS faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  date TEXT NOT NULL,
  text TEXT NOT NULL,
  service TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Default content table (for import/reset functionality)
CREATE TABLE IF NOT EXISTS default_content (
  id TEXT PRIMARY KEY,
  table_name TEXT NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_gallery_images_sort ON gallery_images(sort_order);
CREATE INDEX IF NOT EXISTS idx_services_sort ON services(sort_order);
CREATE INDEX IF NOT EXISTS idx_faq_items_category ON faq_items(category, sort_order);
CREATE INDEX IF NOT EXISTS idx_reviews_sort ON reviews(sort_order);

-- Enable public read access (no RLS needed for public content)
-- These tables will be read by the public website
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE default_content ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Allow public read site_content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Allow public read gallery_images" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read faq_items" ON faq_items FOR SELECT USING (true);
CREATE POLICY "Allow public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Allow public read default_content" ON default_content FOR SELECT USING (true);

-- Public write policies (for admin panel - protected by password in the app)
CREATE POLICY "Allow public write site_content" ON site_content FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public write gallery_images" ON gallery_images FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public write services" ON services FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public write faq_items" ON faq_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public write reviews" ON reviews FOR ALL USING (true) WITH CHECK (true);
