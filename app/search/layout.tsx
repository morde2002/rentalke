import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Rental Houses and Apartments in Kenya",
  description:
    "Browse rental homes in Kenya and filter listings by location, property type, availability, and price. View photos, details, and video tours for individual homes.",
  alternates: {
    canonical: "/search",
  },
  openGraph: {
    title: "Rental Houses and Apartments in Kenya",
    description:
      "Browse rental homes in Kenya and filter listings by location, property type, availability, and price.",
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Rental Houses and Apartments in Kenya",
    description:
      "Browse rental homes in Kenya and filter listings by location, property type, availability, and price.",
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
