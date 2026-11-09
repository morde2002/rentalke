import { NextResponse } from "next/server";
import { getSaleListings } from "@/lib/sale-listings";

export async function GET() {
  try {
    const listings = await getSaleListings();
    return NextResponse.json({ listings });
  } catch {
    return NextResponse.json(
      { error: "Unable to load sale listings" },
      { status: 500 },
    );
  }
}
