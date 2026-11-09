import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RentalSearchExperience from "@/components/RentalSearchExperience";
import { getProperties } from "@/lib/properties";
import { absoluteSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export default async function SearchPage() {
  const properties = await getProperties();
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: properties.slice(0, 20).map((property, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteSiteUrl(`/homes/${property.id}`),
      name: property.title,
    })),
  };

  return (
    <>
      <Header />
      {itemList.itemListElement.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(itemList).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <RentalSearchExperience initialProperties={properties} />
      <Footer />
    </>
  );
}
