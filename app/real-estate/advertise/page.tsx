import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Advertise Your Property",
  description: "Compare RentalKE property listing and marketing options. Campaign management fees and advertising budgets are shown separately.",
};

const packages = [
  {
    name: "Property Listing",
    price: "1,000",
    priceNote: "per property / 30 days",
    summary: "Put your property online with a dedicated page buyers can share.",
    features: [
      "One sale-property listing on RentalKE",
      "Listing page prepared from your details and photos",
      "Call and WhatsApp enquiry options",
    ],
  },
  {
    name: "Search Campaign",
    price: "5,000",
    priceNote: "management fee + ad budget",
    summary: "Reach people searching online for a property like yours.",
    features: [
      "Campaign planning and Google Search setup",
      "Targeting based on the agreed property and location",
      "Campaign management and a results summary",
    ],
  },
  {
    name: "Social Campaign",
    price: "5,000",
    priceNote: "management fee + ad budget",
    summary: "Showcase your property to people browsing social platforms.",
    features: [
      "Facebook and Instagram campaign setup",
      "Creative prepared from your supplied photos or video",
      "Campaign management and a results summary",
    ],
  },
  {
    name: "Multi-Channel",
    price: "10,000",
    priceNote: "management fee + ad budget",
    summary: "Coordinate search and social promotion in one campaign.",
    features: [
      "Google Search plus Facebook and Instagram",
      "Campaign coordination and agreed optimizations",
      "Combined campaign results summary",
    ],
  },
  {
    name: "Custom Campaign",
    price: "Custom",
    priceNote: "quoted for your property",
    summary: "A tailored plan for premium, unusual, or multi-property campaigns.",
    features: [
      "Campaign plan based on your goals and audience",
      "Channels and creative scope agreed before launch",
      "Management, budget, and reporting outlined in your quote",
    ],
  },
];

function getWhatsAppUrl(packageName: string) {
  const message = `Hi, I'm interested in the ${packageName} real estate advertising package.`;
  return `https://wa.me/254115588218?text=${encodeURIComponent(message)}`;
}

export default function AdvertisePropertyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-light">
        <section className="border-b border-border-gray bg-white py-12 sm:py-16">
          <div className="container-custom">
            <Link
              href="/real-estate"
              className="mb-8 inline-flex text-sm font-medium text-primary-blue hover:text-primary-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
            >
              ← Real Estate
            </Link>
            <div className="text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-blue">
                For property owners
              </p>
              <h1 className="mb-4 text-3xl font-semibold text-text-primary sm:text-4xl">
                Choose how you want to market your property
              </h1>
              <p className="mx-auto max-w-2xl text-text-secondary">
                Start with a listing, or ask RentalKE to manage a paid campaign. We’ll confirm the scope and total cost with you before anything goes live.
              </p>
            </div>
          </div>
        </section>

        <section className="container-custom py-10 sm:py-14">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-text-primary">Proposed marketing options</h2>
              <p className="mt-2 text-sm text-text-secondary">
                Prices are proposed starting fees in KSh. Confirm campaign duration and deliverables with us.
              </p>
            </div>
            <p className="max-w-sm text-sm text-text-secondary sm:text-right">
              For managed campaigns, advertising spend is separate from the RentalKE management fee.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {packages.map((plan) => (
              <article
                key={plan.name}
                className="flex flex-col rounded-card border border-border-gray bg-white p-6 sm:p-7"
              >
                <div className="mb-5">
                  <h3 className="text-xl font-semibold text-text-primary">
                    {plan.name}
                  </h3>
                  <p className="mt-2 min-h-10 text-sm leading-6 text-text-secondary">
                    {plan.summary}
                  </p>
                </div>

                <p className="mb-1 text-3xl font-semibold text-text-primary">
                  {plan.price !== "Custom" && (
                    <span className="mr-1 text-base font-medium text-text-secondary">KSh</span>
                  )}
                  {plan.price}
                </p>
                <p className="mb-5 text-xs text-text-secondary">{plan.priceNote}</p>

                <ul className="mb-6 flex-1 space-y-3 text-sm text-text-secondary">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-0.5 font-semibold text-primary-blue">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={getWhatsAppUrl(plan.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-primary-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2"
                >
                  Ask about {plan.name}
                </a>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-text-secondary">
            Advertising budgets are agreed separately and paid toward the selected platforms. A campaign can increase visibility, but impressions, enquiries, and sales are not guaranteed. These proposed options and prices are subject to confirmation before booking.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
