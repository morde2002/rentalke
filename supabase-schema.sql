-- RentalKE Database Schema
-- Run this in Supabase SQL Editor after creating your project

-- Create properties table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Basic Info
  title TEXT NOT NULL,
  description TEXT,

  -- Location
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,

  -- Property Details
  type TEXT NOT NULL, -- 'Bedsitter', '1 Bedroom', '2 Bedroom', etc.
  bedrooms TEXT NOT NULL,
  bathroom TEXT NOT NULL,

  -- Pricing
  price INTEGER NOT NULL, -- Monthly rent in KSH
  deposit INTEGER, -- Security deposit

  -- Utilities
  water_included BOOLEAN DEFAULT false,
  electricity_cost TEXT,

  -- Availability
  available BOOLEAN DEFAULT true,

  -- Contact
  landlord_name TEXT NOT NULL,
  landlord_phone TEXT NOT NULL,
  whatsapp_number TEXT,

  -- Images (array of URLs)
  images TEXT[] DEFAULT '{}',

  -- Additional Info
  features TEXT[] DEFAULT '{}',
  nearby_places TEXT[] DEFAULT '{}',

  -- SEO/Search
  search_vector tsvector
);

-- Create index for faster searches
CREATE INDEX properties_city_idx ON properties(city);
CREATE INDEX properties_neighborhood_idx ON properties(neighborhood);
CREATE INDEX properties_type_idx ON properties(type);
CREATE INDEX properties_available_idx ON properties(available);
CREATE INDEX properties_price_idx ON properties(price);
CREATE INDEX properties_search_idx ON properties USING GIN(search_vector);

-- Create function to update search vector
CREATE OR REPLACE FUNCTION properties_search_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.city, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.neighborhood, '')), 'A');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update search vector
CREATE TRIGGER properties_search_update_trigger
  BEFORE INSERT OR UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION properties_search_update();

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read properties
CREATE POLICY "Allow public read i access"
  ON properties
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow authenticated users to insert/update/delete
-- (We'll use this for the admin panel later)
CREATE POLICY "Allow authenticated insert"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete"
  ON properties
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert sample data for testing
INSERT INTO properties (
  title,
  description,
  city,
  neighborhood,
  type,
  bedrooms,
  bathroom,
  price,
  deposit,
  water_included,
  electricity_cost,
  available,
  landlord_name,
  landlord_phone,
  whatsapp_number,
  features,
  nearby_places
) VALUES (
  'Cozy Bedsitter in Vijiweni',
  'A comfortable bedsitter perfect for students or young professionals starting out. The room is spacious and well-ventilated with plenty of natural light.',
  'Mombasa',
  'Vijiweni',
  'Bedsitter',
  '1 room',
  'Private bathroom',
  3500,
  3500,
  true,
  'Around Ksh 500/month',
  true,
  'Mama Jane',
  '0712345678',
  '254712345678',
  ARRAY['Own bathroom', 'Water included in rent', 'Spacious room', 'Good ventilation', 'Natural lighting'],
  ARRAY['5 minutes to main road', 'Matatu to town: Ksh 50', 'Shop next door', 'Safe neighborhood']
),
(
  'Modern 1 Bedroom Apartment',
  'A well-maintained 1 bedroom apartment in a quiet area. Perfect for small families or working professionals.',
  'Mombasa',
  'Vijiweni',
  '1 Bedroom',
  '1 bedroom',
  'Private bathroom',
  8000,
  8000,
  true,
  'Around Ksh 800/month',
  true,
  'Mr. Hassan',
  '0723456789',
  '254723456789',
  ARRAY['Separate bedroom', 'Small kitchen', 'Water included', 'Secure compound', 'Parking available'],
  ARRAY['10 minutes walk to main road', 'Near schools', 'Shop nearby', 'Good security']
),
(
  'Affordable Bedsitter Near Town',
  'Budget-friendly bedsitter close to town center. Ideal for students at nearby colleges.',
  'Mombasa',
  'Vijiweni',
  'Bedsitter',
  '1 room',
  'Shared bathroom',
  4000,
  4000,
  false,
  'Around Ksh 600/month',
  false,
  'Baba Ali',
  '0734567890',
  '254734567890',
  ARRAY['Close to town', 'Affordable', 'Clean compound'],
  ARRAY['2 minutes to main road', 'Near matatu stage', 'Shops nearby']
);

-- Create view for public property listings (optional, for cleaner queries)
CREATE VIEW public_properties AS
SELECT
  id,
  created_at,
  title,
  description,
  city,
  neighborhood,
  type,
  bedrooms,
  bathroom,
  price,
  deposit,
  water_included,
  electricity_cost,
  available,
  landlord_phone,
  whatsapp_number,
  images,
  features,
  nearby_places
FROM properties
WHERE available = true
ORDER BY created_at DESC;
