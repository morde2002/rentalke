import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RentalKE - Affordable Rental Homes in Kenya",
  description: "Find affordable bedsitters, 1-bedroom, and 2-bedroom rentals in Kenya. No agents. No stress. Just simple.",
  keywords: "rental, affordable housing, Kenya, Mombasa, bedsitter, 1 bedroom, cheap rent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
