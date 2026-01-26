// SEO helper functions for dynamic pages

export function generatePropertyTitle(property: {
  type: string;
  bedrooms: string;
  neighborhood: string;
  city: string;
  price: number;
}): string {
  return `${property.type} ${property.bedrooms} in ${property.neighborhood}, ${property.city} - Ksh ${property.price.toLocaleString()}/month`;
}

export function generatePropertyDescription(property: {
  type: string;
  bedrooms: string;
  bathroom: string;
  neighborhood: string;
  city: string;
  price: number;
  available: boolean;
  description?: string;
}): string {
  const availability = property.available ? "Available now" : "Occupied";
  const desc = property.description
    ? property.description.substring(0, 120)
    : `${property.type} with ${property.bedrooms} and ${property.bathroom} for rent in ${property.neighborhood}, ${property.city}.`;

  return `${desc} ${availability}. Ksh ${property.price.toLocaleString()}/month. Direct landlord contact, no agent fees. Verified listing.`;
}

export function generatePropertyKeywords(property: {
  type: string;
  bedrooms: string;
  neighborhood: string;
  city: string;
  price: number;
}): string {
  const typeKeywords = {
    "Bedsitter": "bedsitter, single room, studio",
    "1 Bedroom": "1 bedroom, one bedroom, 1BR",
    "2 Bedroom": "2 bedroom, two bedroom, 2BR",
  }[property.type] || property.type.toLowerCase();

  return [
    `${property.type} ${property.city}`,
    `${property.type} ${property.neighborhood}`,
    `rental houses ${property.neighborhood}`,
    `houses for rent ${property.city}`,
    typeKeywords,
    `affordable rentals ${property.city}`,
    `${property.price < 7000 ? 'cheap' : 'affordable'} ${property.type}`,
    `verified landlord ${property.city}`,
    `no agent ${property.type}`,
  ].join(", ");
}

// Generate SEO-friendly URL slug
export function generatePropertySlug(property: {
  type: string;
  neighborhood: string;
  city: string;
}): string {
  return `${property.type}-${property.neighborhood}-${property.city}`
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

// Location-based keywords generator
export function generateLocationKeywords(city: string, neighborhood?: string): string[] {
  const keywords = [
    `rental houses ${city}`,
    `houses for rent ${city}`,
    `bedsitter ${city}`,
    `affordable rentals ${city}`,
    `1 bedroom ${city}`,
    `cheap houses ${city}`,
    `nyumba za kupanga ${city}`,
  ];

  if (neighborhood) {
    keywords.push(
      `${neighborhood} ${city}`,
      `rental houses ${neighborhood}`,
      `bedsitter ${neighborhood}`,
      `houses for rent ${neighborhood}`,
      `1 bedroom ${neighborhood}`,
    );
  }

  return keywords;
}

// Price range keywords
export function generatePriceKeywords(minPrice: number, maxPrice: number): string[] {
  const keywords = [];

  if (minPrice < 7000) {
    keywords.push("cheap rentals Kenya", "affordable bedsitter", "rental under 7000");
  }

  if (minPrice >= 7000 && maxPrice <= 12000) {
    keywords.push("mid-range rentals Kenya", "rental 7000-12000", "affordable 1 bedroom");
  }

  if (maxPrice > 12000) {
    keywords.push("rental above 10000", "spacious rentals", "2 bedroom Kenya");
  }

  return keywords;
}

// Organization structured data (for homepage)
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RentalKE",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://rentalke.vercel.app",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://rentalke.vercel.app"}/images/rentalkelogo.png`,
    "description": "Find verified rental houses in Kenya. Direct landlord contact, no agent fees.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mombasa",
      "addressCountry": "KE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+254-115-588-218",
      "contactType": "Customer Service",
      "email": "info.rentalke@gmail.com",
      "areaServed": "KE",
      "availableLanguage": ["en", "sw"]
    },
    "sameAs": [
      "https://tiktok.com/@rentalke", // Update with actual social media links
      "https://instagram.com/rentalke",
      "https://facebook.com/rentalke"
    ]
  };
}

// Website structured data
export function generateWebsiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rentalke.vercel.app";

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "RentalKE",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

// Breadcrumb structured data
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}
