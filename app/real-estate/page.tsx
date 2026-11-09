import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RealEstateExperience from "@/components/RealEstateExperience";
import { getSaleListings } from "@/lib/sale-listings";
import type { SaleListing } from "@/types/real-estate";
import { absoluteSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Property for Sale in Kenya | Houses, Villas and Land",
  description:
    "Browse houses, apartments, villas, land, and commercial property for sale in Kenya. Compare prices, explore photos and video tours, and contact sellers.",
  alternates: {
    canonical: "/real-estate",
  },
  openGraph: {
    title: "Property for Sale in Kenya | RentalKE",
    description:
      "Browse houses, apartments, villas, land, and commercial property for sale in Kenya.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Property for Sale in Kenya | RentalKE",
    description:
      "Browse houses, apartments, villas, land, and commercial property for sale in Kenya.",
  },
};

export const dynamic = "force-dynamic";

export default async function RealEstatePage() {
  let listings: SaleListing[] = [];
  let listingsError = "";

  try {
    listings = await getSaleListings();
  } catch (error) {
    console.error("Sale listings could not be rendered because the listing query failed:", error);
    listingsError = "Unable to load sale listings. Please try again later.";
  }

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: listings.slice(0, 20).map((listing, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteSiteUrl(`/real-estate/listings/${listing.slug}`),
      name: listing.title,
    })),
  };

  return (
    <>
      <Header />
      {itemList.itemListElement.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(itemList).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <RealEstateExperience
        initialListings={listings}
        initialListingsError={listingsError}
      />
      <Footer />
    </>
  );
}
