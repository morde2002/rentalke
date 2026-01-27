import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Rental Houses - Find Your Home",
  description: "Search and filter 353+ rental houses and apartments in Mombasa, Nairobi, Kenya. Find bedsitters, 1 bedroom, 2 bedroom rentals from KSh 5,000/month. Filter by location, price, and type. Direct landlord contact.",
  keywords: [
    "search rental houses Kenya",
    "find houses for rent Kenya",
    "browse rentals Mombasa",
    "search bedsitters Kenya",
    "filter rental properties Kenya",
    "find apartments Nairobi",
    "affordable rentals search",
  ],
  openGraph: {
    title: "Search Rental Houses in Kenya | Find Your Perfect Home",
    description: "Search 353+ rental houses in Mombasa, Nairobi. Filter by location, price, type. Bedsitters from KSh 5,000/month. Direct landlord contact.",
    type: "website",
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
