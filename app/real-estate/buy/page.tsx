import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Properties for Sale",
  description:
    "Browse homes and land for sale through RentalKE. Contact us for current sale-property availability.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PropertiesForSalePage() {
  const enquiryUrl = `https://wa.me/254115588218?text=${encodeURIComponent(
    "Hi, I'm looking to buy a property in Kenya. Please let me know what sale listings are currently available."
  )}`;

  return (
    <>
      <Header />
      <main className="min-h-[65vh] bg-bg-light">
        <section className="border-b border-border-gray bg-white py-10 sm:py-14">
          <div className="container-custom">
            <Link
              href="/real-estate"
              className="mb-6 inline-flex text-sm font-medium text-primary-blue hover:text-primary-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
            >
              ← Real Estate
            </Link>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-blue">
              Buy property
            </p>
            <h1 className="text-3xl font-semibold text-text-primary sm:text-4xl">
              Properties for sale
            </h1>
            <p className="mt-3 max-w-2xl leading-6 text-text-secondary">
              Sale listings will have their own filters for location, property
              type, and total asking price.
            </p>
          </div>
        </section>

        <section className="container-custom py-12 sm:py-16">
          <div className="mx-auto max-w-2xl rounded-card border border-border-gray bg-white px-6 py-10 text-center sm:px-10">
            <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-bg-light text-2xl" aria-hidden="true">
              🏠
            </span>
            <h2 className="text-2xl font-semibold text-text-primary">
              Sale listings are being prepared
            </h2>
            <p className="mx-auto mt-3 max-w-lg leading-6 text-text-secondary">
              We don’t have live sale listings to show here yet. Contact us
              and tell us what you’re looking for; we’ll let you know what’s
              currently available.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={enquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2"
              >
                Ask about available properties
              </a>
              <Link
                href="/real-estate/advertise"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border-gray px-6 py-3 font-semibold text-text-primary transition-colors hover:bg-bg-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
              >
                I want to advertise
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
