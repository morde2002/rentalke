"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import Link from "next/link";

type RealEstateTab = "listings" | "pricing";

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

const propertyTypes = ["House", "Apartment", "Land", "Commercial property"];

function getWhatsAppUrl(packageName: string) {
  const message = `Hi, I'm interested in the ${packageName} real estate advertising package.`;
  return `https://wa.me/254115588218?text=${encodeURIComponent(message)}`;
}

function getBuyerWhatsAppUrl() {
  const message =
    "Hi, I'm looking to buy a property in Kenya. Please let me know when sale listings are available.";
  return `https://wa.me/254115588218?text=${encodeURIComponent(message)}`;
}

export default function RealEstateExperience() {
  const [activeTab, setActiveTab] = useState<RealEstateTab>("listings");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const syncTabWithHash = () => {
      setActiveTab(window.location.hash === "#pricing" ? "pricing" : "listings");
    };

    syncTabWithHash();
    window.addEventListener("hashchange", syncTabWithHash);
    return () => window.removeEventListener("hashchange", syncTabWithHash);
  }, []);

  const selectTab = (tab: RealEstateTab) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    if (tab === "pricing") {
      url.hash = "pricing";
    } else {
      url.hash = "";
    }
    window.history.replaceState(null, "", url);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();

    const nextTab = activeTab === "listings" ? "pricing" : "listings";
    selectTab(nextTab);
    document
      .getElementById(`real-estate-${nextTab}-tab`)
      ?.focus();
  };

  const clearFilters = () => {
    setLocation("");
    setPropertyType("");
    setMinPrice("");
    setMaxPrice("");
  };

  const hasFilters = Boolean(location || propertyType || minPrice || maxPrice);

  return (
    <main className="min-h-screen bg-bg-light">
      <section className="border-b border-border-gray bg-white pb-7 pt-8 sm:pb-9 sm:pt-12">
        <div className="container-custom text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary-blue">
            RentalKE Real Estate
          </p>
          <h1 className="text-3xl font-semibold text-text-primary sm:text-4xl">
            Properties for sale
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
            Find a property for sale or explore ways to market your property.
          </p>

          <div
            className="mx-auto mt-7 inline-flex rounded-full border border-border-gray bg-bg-light p-1"
            role="tablist"
            aria-label="Real estate sections"
          >
            <button
              id="real-estate-listings-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === "listings"}
              aria-controls="real-estate-listings-panel"
              onClick={() => selectTab("listings")}
              onKeyDown={handleTabKeyDown}
              className={`min-h-11 rounded-full px-6 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 ${
                activeTab === "listings"
                  ? "bg-primary-blue text-white"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Listings
            </button>
            <button
              id="real-estate-pricing-tab"
              type="button"
              role="tab"
              aria-selected={activeTab === "pricing"}
              aria-controls="real-estate-pricing-panel"
              onClick={() => selectTab("pricing")}
              onKeyDown={handleTabKeyDown}
              className={`min-h-11 rounded-full px-6 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 ${
                activeTab === "pricing"
                  ? "bg-primary-blue text-white"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Pricing
            </button>
          </div>
        </div>
      </section>

      {activeTab === "listings" ? (
        <section
          key="listings"
          id="real-estate-listings-panel"
          role="tabpanel"
          aria-labelledby="real-estate-listings-tab"
          className="real-estate-tab-panel container-custom py-8 sm:py-10"
        >
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text-primary sm:text-2xl">
                Find a property
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                Sale listings are separate from rental homes.
              </p>
            </div>
            <p className="text-sm font-medium text-text-secondary">
              0 properties for sale
            </p>
          </div>

          <div className="grid gap-3 rounded-card border border-border-gray bg-white p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-5">
            <label className="text-sm font-medium text-text-primary lg:col-span-2">
              Location
              <input
                type="search"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="City, town, or neighbourhood"
                className="input-field mt-2 min-h-11 px-3 py-2 text-sm"
              />
            </label>

            <label className="text-sm font-medium text-text-primary">
              Property type
              <select
                value={propertyType}
                onChange={(event) => setPropertyType(event.target.value)}
                className="input-field mt-2 min-h-11 px-3 py-2 text-sm"
              >
                <option value="">All property types</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-text-primary">
              Min. price (KSh)
              <input
                type="number"
                min="0"
                inputMode="numeric"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                placeholder="No minimum"
                className="input-field mt-2 min-h-11 px-3 py-2 text-sm"
              />
            </label>

            <label className="text-sm font-medium text-text-primary">
              Max. price (KSh)
              <input
                type="number"
                min="0"
                inputMode="numeric"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder="No maximum"
                className="input-field mt-2 min-h-11 px-3 py-2 text-sm"
              />
            </label>
          </div>

          <div className="mt-6 rounded-card border border-border-gray bg-white px-5 py-12 text-center sm:px-8 sm:py-16">
            <span
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-bg-light text-2xl"
              aria-hidden="true"
            >
              🏠
            </span>
            <h2 className="text-xl font-semibold text-text-primary sm:text-2xl">
              No sale listings yet
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-text-secondary sm:text-base">
              We’re preparing the first properties for sale. Filters will help narrow the results once listings are available. Contact us and tell us what you’re looking for.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-border-gray px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-bg-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
                >
                  Clear filters
                </button>
              )}
              <a
                href={getBuyerWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2"
              >
                Ask about available properties
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-3 rounded-card border border-border-gray bg-white p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <h2 className="font-semibold text-text-primary">
                Have a property to sell?
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                View listing and marketing options from RentalKE.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                selectTab("pricing");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex min-h-10 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-primary-blue transition-colors hover:bg-bg-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
            >
              View pricing
            </button>
          </div>

          <div className="mt-5 text-center">
            <Link
              href="/search"
              className="text-sm font-medium text-primary-blue hover:text-primary-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
            >
              Looking for a rental instead? Find a rental home
            </Link>
          </div>
        </section>
      ) : (
        <section
          key="pricing"
          id="real-estate-pricing-panel"
          role="tabpanel"
          aria-labelledby="real-estate-pricing-tab"
          className="real-estate-tab-panel container-custom py-8 sm:py-10"
        >
          <div className="mb-7 text-center">
            <h2 className="text-2xl font-semibold text-text-primary sm:text-3xl">
              Property marketing options
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base">
              Prices are proposed starting fees in KSh. Confirm campaign duration
              and deliverables with us.
            </p>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-text-secondary">
              For managed campaigns, advertising spend is separate from the
              RentalKE management fee.
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
                    <span className="mr-1 text-base font-medium text-text-secondary">
                      KSh
                    </span>
                  )}
                  {plan.price}
                </p>
                <p className="mb-5 text-xs text-text-secondary">
                  {plan.priceNote}
                </p>

                <ul className="mb-6 flex-1 space-y-3 text-sm text-text-secondary">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 font-semibold text-primary-blue"
                      >
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={getWhatsAppUrl(plan.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-primary-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2"
                >
                  Ask about {plan.name}
                </a>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-7 max-w-3xl text-center text-xs leading-5 text-text-secondary sm:text-sm">
            Advertising budgets are agreed separately and paid toward the
            selected platforms. A campaign can increase visibility, but
            impressions, enquiries, and sales are not guaranteed. These proposed
            options and prices are subject to confirmation before booking.
          </p>
        </section>
      )}
    </main>
  );
}
