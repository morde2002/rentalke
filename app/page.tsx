import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeExperience from "@/components/HomeExperience";
import { getProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const properties = await getProperties({ available: true });
  const featuredProperties = properties
    .filter((property) => property.rentalke_visited === true)
    .slice(0, 10);

  return (
    <>
      <Header />
      <HomeExperience initialProperties={featuredProperties} />
      <Footer />
    </>
  );
}
