import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LoadingProvider from "@/components/LoadingProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rentalke.com'),
  title: {
    default: "Houses & Apartments For Rent in Mombasa, Nairobi, Kenya | RentalKE",
    template: "%s | RentalKE - Verified Rental Houses Kenya"
  },
  description: "353+ Houses & Apartments For Rent in Mombasa, Nairobi, Kenya. Bedsitters from KSh 5,000/month. 1 Bedroom, 2 Bedroom. Direct landlord contact, no agents. Real photos, verified listings, updated daily.",
  keywords: [
    // Primary keywords with price
    "rental houses Kenya",
    "houses for rent Kenya from KSh 5000",
    "bedsitter Kenya",
    "affordable rentals Kenya",
    "cheap houses for rent Kenya",
    "apartments for rent Kenya",
    // Mombasa primary
    "rental houses Mombasa",
    "houses for rent Mombasa",
    "bedsitter Mombasa",
    "apartments Mombasa",
    "affordable rentals Mombasa",
    "1 bedroom Mombasa",
    "2 bedroom Mombasa",
    "houses for rent in Mombasa",
    "bedsitters in Mombasa",
    // Nairobi keywords
    "rental houses Nairobi",
    "bedsitter Nairobi",
    "houses for rent Nairobi",
    "affordable rentals Nairobi",
    "1 bedroom Nairobi",
    // Mombasa neighborhoods
    "bedsitter Nyali",
    "houses for rent Nyali",
    "rental houses Bamburi",
    "bedsitter Bamburi",
    "houses for rent Likoni",
    "rental houses Vijiweni",
    "houses for rent Changamwe",
    "bedsitter Mtongwe",
    // Trust keywords
    "verified landlords Kenya",
    "no agent rental houses",
    "direct landlord contact Kenya",
    "safe rental listings Kenya",
    "trusted landlords Kenya",
    "verified property listings Kenya",
    // Swahili keywords
    "nyumba za kupanga Kenya",
    "nyumba za kupanga Mombasa",
    "bedsitter bei nafuu",
    "nyumba za kupanga Nairobi",
  ],
  authors: [{ name: "RentalKE" }],
  creator: "RentalKE",
  publisher: "RentalKE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Icons are auto-detected from app/icon.png
  // No need to specify manually
  manifest: "/manifest.json",
  openGraph: {
    title: "Houses & Apartments For Rent in Mombasa, Nairobi, Kenya | RentalKE",
    description: "353+ Houses & Apartments For Rent in Mombasa, Nairobi, Kenya. Bedsitters from KSh 5,000/month. 1 Bedroom, 2 Bedroom. Direct landlord contact, no agents. Real photos, verified listings, updated daily.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://rentalke.com',
    siteName: "RentalKE",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RentalKE - Affordable Rental Houses in Kenya"
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Houses & Apartments For Rent in Mombasa, Nairobi, Kenya | RentalKE",
    description: "353+ Houses & Apartments For Rent in Mombasa, Nairobi, Kenya. Bedsitters from KSh 5,000/month. Direct landlord contact, no agents. Real photos, verified listings.",
    images: ["/og-image.png"],
    creator: "@rentalke", // Update with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add after setting up Google Search Console
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://rentalke.com',
  },
  category: 'Real Estate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
