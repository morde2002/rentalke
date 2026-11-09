import type { MetadataRoute } from "next";
import { getProperties } from "@/lib/properties";
import { getSaleListings } from "@/lib/sale-listings";
import { absoluteSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "/",
    "/search",
    "/real-estate",
    "/landlords",
    "/contact",
    "/about",
    "/terms",
    "/privacy",
  ];

  const [propertiesResult, saleListingsResult] = await Promise.allSettled([
    getProperties({ available: true }),
    getSaleListings(),
  ]);
  const properties =
    propertiesResult.status === "fulfilled" ? propertiesResult.value : [];
  const saleListings =
    saleListingsResult.status === "fulfilled" ? saleListingsResult.value : [];

  if (propertiesResult.status === "rejected") {
    console.error("Rental listings could not be added to the sitemap:", propertiesResult.reason);
  }
  if (saleListingsResult.status === "rejected") {
    console.error("Sale listings could not be added to the sitemap:", saleListingsResult.reason);
  }

  return [
    ...staticPaths.map((path) => ({ url: absoluteSiteUrl(path) })),
    ...properties.map((property) => ({
      url: absoluteSiteUrl(`/homes/${property.id}`),
      ...(property.updated_at && { lastModified: new Date(property.updated_at) }),
    })),
    ...saleListings.map((listing) => ({
      url: absoluteSiteUrl(`/real-estate/listings/${listing.slug}`),
    })),
  ];
}
