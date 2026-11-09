import { supabaseAdmin } from "@/lib/supabase-admin";
import type { SaleListing } from "@/types/real-estate";

const SALE_LISTING_COLUMNS =
  "id, slug, title, description, city, neighborhood, property_type, bedrooms, bathrooms, price, land_area_details, furnished, features, images, video_url, google_maps_url, contact_phone";

export async function getSaleListings(): Promise<SaleListing[]> {
  const { data, error } = await supabaseAdmin
    .from("sale_listings")
    .select(SALE_LISTING_COLUMNS)
    .eq("available", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching sale listings:", error);
    throw new Error("Unable to load sale listings");
  }

  return data as SaleListing[];
}

export async function getSaleListingBySlug(
  slug: string,
): Promise<SaleListing | null> {
  const { data, error } = await supabaseAdmin
    .from("sale_listings")
    .select(SALE_LISTING_COLUMNS)
    .eq("slug", slug)
    .eq("available", true)
    .maybeSingle();

  if (error) {
    console.error("Error fetching sale listing:", error);
    throw new Error("Unable to load sale listing");
  }

  return data as SaleListing | null;
}
