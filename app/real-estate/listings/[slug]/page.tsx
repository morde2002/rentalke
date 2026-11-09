import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SaleListingDetails from "@/components/SaleListingDetails";
import { getSaleListingBySlug } from "@/lib/sale-listings";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getSaleListingBySlug(slug);

  if (!listing) {
    return {
      title: "Property Not Found",
      description: "The requested property for sale could not be found.",
    };
  }

  const title = `${listing.title} | RentalKE`;
  const description = listing.description.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: listing.images[0] ? [listing.images[0]] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: listing.images[0] ? [listing.images[0]] : [],
    },
  };
}

export default async function SaleListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getSaleListingBySlug(slug);

  if (!listing) notFound();

  return (
    <>
      <Header />
      <SaleListingDetails listing={listing} />
      <Footer />
    </>
  );
}
