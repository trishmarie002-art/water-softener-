-- Create leads table for storing form submissions
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for public form submissions)
CREATE POLICY "Allow anonymous inserts" ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only allow authenticated users (admin) to view leads
CREATE POLICY "Allow authenticated users to view leads" ON public.leads
  FOR SELECT
  TO authenticated
  USING (true);
