import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import LoadingProvider from "@/components/LoadingProvider";
import MetaPixel from "@/components/analytics/MetaPixel";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://rentalke.com"),
  title: {
    default: "RentalKE | Rental Homes and Property for Sale in Kenya",
    template: "%s | RentalKE",
  },
  description:
    "Find rental homes in Kenya and browse houses, villas, and land for sale. Compare property prices, photos, and video tours on RentalKE.",
  alternates: {
    canonical: "/",
  },
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
    title: "RentalKE | Rental Homes and Property for Sale in Kenya",
    description:
      "Browse rental homes and property for sale in Kenya. View prices, photos, and video tours on RentalKE.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://rentalke.com",
    siteName: "RentalKE",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RentalKE property listings in Kenya",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RentalKE | Rental Homes and Property for Sale in Kenya",
    description:
      "Find rental homes and property for sale across Kenya with RentalKE.",
    images: ["/og-image.png"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              generateOrganizationSchema(),
              generateWebsiteSchema(),
            ]).replace(/</g, "\\u003c"),
          }}
        />
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
