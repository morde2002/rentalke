import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("sale_listings")
    .select(
      "id, title, description, city, neighborhood, property_type, bedrooms, bathrooms, price, land_area_details, furnished, features, images, video_url, google_maps_url, contact_phone",
    )
    .eq("available", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching sale listings:", error);
    return NextResponse.json(
      { error: "Unable to load sale listings" },
      { status: 500 },
    );
  }

  return NextResponse.json({ listings: data });
}
