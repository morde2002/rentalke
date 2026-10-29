import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Buy and Sell Property in Kenya",
  description:
    "Explore property listings for sale or find out how RentalKE can help market your property.",
};

export default function RealEstatePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-light">
        <section className="bg-white py-14 sm:py-20">
          <div className="container-custom">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-blue">
                RentalKE Real Estate
              </p>
              <h1 className="text-balance text-3xl font-semibold text-text-primary sm:text-5xl">
                Find a property or bring yours to market
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
                A separate place for property buyers and owners. Explore sale
                listings or choose the kind of marketing support you need.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/real-estate/buy"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary-blue px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-primary-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2"
                >
                  Browse properties for sale
                </Link>
                <Link
                  href="/real-estate/advertise"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-border-gray bg-white px-6 py-3 text-center font-semibold text-text-primary transition-colors hover:bg-bg-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2"
                >
                  Advertise a property
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container-custom py-10 sm:py-14">
          <div className="grid gap-5 md:grid-cols-2">
            <article className="flex flex-col rounded-card border border-border-gray bg-white p-6 sm:p-8">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-bg-light text-primary-blue" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3 10 9-7 9 7M5 9v11h14V9M9 20v-6h6v6" />
                </svg>
              </span>
              <h2 className="text-2xl font-semibold text-text-primary">Looking to buy?</h2>
              <p className="mt-3 flex-1 leading-6 text-text-secondary">
                Sale properties will have their own search filters, asking
                prices, and dedicated detail pages—separate from rental homes.
              </p>
              <Link
                href="/real-estate/buy"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-border-gray px-5 py-2.5 text-center font-semibold text-primary-blue transition-colors hover:bg-bg-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
              >
                Explore sale listings
              </Link>
            </article>

            <article className="flex flex-col rounded-card border border-border-gray bg-white p-6 sm:p-8">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-bg-light text-primary-blue" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 20h16M6 20V8l6-4 6 4v12M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
                </svg>
              </span>
              <h2 className="text-2xl font-semibold text-text-primary">Have a property to sell?</h2>
              <p className="mt-3 flex-1 leading-6 text-text-secondary">
                Start with a property listing or ask about managed search and
                social campaigns. Any advertising budget is agreed separately.
              </p>
              <Link
                href="/real-estate/advertise"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-primary-blue px-5 py-2.5 text-center font-semibold text-white transition-colors hover:bg-primary-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2"
              >
                View marketing options
              </Link>
            </article>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-card border border-border-gray bg-white p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <h2 className="font-semibold text-text-primary">Still looking for a rental?</h2>
              <p className="mt-1 text-sm text-text-secondary">
                Rental homes have their own search and availability filters.
              </p>
            </div>
            <Link
              href="/search"
              className="inline-flex min-h-10 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-primary-blue hover:bg-bg-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
            >
              Find a rental home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
