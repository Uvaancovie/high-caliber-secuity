-- Initial schema setup for Supabase Quotes System
-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  company TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create guard levels table
CREATE TABLE IF NOT EXISTS public.guard_levels (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  hourly_rate_cents INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create areas table for risk multipliers
CREATE TABLE IF NOT EXISTS public.areas (
  id SERIAL PRIMARY KEY,
  city TEXT NOT NULL,
  area TEXT,
  risk_multiplier DECIMAL(3,2) DEFAULT 1.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(city, area)
);

-- Create quotes table
CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id),
  kind TEXT NOT NULL CHECK (kind IN ('personal', 'business')),
  payload JSONB NOT NULL,
  breakdown JSONB NOT NULL,
  total_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'ZAR',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired')),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create news table for landing page
CREATE TABLE IF NOT EXISTS public.news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES public.users(id),
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contacts table for landing page
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default guard levels
INSERT INTO public.guard_levels (name, description, hourly_rate_cents) VALUES
  ('Basic', 'Standard security guard service', 4500), -- R45.00/hour
  ('Armed', 'Armed security guard service', 6500), -- R65.00/hour
  ('Supervisor', 'Security supervisor level', 7500), -- R75.00/hour
  ('Premium', 'Premium security service', 9000) -- R90.00/hour
ON CONFLICT (name) DO NOTHING;

-- Insert default areas with risk multipliers
INSERT INTO public.areas (city, area, risk_multiplier) VALUES
  ('Johannesburg', 'CBD', 1.2),
  ('Johannesburg', 'Sandton', 1.0),
  ('Johannesburg', 'Soweto', 1.3),
  ('Cape Town', 'CBD', 1.1),
  ('Cape Town', 'Camps Bay', 1.0),
  ('Cape Town', 'Township Areas', 1.4),
  ('Durban', 'CBD', 1.1),
  ('Durban', 'Umhlanga', 1.0),
  ('Pretoria', 'CBD', 1.1),
  ('Pretoria', 'Centurion', 1.0)
ON CONFLICT (city, area) DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS quotes_user_id_idx ON public.quotes(user_id);
CREATE INDEX IF NOT EXISTS quotes_created_at_idx ON public.quotes(created_at);
CREATE INDEX IF NOT EXISTS quotes_status_idx ON public.quotes(status);
CREATE INDEX IF NOT EXISTS news_published_idx ON public.news(published, published_at);
CREATE INDEX IF NOT EXISTS contacts_status_idx ON public.contacts(status);
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON public.contacts(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can read and update their own profile
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Quotes policies
CREATE POLICY "Users can view own quotes" ON public.quotes
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create quotes" ON public.quotes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own quotes" ON public.quotes
  FOR UPDATE USING (auth.uid() = user_id);

-- News policies (public read, admin write)
CREATE POLICY "Anyone can read published news" ON public.news
  FOR SELECT USING (published = true);

-- Contacts policies
CREATE POLICY "Anyone can create contacts" ON public.contacts
  FOR INSERT WITH CHECK (true);

-- Guard levels and areas are publicly readable
ALTER TABLE public.guard_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.areas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read guard levels" ON public.guard_levels
  FOR SELECT USING (true);

CREATE POLICY "Anyone can read areas" ON public.areas
  FOR SELECT USING (true);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON public.quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON public.news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_guard_levels_updated_at
  BEFORE UPDATE ON public.guard_levels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_areas_updated_at
  BEFORE UPDATE ON public.areas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
