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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rentalke.vercel.app'),
  title: {
    default: "RentalKE - Find Verified Rental Houses in Kenya | Affordable Bedsitters & 1 Bedroom",
    template: "%s | RentalKE - Affordable Rentals Kenya"
  },
  description: "Find verified rental houses in Kenya. Bedsitters from Ksh 5,000/month in Mombasa, Nairobi & more. Direct landlord contact, no agent fees. Real photos, real prices, real availability.",
  keywords: [
    // Primary keywords
    "rental houses Kenya",
    "houses for rent Kenya",
    "bedsitter Kenya",
    "affordable rentals Kenya",
    "cheap houses for rent Kenya",
    // Mombasa keywords
    "rental houses Mombasa",
    "bedsitter Mombasa",
    "houses for rent Mombasa",
    "affordable rentals Mombasa",
    "1 bedroom Mombasa",
    // Neighborhood keywords
    "bedsitter Nyali",
    "rental houses Vijiweni",
    "houses for rent Likoni",
    "bedsitter Bamburi",
    "rental houses Changamwe",
    // Trust keywords
    "verified landlords Kenya",
    "no agent rental houses",
    "direct landlord contact Kenya",
    "safe rental listings Kenya",
    // Swahili keywords
    "nyumba za kupanga Kenya",
    "nyumba za kupanga Mombasa",
    "bedsitter bei nafuu",
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
    title: "RentalKE - Find Verified Rental Houses in Kenya",
    description: "Find verified bedsitters & 1 bedroom rentals from Ksh 5,000/month in Mombasa, Nairobi. Direct landlord contact, no agent fees. Real photos, verified listings.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://rentalke.vercel.app',
    siteName: "RentalKE",
    images: [
      {
        url: "/og-image.jpg", // We'll create this
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
    title: "RentalKE - Find Verified Rental Houses in Kenya",
    description: "Bedsitters & 1 bedroom rentals from Ksh 5,000/month. Direct landlord contact, no agent fees. Mombasa, Nairobi & more.",
    images: ["/og-image.jpg"],
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
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://rentalke.vercel.app',
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
