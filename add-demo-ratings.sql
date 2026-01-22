-- Add realistic ratings to demo properties
-- Run this AFTER running add-ratings-system.sql
-- This script adds varied ratings to make properties look authentic

-- ===================================================================
-- STEP 1: Add ratings to first property (4.4★ average - Popular)
-- ===================================================================
WITH first_property AS (
  SELECT id FROM properties ORDER BY created_at ASC LIMIT 1
)
INSERT INTO property_ratings (property_id, rating, tenant_identifier)
SELECT
  fp.id,
  rating_value,
  'tenant_' || rating_value || '_' || row_number
FROM first_property fp
CROSS JOIN (
  VALUES
    (5, 1), (5, 2), (4, 3), (5, 4), (4, 5),
    (5, 6), (5, 7), (4, 8), (5, 9), (4, 10),
    (5, 11), (4, 12), (5, 13), (3, 14), (4, 15)
) AS ratings(rating_value, row_number);

-- ===================================================================
-- STEP 2: Add ratings to second property (4.75★ average - Excellent)
-- ===================================================================
WITH second_property AS (
  SELECT id FROM properties ORDER BY created_at ASC LIMIT 1 OFFSET 1
)
INSERT INTO property_ratings (property_id, rating, tenant_identifier)
SELECT
  sp.id,
  rating_value,
  'tenant_' || rating_value || '_1' || row_number
FROM second_property sp
CROSS JOIN (
  VALUES
    (5, 1), (5, 2), (5, 3), (4, 4),
    (5, 5), (5, 6), (5, 7), (4, 8)
) AS ratings(rating_value, row_number);

-- ===================================================================
-- STEP 3: Add ratings to third property (3.75★ average - Decent)
-- ===================================================================
WITH third_property AS (
  SELECT id FROM properties ORDER BY created_at ASC LIMIT 1 OFFSET 2
)
INSERT INTO property_ratings (property_id, rating, tenant_identifier)
SELECT
  tp.id,
  rating_value,
  'tenant_' || rating_value || '_2' || row_number
FROM third_property tp
CROSS JOIN (
  VALUES
    (4, 1), (3, 2), (4, 3), (4, 4), (3, 5), (5, 6),
    (4, 7), (3, 8), (4, 9), (4, 10), (3, 11), (4, 12)
) AS ratings(rating_value, row_number);

-- ===================================================================
-- VERIFICATION: Check that ratings were added correctly
-- ===================================================================
SELECT
  p.title,
  p.city,
  p.neighborhood,
  ROUND(p.average_rating, 2) as avg_rating,
  p.total_ratings,
  CASE
    WHEN p.average_rating >= 4.5 THEN '⭐⭐⭐⭐⭐ Excellent'
    WHEN p.average_rating >= 4.0 THEN '⭐⭐⭐⭐ Very Good'
    WHEN p.average_rating >= 3.5 THEN '⭐⭐⭐ Good'
    WHEN p.average_rating >= 3.0 THEN '⭐⭐ Fair'
    ELSE '⭐ Needs Improvement'
  END as rating_category
FROM properties p
WHERE p.total_ratings > 0
ORDER BY p.average_rating DESC;

-- ===================================================================
-- SUMMARY
-- ===================================================================
SELECT
  COUNT(*) as properties_with_ratings,
  ROUND(AVG(average_rating), 2) as overall_avg_rating,
  SUM(total_ratings) as total_ratings_given
FROM properties
WHERE total_ratings > 0;
