import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SaleListingDetails from "@/components/SaleListingDetails";
import { getSaleListingBySlug } from "@/lib/sale-listings";
import { absoluteSiteUrl } from "@/lib/site-url";

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

  const title = listing.title;
  const description = listing.description.slice(0, 300);
  const url = absoluteSiteUrl(`/real-estate/listings/${listing.slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url,
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

  const url = absoluteSiteUrl(`/real-estate/listings/${listing.slug}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.title,
    description: listing.description,
    url,
    image: listing.images,
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.neighborhood,
      addressRegion: listing.city,
      addressCountry: "KE",
    },
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: "KES",
      availability: "https://schema.org/InStock",
      url,
      itemOffered: {
        "@type": "Residence",
        name: listing.title,
        numberOfBedrooms: listing.bedrooms,
        ...(listing.bathrooms !== null && {
          numberOfBathroomsTotal: listing.bathrooms,
        }),
        furnished: listing.furnished,
      },
    },
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteSiteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Properties for Sale",
        item: absoluteSiteUrl("/real-estate"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: listing.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([structuredData, breadcrumbData]).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
      <SaleListingDetails listing={listing} />
      <Footer />
    </>
  );
}
