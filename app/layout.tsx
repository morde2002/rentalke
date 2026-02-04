import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import LoadingProvider from "@/components/LoadingProvider";
import MetaPixel from "@/components/analytics/MetaPixel";
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
  description: "Affordable Houses & Apartments For Rent in Mombasa, Kenya. Double Rooms from KSh 5,500/month. 1 Bedroom from KSh 8,000/month. Verified properties in Approved, Vijiweni. Direct landlord contact, no agents. Real photos, video tours, updated daily.",
  keywords: [
    // Primary keywords with exact prices (HIGH CONVERSION)
    "rental houses Kenya",
    "houses for rent Kenya from KSh 5000",
    "5500 shillings house Mombasa",
    "8000 shillings 1 bedroom Mombasa",
    "cheap houses for rent Mombasa",
    "affordable rentals Mombasa",
    "houses under 10000 Mombasa",
    "budget rental houses Mombasa",

    // Property types
    "double room Mombasa",
    "bedsitter Mombasa",
    "1 bedroom Mombasa",
    "single room Mombasa",
    "apartments Mombasa",

    // Current neighborhoods (ACTIVE LISTINGS)
    "houses for rent Approved Mombasa",
    "double room Approved",
    "rental houses Approved",
    "houses for rent Vijiweni",
    "1 bedroom Vijiweni",
    "rental houses Vijiweni",

    // Generic Mombasa searches (HIGH VOLUME)
    "rental houses Mombasa",
    "houses for rent Mombasa",
    "houses for rent in Mombasa",
    "bedsitters in Mombasa",
    "cheap rental houses Mombasa",
    "affordable housing Mombasa",

    // Location proximity
    "houses near ferry Mombasa",
    "rental houses Likoni",
    "houses Mtongwe",

    // Trust signals (COMPETITIVE ADVANTAGE)
    "verified rental houses Mombasa",
    "verified landlords Kenya",
    "no agent rental houses",
    "direct landlord contact Kenya",
    "video tour rental Mombasa",
    "water included rental Mombasa",
    "gated compound Mombasa",

    // Swahili keywords (UNTAPPED MARKET)
    "nyumba za kupanga Mombasa",
    "nyumba Approved",
    "nyumba Vijiweni",
    "nyumba bei nafuu Mombasa",
    "chumba kupanga Mombasa",
    "nyumba za kupanga Kenya",
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
    description: "Affordable Houses & Apartments For Rent in Mombasa, Kenya. Double Rooms from KSh 5,500/month. 1 Bedroom from KSh 8,000/month. Verified properties in Approved, Vijiweni. Direct landlord contact, no agents. Video tours available.",
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
    description: "Affordable Houses & Apartments For Rent in Mombasa. Double Rooms from KSh 5,500/month. Verified properties with video tours. Direct landlord contact, no agents.",
    images: ["/og-image.png"],
    creator: "@rentalke",
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
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
