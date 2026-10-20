import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Real Estate Advertising Packages",
  description: "Promote your property with RentalKE. Compare four 30-day real estate advertising packages.",
};

const packages = [
  {
    name: "Starter",
    price: "1,000",
    summary: "A clear, professional home for your property online.",
    features: [
      "One property listing on RentalKE for 30 days",
      "Listing prepared with your photos and property details",
      "Enquiries routed to you through RentalKE",
    ],
  },
  {
    name: "Featured",
    price: "2,500",
    summary: "More visibility for buyers actively browsing.",
    features: [
      "Everything in Starter",
      "Priority placement in the real estate listings",
      "Organic Facebook and Instagram feature",
    ],
    info: {
      term: "Priority placement",
      description: "Your property is placed more prominently than standard listings while the campaign is active.",
    },
  },
  {
    name: "Premium",
    price: "5,000",
    summary: "A broader social push with campaign follow-up.",
    features: [
      "Everything in Featured",
      "Organic feature on Facebook, Instagram, and TikTok",
      "Campaign tracker for promotion dates and enquiries",
      "One campaign progress update",
    ],
    info: {
      term: "Organic feature",
      description: "A post shared to RentalKE social pages. It is not a paid advertisement.",
    },
  },
  {
    name: "Portfolio",
    price: "10,000",
    summary: "Hands-on promotion for a property that needs a stronger push.",
    features: [
      "Everything in Premium",
      "Tailored social content for your property",
      "Campaign monitoring and a closing activity summary",
      "One listing refresh during the 30-day campaign",
    ],
    info: {
      term: "Campaign tracker",
      description: "A record of campaign activity and enquiries received by RentalKE. It does not guarantee a sale.",
    },
  },
];

function getWhatsAppUrl(packageName: string) {
  const message = `Hi, I'm interested in the ${packageName} real estate advertising package.`;
  return `https://wa.me/254115588218?text=${encodeURIComponent(message)}`;
}

export default function RealEstatePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-light">
        <section className="border-b border-border-gray bg-white py-12 sm:py-16">
          <div className="container-custom text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-blue">
              RentalKE Real Estate
            </p>
            <h1 className="mb-4 text-3xl font-semibold text-text-primary sm:text-4xl">
              Put your property in front of more people
            </h1>
            <p className="mx-auto max-w-2xl text-text-secondary">
              Choose a 30-day promotion package. We’ll help prepare your listing and share it with people looking for property.
            </p>
          </div>
        </section>

        <section className="container-custom py-10 sm:py-14">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-text-primary">
                Advertising packages
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                All prices are per property for 30 days.
              </p>
            </div>
            <p className="text-sm text-text-secondary">
              No paid ads or ad spend included.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {packages.map((plan) => (
              <article
                key={plan.name}
                className="flex flex-col rounded-card border border-border-gray bg-white p-6"
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
                  <span className="mr-1 text-base font-medium text-text-secondary">KSh</span>
                  {plan.price}
                </p>
                <p className="mb-5 text-xs text-text-secondary">per property / 30 days</p>

                <ul className="mb-6 flex-1 space-y-3 text-sm text-text-secondary">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-0.5 font-semibold text-primary-blue">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.info && (
                  <details className="group relative mb-5 text-xs text-text-secondary">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-full text-primary-blue outline-none focus-visible:ring-2 focus-visible:ring-primary-blue">
                      <span
                        aria-hidden="true"
                        className="flex h-4 w-4 items-center justify-center rounded-full border border-primary-blue text-[10px] font-semibold"
                      >
                        i
                      </span>
                      What does “{plan.info.term}” mean?
                    </summary>
                    <p className="mt-2 rounded-card border border-border-gray bg-bg-light p-3 leading-5">
                      {plan.info.description}
                    </p>
                  </details>
                )}

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

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-5 text-text-secondary">
            Social promotion is organic and depends on the campaign schedule. Paid Meta or Google advertising is not included. Promotion can increase visibility, but enquiries and sales are not guaranteed.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
