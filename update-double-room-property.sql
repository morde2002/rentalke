-- SQL to update Double Room property with correct details
-- Copy and paste this into Supabase SQL Editor

UPDATE properties
SET
  price = 5500,
  deposit = 11000,
  landlord_phone = '+254721409615',
  whatsapp_number = '+254721409615',
  google_maps_url = 'https://maps.google.com/maps/search/green%20hill%20models%20school/@-4.10041978,39.65252813,17z?hl=en',
  description = 'Spacious double room (2 conjoined rooms) in a secure gated compound at Approved Field (Kiwanja cha Approved), near Green Hill Model School. Perfect for singles or students looking for affordable housing. Water bill is FREE - included in rent. Electricity separate (tenant pays own bills). Tarmac road access with direct transport to ferry just 2 minutes walk from the property. 10-15 minutes from main road. Ksh 30 fare from Ferry. Security dog on premises and landlord lives next door for easy contact and quick assistance. Peaceful neighborhood with good transport links.',
  additional_info = 'Location: Approved Field (Kiwanja cha Approved) karibu na Green Hill Model School. Transport: Ksh 30 from Ferry. Direct matatu access 2 minutes from house. Water bill is FREE (included in rent). Electricity separate - tenant pays own bills.'
WHERE title = 'Affordable Double Room in Approved - Gated with Security';
