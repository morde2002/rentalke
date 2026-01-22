-- Add star rating system to properties
-- Run this in Supabase SQL Editor

-- Create ratings table to store individual tenant ratings
CREATE TABLE IF NOT EXISTS property_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5), -- 1 to 5 stars
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  tenant_identifier TEXT -- Anonymous identifier (could be phone number hash or session ID)
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS property_ratings_property_id_idx ON property_ratings(property_id);
CREATE INDEX IF NOT EXISTS property_ratings_created_at_idx ON property_ratings(created_at);

-- Add calculated rating fields to properties table
ALTER TABLE properties ADD COLUMN IF NOT EXISTS average_rating DECIMAL(3,2); -- e.g., 4.35
ALTER TABLE properties ADD COLUMN IF NOT EXISTS total_ratings INTEGER DEFAULT 0;

-- Create a function to update property rating statistics
CREATE OR REPLACE FUNCTION update_property_rating_stats(p_property_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE properties
  SET
    average_rating = (
      SELECT ROUND(AVG(rating)::numeric, 2)
      FROM property_ratings
      WHERE property_id = p_property_id
    ),
    total_ratings = (
      SELECT COUNT(*)
      FROM property_ratings
      WHERE property_id = p_property_id
    )
  WHERE id = p_property_id;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update stats when a rating is added
CREATE OR REPLACE FUNCTION trigger_update_property_rating_stats()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM update_property_rating_stats(NEW.property_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_rating_insert
  AFTER INSERT ON property_ratings
  FOR EACH ROW
  EXECUTE FUNCTION trigger_update_property_rating_stats();

CREATE TRIGGER after_rating_delete
  AFTER DELETE ON property_ratings
  FOR EACH ROW
  EXECUTE FUNCTION trigger_update_property_rating_stats();

-- Example: Add some demo ratings to test
/*
-- First, get a property ID from your properties table, then:
INSERT INTO property_ratings (property_id, rating, tenant_identifier) VALUES
  ('your-property-id-here', 5, 'tenant_hash_123'),
  ('your-property-id-here', 4, 'tenant_hash_456'),
  ('your-property-id-here', 5, 'tenant_hash_789');

-- This will automatically update the average_rating and total_ratings in properties table
*/
