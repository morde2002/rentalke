-- Add payment, water access, and security fields to properties table
-- Run this in Supabase SQL Editor

-- Payment verification fields
ALTER TABLE properties ADD COLUMN IF NOT EXISTS payment_method TEXT; -- 'paybill', 'till_number', 'send_money', 'pochi'
ALTER TABLE properties ADD COLUMN IF NOT EXISTS paybill_number TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS till_number TEXT;
ALTER TABLE properties ADD COLUMN IF NOT EXISTS business_name TEXT; -- Name shown on M-Pesa when paying

-- Water details
ALTER TABLE properties ADD COLUMN IF NOT EXISTS water_source TEXT; -- 'piped_to_house', 'jerricans', 'borehole'
ALTER TABLE properties ADD COLUMN IF NOT EXISTS water_payment TEXT; -- 'included', 'separate_monthly', 'per_jerrican'

-- Electricity details
ALTER TABLE properties ADD COLUMN IF NOT EXISTS electricity_type TEXT; -- 'tokens', 'monthly_bill', 'included'
ALTER TABLE properties ADD COLUMN IF NOT EXISTS electricity_payment TEXT; -- Who pays: 'tenant', 'landlord'

-- Security information
ALTER TABLE properties ADD COLUMN IF NOT EXISTS security_type TEXT; -- 'gated_compound', 'open_access', 'watchman', 'gate_and_watchman'
ALTER TABLE properties ADD COLUMN IF NOT EXISTS security_details TEXT; -- Additional security info

-- Create indexes for filtering
CREATE INDEX IF NOT EXISTS properties_payment_method_idx ON properties(payment_method);
CREATE INDEX IF NOT EXISTS properties_water_source_idx ON properties(water_source);
CREATE INDEX IF NOT EXISTS properties_security_type_idx ON properties(security_type);

-- Example: Update demo properties with realistic data
/*
UPDATE properties SET
  payment_method = 'paybill',
  paybill_number = '123456',
  business_name = 'Mama Jane Rentals',
  water_source = 'piped_to_house',
  water_payment = 'included',
  electricity_type = 'tokens',
  electricity_payment = 'tenant',
  security_type = 'gated_compound',
  security_details = 'Gate with padlock, well-lit compound'
WHERE title = 'Cozy Bedsitter in Vijiweni';

UPDATE properties SET
  payment_method = 'till_number',
  till_number = '789012',
  business_name = 'Hassan Properties',
  water_source = 'piped_to_house',
  water_payment = 'included',
  electricity_type = 'tokens',
  electricity_payment = 'tenant',
  security_type = 'gate_and_watchman',
  security_details = 'Gated with night watchman, CCTV cameras'
WHERE title = 'Modern 1 Bedroom Apartment';

UPDATE properties SET
  payment_method = 'paybill',
  paybill_number = '345678',
  business_name = 'Baba Ali Properties',
  water_source = 'piped_to_house',
  water_payment = 'separate_monthly',
  electricity_type = 'tokens',
  electricity_payment = 'tenant',
  security_type = 'open_access',
  security_details = 'Open compound, safe neighborhood'
WHERE title = 'Affordable Bedsitter Near Town';
*/
