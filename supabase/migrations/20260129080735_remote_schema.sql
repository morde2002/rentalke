drop extension if exists "pg_net";

drop policy "Allow authenticated delete" on "public"."properties";

drop policy "Allow authenticated insert" on "public"."properties";

drop policy "Allow authenticated update" on "public"."properties";

drop policy "Allow public insert ratings" on "public"."property_ratings";

drop policy "Allow public read ratings" on "public"."property_ratings";

drop function if exists "public"."update_property_rating_stats"(property_uuid uuid);

set check_function_bodies = off;

create or replace view "public"."public_properties" as  SELECT id,
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
   FROM public.properties
  WHERE (available = true)
  ORDER BY created_at DESC;


CREATE OR REPLACE FUNCTION public.update_property_rating_stats(p_property_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
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
$function$
;


  create policy "Allow public delete"
  on "public"."properties"
  as permissive
  for delete
  to public
using (true);



  create policy "Allow public insert"
  on "public"."properties"
  as permissive
  for insert
  to public
with check (true);



  create policy "Allow public update"
  on "public"."properties"
  as permissive
  for update
  to public
using (true)
with check (true);



  create policy "Authenticated users can delete own properties"
  on "public"."properties"
  as permissive
  for delete
  to authenticated
using (true);



  create policy "Authenticated users can insert properties"
  on "public"."properties"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Authenticated users can update own properties"
  on "public"."properties"
  as permissive
  for update
  to authenticated
using (true)
with check (true);



  create policy "Public can read properties"
  on "public"."properties"
  as permissive
  for select
  to public
using (true);



  create policy "Anyone can submit ratings"
  on "public"."property_ratings"
  as permissive
  for insert
  to public
with check (true);



  create policy "Public can read ratings"
  on "public"."property_ratings"
  as permissive
  for select
  to public
using (true);



