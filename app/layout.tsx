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
  title: "RentalKE - Affordable Rental Homes in Kenya",
  description: "Find affordable bedsitters, 1-bedroom, and 2-bedroom rentals in Kenya. No agents. No stress. Just simple.",
  keywords: "rental, affordable housing, Kenya, Mombasa, bedsitter, 1 bedroom, cheap rent",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "RentalKE - Affordable Rental Homes in Kenya",
    description: "Find affordable bedsitters, 1-bedroom, and 2-bedroom rentals in Kenya. No agents. No stress. Just simple.",
    url: "https://rentalke.com",
    siteName: "RentalKE",
    images: [
      {
        url: "/images/rentalkelogo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RentalKE - Affordable Rental Homes in Kenya",
    description: "Find affordable bedsitters, 1-bedroom, and 2-bedroom rentals in Kenya. No agents. No stress. Just simple.",
    images: ["/images/rentalkelogo.png"],
  },
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
