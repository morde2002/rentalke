import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RealEstateExperience from "@/components/RealEstateExperience";

export const metadata: Metadata = {
  title: "Properties for Sale",
  description:
    "Browse properties for sale in Kenya or explore RentalKE listing and marketing options.",
};

export default function RealEstatePage() {
  return (
    <>
      <Header />
      <RealEstateExperience />
      <Footer />
    </>
  );
}
