import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session?.value) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const propertyData = await request.json();

  const { error } = await supabaseAdmin.from("properties").insert([
    {
      title: propertyData.title,
      description: propertyData.description ?? null,
      city: propertyData.city,
      neighborhood: propertyData.neighborhood,
      type: propertyData.type,
      bedrooms: propertyData.bedrooms,
      bathroom: propertyData.bathroom,
      price: propertyData.price,
      deposit: propertyData.deposit ?? null,
      water_included: propertyData.water_included ?? false,
      electricity_cost: propertyData.electricity_cost ?? null,
      landlord_name: propertyData.landlord_name,
      landlord_phone: propertyData.landlord_phone,
      whatsapp_number: propertyData.whatsapp_number ?? null,
      images: propertyData.images ?? [],
      video_url: propertyData.video_url ?? null,
      features: propertyData.features ?? [],
      nearby_places: propertyData.nearby_places ?? [],
      google_maps_url: propertyData.google_maps_url ?? null,
      payment_method: propertyData.payment_method ?? null,
      paybill_number: propertyData.paybill_number ?? null,
      till_number: propertyData.till_number ?? null,
      business_name: propertyData.business_name ?? null,
      water_source: propertyData.water_source ?? null,
      water_payment: propertyData.water_payment ?? null,
      electricity_type: propertyData.electricity_type ?? null,
      electricity_payment: propertyData.electricity_payment ?? null,
      security_type: propertyData.security_type ?? null,
      security_details: propertyData.security_details ?? null,
      additional_info: propertyData.additional_info ?? null,
      phone_verified: propertyData.phone_verified ?? false,
      id_verified: propertyData.id_verified ?? false,
      address_verified: propertyData.address_verified ?? false,
      rentalke_visited: propertyData.rentalke_visited ?? false,
      available: propertyData.available ?? true,
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
