import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Real Estate Homes",
  description: "Real estate listings are coming soon to RentalKE. Contact us to ask about available properties.",
};

export default function RealEstatePage() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-bg-light">
        <div className="container-custom flex min-h-[60vh] items-center justify-center py-16">
          <section className="w-full max-w-xl rounded-card border border-border-gray bg-white p-8 text-center sm:p-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-blue">
              RentalKE Real Estate
            </p>
            <h1 className="mb-4 text-3xl font-semibold text-text-primary sm:text-4xl">
              Real Estate Homes
            </h1>
            <p className="mb-8 text-text-secondary">
              We’re preparing our real estate listings. Contact us on WhatsApp and we’ll help with your inquiry.
            </p>
            <a
              href="https://wa.me/254115588218?text=Hi%2C%20I%27m%20interested%20in%20real%20estate%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-primary-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2"
            >
              Ask us on WhatsApp
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
