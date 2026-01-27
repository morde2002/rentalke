import type { Metadata } from "next";
import { getPropertyById } from "@/lib/properties";

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
    };
  }

  // Create dynamic title and description based on property details
  const title = `${property.type} in ${property.neighborhood}, ${property.city} - KSh ${property.price.toLocaleString()}/month`;
  const description = `${property.type} for rent in ${property.neighborhood}, ${property.city}. ${property.bedrooms}, ${property.bathroom}. KSh ${property.price.toLocaleString()}/month. ${property.available ? 'Available now' : 'Currently occupied'}. ${property.phone_verified ? 'Verified landlord' : 'Direct landlord contact'}. ${property.description?.slice(0, 100) || 'Contact for more details'}.`;

  return {
    title,
    description,
    keywords: [
      `${property.type} ${property.city}`,
      `${property.type} ${property.neighborhood}`,
      `rental house ${property.neighborhood}`,
      `${property.bedrooms} ${property.city}`,
      `houses for rent ${property.neighborhood}`,
      `KSh ${property.price} rental`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
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
