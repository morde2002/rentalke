import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Rental Houses in Mombasa, Kenya | RentalKE',
  description: 'Search affordable rental houses and apartments in Mombasa, Kenya. Filter by price range, location, and type. View verified properties in Approved, Vijiweni, and more. Contact RentalKE for listing details and landlord referrals.',
  keywords: [
    'search rental houses Mombasa',
    'find houses for rent Mombasa',
    'affordable rentals Mombasa',
    'houses for rent Mombasa',
    'cheap houses Mombasa',
    'double room Mombasa',
    'bedsitter Mombasa',
    '1 bedroom Mombasa',
    'houses Approved Mombasa',
    'houses Vijiweni',
    'verified rental Mombasa',
    'video tour houses Mombasa',
  ],
  openGraph: {
    title: 'Search Rental Houses in Mombasa | RentalKE',
    description: 'Find affordable rental houses in Mombasa. Double rooms from KSh 5,500/month. Verified properties with video tours.',
    type: 'website',
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
