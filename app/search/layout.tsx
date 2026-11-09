import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Rental Houses and Apartments in Kenya",
  description:
    "Find rental houses and apartments across Kenya. Filter by location, property type, availability, and price, then view photos and listing details.",
  alternates: {
    canonical: "/search",
  },
  openGraph: {
    title: "Rental Houses and Apartments in Kenya",
    description:
      "Find rental houses and apartments across Kenya. Filter by location, property type, availability, and price.",
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Rental Houses and Apartments in Kenya",
    description:
      "Find rental houses and apartments across Kenya. Filter by location, property type, availability, and price.",
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
