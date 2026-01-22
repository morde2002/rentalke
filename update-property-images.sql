-- Update sample properties with placeholder images
-- These are Unsplash images that represent simple, affordable room interiors

-- Update Cozy Bedsitter in Vijiweni (Property 1)
UPDATE properties
SET images = ARRAY[
  'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
  'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80'
]
WHERE title = 'Cozy Bedsitter in Vijiweni';

-- Update Modern 1 Bedroom Apartment (Property 2)
UPDATE properties
SET images = ARRAY[
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'
]
WHERE title = 'Modern 1 Bedroom Apartment';

-- Update Affordable Bedsitter Near Town (Property 3)
UPDATE properties
SET images = ARRAY[
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80'
]
WHERE title = 'Affordable Bedsitter Near Town';
