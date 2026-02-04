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

  // Create SEO-optimized title (mirrors competitor strategy)
  const title = `${property.type} in ${property.neighborhood}, ${property.city} - KSh ${property.price.toLocaleString()}/month${property.rentalke_visited ? ' | Verified' : ''}${property.video_url ? ' | Video Tour' : ''} | RentalKE`;

  // Create detailed description (more comprehensive than competitors)
  const description = `${property.type} for rent in ${property.neighborhood}, ${property.city}. KSh ${property.price.toLocaleString()} per month${property.deposit ? ` + KSh ${property.deposit.toLocaleString()} deposit` : ''}. ${property.bedrooms}, ${property.bathroom}. ${property.water_included ? 'Water included in rent. ' : ''}${property.rentalke_visited ? 'Verified by RentalKE team. ' : ''}${property.video_url ? 'Video tour available. ' : ''}${property.security_type ? `Security: ${property.security_type.replace('_', ' ')}. ` : ''}Direct landlord contact: ${property.whatsapp_number}. ${property.description?.slice(0, 120) || ''} Available now.`;

  return {
    title,
    description,
    keywords: [
      // Property type + location (high search volume)
      `${property.type} ${property.neighborhood}`,
      `${property.type} ${property.city}`,
      `${property.type.toLowerCase()} ${property.neighborhood}`,
      `${property.type.toLowerCase()} ${property.city}`,

      // Generic location searches
      `houses for rent ${property.neighborhood}`,
      `rental houses ${property.neighborhood}`,
      `houses for rent ${property.city}`,
      `apartments ${property.city}`,

      // Price-specific (HIGH CONVERSION)
      `${property.price} shillings ${property.city}`,
      `${property.price} shillings ${property.neighborhood}`,
      `houses under ${Math.ceil(property.price / 1000) * 1000} ${property.city}`,
      `affordable housing ${property.neighborhood}`,
      `cheap houses for rent ${property.city}`,

      // Bedroom-specific
      `${property.bedrooms} ${property.city}`,
      `${property.bedrooms} ${property.neighborhood}`,
      `${property.bedrooms} Mombasa`,

      // Location proximity
      `houses near ${property.neighborhood}`,
      `rental houses near ${property.neighborhood}`,

      // Trust signals (competitive advantage)
      ...(property.rentalke_visited ? ['verified rental Mombasa', 'verified houses Mombasa'] : []),
      ...(property.video_url ? ['video tour rental Mombasa', 'virtual tour house Mombasa'] : []),
      ...(property.water_included ? ['water included Mombasa'] : []),

      // Swahili keywords (untapped market)
      `nyumba ya kupanga ${property.neighborhood}`,
      `nyumba za kupanga ${property.city}`,
      `nyumba ${property.city}`,
      `chumba kupanga ${property.city}`,
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
