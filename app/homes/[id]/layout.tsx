import type { Metadata } from "next";
import { getPropertyById } from "@/lib/properties";
import { absoluteSiteUrl } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    return {
      title: "Property Not Found",
      description: "The requested property could not be found.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const priceText = property.price !== null
    ? `KSh ${property.price.toLocaleString()}/month`
    : property.price_min != null && property.price_max != null
    ? `KSh ${property.price_min.toLocaleString()}-${property.price_max.toLocaleString()}/month`
    : "Price undisclosed";
  const title = `${property.type} for Rent in ${property.neighborhood}, ${property.city} - ${priceText}`;
  const details = [
    property.bedrooms,
    property.bathroom,
    property.water_included === true ? "water included" : null,
    property.security_type ? `${property.security_type.replaceAll("_", " ")} security` : null,
    property.video_url ? "video tour available" : null,
  ]
    .filter(Boolean)
    .join(", ");
  const description = [
    `${property.type} for rent in ${property.neighborhood}, ${property.city}.`,
    priceText,
    details ? `${details}.` : "",
    property.description || "",
  ]
    .filter(Boolean)
    .join(" ")
    .slice(0, 300);

  return {
    title,
    description,
    alternates: {
      canonical: absoluteSiteUrl(`/homes/${property.id}`),
    },
    robots: {
      index: property.available,
      follow: true,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: absoluteSiteUrl(`/homes/${property.id}`),
      images: property.images && property.images.length > 0 ? [
        {
          url: property.images[0],
          width: 1200,
          height: 630,
          alt: `${property.type} in ${property.neighborhood}, ${property.city}`,
        },
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: property.images && property.images.length > 0 ? [property.images[0]] : [],
    },
  };
}

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
