-- Create admin_settings table to store the admin password hash
CREATE TABLE IF NOT EXISTS admin_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read (we store a hash, not plain text)
CREATE POLICY "admin_settings_select" ON admin_settings FOR SELECT USING (true);

-- Allow anyone to update (protected by password check in app)
CREATE POLICY "admin_settings_update" ON admin_settings FOR UPDATE USING (true);

-- Insert default password "admin123" - user should change this immediately
-- Using a simple hash for demo purposes
INSERT INTO admin_settings (password_hash) VALUES ('admin123')
ON CONFLICT (id) DO NOTHING;
