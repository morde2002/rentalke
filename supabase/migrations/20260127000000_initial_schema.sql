-- RentalKE Complete Database Schema
-- Generated from production database

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update search vector
CREATE OR REPLACE FUNCTION public.properties_search_update()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.city, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.neighborhood, '')), 'A');
  RETURN NEW;
END;
$$;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Function to update property rating statistics
CREATE OR REPLACE FUNCTION public.update_property_rating_stats(property_uuid UUID)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE properties
  SET
    average_rating = (
      SELECT ROUND(AVG(rating)::numeric, 2)
      FROM property_ratings
      WHERE property_id = property_uuid
    ),
    total_ratings = (
      SELECT COUNT(*)
      FROM property_ratings
      WHERE property_id = property_uuid
    )
  WHERE id = property_uuid;
END;
$$;

-- Trigger function for rating stats update
CREATE OR REPLACE FUNCTION public.trigger_update_property_rating_stats()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  PERFORM update_property_rating_stats(NEW.property_id);
  RETURN NEW;
END;
$$;

-- =====================================================
-- TABLES
-- =====================================================

-- Properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NULL DEFAULT now(),
  title TEXT NOT NULL,
  description TEXT NULL,
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  type TEXT NOT NULL,
  bedrooms TEXT NOT NULL,
  bathroom TEXT NOT NULL,
  price INTEGER NOT NULL,
  deposit INTEGER NULL,
  water_included BOOLEAN NULL DEFAULT false,
  electricity_cost TEXT NULL,
  available BOOLEAN NULL DEFAULT true,
  landlord_name TEXT NOT NULL,
  landlord_phone TEXT NOT NULL,
  whatsapp_number TEXT NULL,
  images TEXT[] NULL DEFAULT '{}'::TEXT[],
  features TEXT[] NULL DEFAULT '{}'::TEXT[],
  nearby_places TEXT[] NULL DEFAULT '{}'::TEXT[],
  search_vector TSVECTOR NULL,
  phone_verified BOOLEAN NULL DEFAULT false,
  id_verified BOOLEAN NULL DEFAULT false,
  address_verified BOOLEAN NULL DEFAULT false,
  rentalke_visited BOOLEAN NULL DEFAULT false,
  verified_at TIMESTAMP WITH TIME ZONE NULL,
  verified_by TEXT NULL,
  landlord_id_number TEXT NULL,
  landlord_alt_phone TEXT NULL,
  landlord_physical_address TEXT NULL,
  payment_method TEXT NULL,
  paybill_number TEXT NULL,
  till_number TEXT NULL,
  business_name TEXT NULL,
  water_source TEXT NULL,
  water_payment TEXT NULL,
  electricity_type TEXT NULL,
  electricity_payment TEXT NULL,
  security_type TEXT NULL,
  security_details TEXT NULL,
  average_rating NUMERIC(3, 2) NULL,
  total_ratings INTEGER NULL DEFAULT 0,
  video_url TEXT NULL,
  google_maps_url TEXT NULL,
  additional_info TEXT NULL,
  CONSTRAINT properties_pkey PRIMARY KEY (id)
);

-- Property ratings table
CREATE TABLE IF NOT EXISTS public.property_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL,
  rating INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NULL DEFAULT now(),
  tenant_identifier TEXT NULL,
  CONSTRAINT property_ratings_pkey PRIMARY KEY (id),
  CONSTRAINT property_ratings_property_id_fkey FOREIGN KEY (property_id)
    REFERENCES public.properties(id) ON DELETE CASCADE,
  CONSTRAINT property_ratings_rating_check CHECK ((rating >= 1) AND (rating <= 5))
);

-- =====================================================
-- INDEXES
-- =====================================================

-- Properties indexes
CREATE INDEX IF NOT EXISTS properties_city_idx ON public.properties USING btree (city);
CREATE INDEX IF NOT EXISTS properties_neighborhood_idx ON public.properties USING btree (neighborhood);
CREATE INDEX IF NOT EXISTS properties_type_idx ON public.properties USING btree (type);
CREATE INDEX IF NOT EXISTS properties_available_idx ON public.properties USING btree (available);
CREATE INDEX IF NOT EXISTS properties_price_idx ON public.properties USING btree (price);
CREATE INDEX IF NOT EXISTS properties_search_idx ON public.properties USING gin (search_vector);
CREATE INDEX IF NOT EXISTS properties_verified_idx ON public.properties USING btree (phone_verified, id_verified, address_verified);
CREATE INDEX IF NOT EXISTS properties_payment_method_idx ON public.properties USING btree (payment_method);
CREATE INDEX IF NOT EXISTS properties_water_source_idx ON public.properties USING btree (water_source);
CREATE INDEX IF NOT EXISTS properties_security_type_idx ON public.properties USING btree (security_type);

-- Property ratings indexes
CREATE INDEX IF NOT EXISTS property_ratings_property_id_idx ON public.property_ratings USING btree (property_id);
CREATE INDEX IF NOT EXISTS property_ratings_created_at_idx ON public.property_ratings USING btree (created_at);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger to auto-update search vector on properties
DROP TRIGGER IF EXISTS properties_search_update_trigger ON public.properties;
CREATE TRIGGER properties_search_update_trigger
  BEFORE INSERT OR UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.properties_search_update();

-- Trigger to auto-update updated_at on properties
DROP TRIGGER IF EXISTS update_properties_updated_at ON public.properties;
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Triggers to update rating stats after insert/delete
DROP TRIGGER IF EXISTS after_rating_insert ON public.property_ratings;
CREATE TRIGGER after_rating_insert
  AFTER INSERT ON public.property_ratings
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_update_property_rating_stats();

DROP TRIGGER IF EXISTS after_rating_delete ON public.property_ratings;
CREATE TRIGGER after_rating_delete
  AFTER DELETE ON public.property_ratings
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_update_property_rating_stats();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on properties
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Allow public read access to properties
DROP POLICY IF EXISTS "Allow public read access" ON public.properties;
CREATE POLICY "Allow public read access"
  ON public.properties
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.properties;
CREATE POLICY "Allow authenticated insert"
  ON public.properties
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update
DROP POLICY IF EXISTS "Allow authenticated update" ON public.properties;
CREATE POLICY "Allow authenticated update"
  ON public.properties
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.properties;
CREATE POLICY "Allow authenticated delete"
  ON public.properties
  FOR DELETE
  TO authenticated
  USING (true);

-- Enable RLS on property_ratings
ALTER TABLE public.property_ratings ENABLE ROW LEVEL SECURITY;

-- Allow public to insert ratings
DROP POLICY IF EXISTS "Allow public insert ratings" ON public.property_ratings;
CREATE POLICY "Allow public insert ratings"
  ON public.property_ratings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public read access to ratings
DROP POLICY IF EXISTS "Allow public read ratings" ON public.property_ratings;
CREATE POLICY "Allow public read ratings"
  ON public.property_ratings
  FOR SELECT
  TO public
  USING (true);
