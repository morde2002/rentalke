-- Add verification fields to properties table
-- Run this in Supabase SQL Editor

-- Add verification columns
ALTER TABLE properties ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT false;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS id_verified BOOLEAN DEFAULT false;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS address_verified BOOLEAN DEFAULT false;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS rentalke_visited BOOLEAN DEFAULT false;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS verified_by TEXT; -- Admin who verified

-- Add landlord verification details (stored but not displayed publicly)
ALTER TABLE properties ADD COLUMN IF NOT EXISTS landlord_id_number TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS landlord_alt_phone TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS landlord_physical_address TEXT;

-- Create index for quick filtering of verified properties
CREATE INDEX IF NOT EXISTS properties_verified_idx ON properties(phone_verified, id_verified, address_verified);

-- Example: Mark existing demo properties as verified
-- UPDATE properties SET
--   phone_verified = true,
--   id_verified = true,
--   address_verified = true,
--   rentalke_visited = true,
--   verified_at = NOW(),
--   verified_by = 'Admin'
-- WHERE title IN ('Cozy Bedsitter in Vijiweni', 'Modern 1 Bedroom Apartment', 'Affordable Bedsitter Near Town');
