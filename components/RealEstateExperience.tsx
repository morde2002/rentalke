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

interface ListingFiltersValue {
  location: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
}

function ListingFilters({
  value,
  onChange,
}: {
  value: ListingFiltersValue;
  onChange: (filters: ListingFiltersValue) => void;
}) {
  return (
    <div className="space-y-4 rounded-card border border-border-gray bg-white p-3">
      <div>
        <h3 className="mb-2 text-sm font-semibold text-text-primary">Location</h3>
        <input
          type="search"
          value={value.location}
          onChange={(event) => onChange({ ...value, location: event.target.value })}
          placeholder="City or neighbourhood"
          aria-label="Filter by city or neighbourhood"
          className="input-field min-h-10 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-text-primary">Property Type</h3>
        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary">
            <input
              type="radio"
              name="real-estate-type"
              checked={!value.propertyType}
              onChange={() => onChange({ ...value, propertyType: "" })}
              className="h-4 w-4 text-primary-blue focus:ring-2 focus:ring-primary-blue"
            />
            All Types
          </label>
          {propertyTypes.map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary"
            >
              <input
                type="radio"
                name="real-estate-type"
                value={type}
                checked={value.propertyType === type}
                onChange={() => onChange({ ...value, propertyType: type })}
                className="h-4 w-4 text-primary-blue focus:ring-2 focus:ring-primary-blue"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-text-primary">Price Range (KSh)</h3>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          <label className="text-xs text-text-secondary">
            Minimum
            <input
              type="number"
              min="0"
              inputMode="numeric"
              value={value.minPrice}
              onChange={(event) => onChange({ ...value, minPrice: event.target.value })}
              placeholder="No minimum"
              className="input-field mt-1 min-h-10 px-3 py-2 text-xs"
            />
          </label>
          <label className="text-xs text-text-secondary">
            Maximum
            <input
              type="number"
              min="0"
              inputMode="numeric"
              value={value.maxPrice}
              onChange={(event) => onChange({ ...value, maxPrice: event.target.value })}
              placeholder="No maximum"
              className="input-field mt-1 min-h-10 px-3 py-2 text-xs"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

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
  const [showFilterModal, setShowFilterModal] = useState(false);

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
  const activeFilterCount = [location, propertyType, minPrice, maxPrice].filter(Boolean).length;
  const filterValues = { location, propertyType, minPrice, maxPrice };
  const updateFilters = (filters: ListingFiltersValue) => {
    setLocation(filters.location);
    setPropertyType(filters.propertyType);
    setMinPrice(filters.minPrice);
    setMaxPrice(filters.maxPrice);
  };

  useEffect(() => {
    if (!showFilterModal) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setShowFilterModal(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showFilterModal]);

  return (
    <main className="min-h-screen bg-bg-light">
      <section className="bg-white pb-4 pt-7 sm:pt-8">
        <div className="container-custom">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary-blue">
                RentalKE Real Estate
              </p>
              <h1 className="text-3xl font-semibold text-text-primary sm:text-4xl">
                {activeTab === "listings" ? "Properties for Sale" : "Property Pricing"}
              </h1>
              <p className="mt-1 text-sm text-text-secondary">
                {activeTab === "listings"
                  ? "Showing 0 properties for sale"
                  : "Proposed listing and marketing options"}
              </p>
            </div>

            <div
              className="inline-flex self-center rounded-full border border-border-gray bg-bg-light p-1 sm:self-auto"
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
                className={`min-h-10 rounded-full px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 ${
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
                className={`min-h-10 rounded-full px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 ${
                  activeTab === "pricing"
                    ? "bg-primary-blue text-white"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                Pricing
              </button>
            </div>
          </div>
        </div>
      </section>

      {activeTab === "listings" ? (
        <section
          key="listings"
          id="real-estate-listings-panel"
          role="tabpanel"
          aria-labelledby="real-estate-listings-tab"
          className="real-estate-tab-panel container-custom py-5 sm:py-6"
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-20 space-y-3">
                <ListingFilters value={filterValues} onChange={updateFilters} />
                <button
                  type="button"
                  onClick={clearFilters}
                  disabled={!hasFilters}
                  className="w-full rounded-card py-2 text-sm font-medium text-primary-blue hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Clear All Filters
                </button>
              </div>
            </aside>

            <div className="lg:col-span-9">
              <div className="mb-4 lg:hidden">
                <button
                  type="button"
                  onClick={() => setShowFilterModal(true)}
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-card border border-border-gray bg-white px-4 py-2 text-sm font-medium text-text-primary"
                >
                  <span aria-hidden="true">☰</span>
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-blue px-1 text-xs font-bold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="min-h-[350px] rounded-card border border-border-gray bg-white px-5 py-12 text-center sm:px-8 sm:py-16">
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
                  We’re preparing the first properties for sale. Contact us and
                  tell us what you’re looking for.
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

              <button
                type="button"
                onClick={() => selectTab("pricing")}
                className="mt-4 w-full rounded-card border border-border-gray bg-white px-4 py-3 text-center text-sm font-medium text-primary-blue hover:bg-bg-light"
              >
                Selling a property? View marketing options
              </button>
              <div className="mt-4 text-center">
                <Link
                  href="/search"
                  className="text-sm font-medium text-primary-blue hover:text-primary-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
                >
                  Looking for a rental instead? Find a rental home
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section
          key="pricing"
          id="real-estate-pricing-panel"
          role="tabpanel"
          aria-labelledby="real-estate-pricing-tab"
          className="real-estate-tab-panel container-custom py-5 sm:py-6"
        >
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text-primary sm:text-2xl">
                Property marketing options
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                Proposed starting fees. Confirm duration and deliverables with us.
              </p>
            </div>
            <p className="max-w-sm text-sm text-text-secondary sm:text-right">
              Ad spend is separate from the RentalKE management fee.
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

      {showFilterModal && activeTab === "listings" && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setShowFilterModal(false)}
            className="absolute inset-0 bg-black/50"
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="real-estate-filter-title"
            className="relative max-h-[85vh] w-full overflow-y-auto rounded-t-card bg-bg-light p-4 pb-6 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="real-estate-filter-title" className="text-lg font-semibold">
                Filter sale properties
              </h2>
              <button
                type="button"
                onClick={() => setShowFilterModal(false)}
                className="rounded-full px-3 py-2 text-sm font-medium text-primary-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue"
              >
                Close
              </button>
            </div>
            <ListingFilters value={filterValues} onChange={updateFilters} />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={clearFilters}
                className="min-h-11 rounded-full border border-border-gray bg-white px-4 py-2 text-sm font-semibold text-text-primary"
              >
                Clear filters
              </button>
              <button
                type="button"
                onClick={() => setShowFilterModal(false)}
                className="min-h-11 rounded-full bg-primary-blue px-4 py-2 text-sm font-semibold text-white"
              >
                Apply filters
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
