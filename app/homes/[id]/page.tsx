import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RentalPropertyDetails from "@/components/RentalPropertyDetails";
import { getPropertyById } from "@/lib/properties";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) notFound();

  return (
    <>
      <Header />
      <RentalPropertyDetails initialProperty={property} />
      <Footer />
    </>
  );
}
