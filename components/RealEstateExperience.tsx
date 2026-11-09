"use client";

import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import SaleListingCard from "@/components/SaleListingCard";
import type { SaleListing } from "@/types/real-estate";

type RealEstateTab = "listings" | "pricing";

const LISTINGS_PER_PAGE = 20;
const MIN_PRICE_SLIDER_MAX = 100_000_000;
const propertyTypes = ["House", "Apartment", "Villa", "Land", "Commercial property"];

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

interface ListingFiltersValue {
  location: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  minBedrooms: string;
}

function ListingFilters({
  value,
  onChange,
  sliderMax,
}: {
  value: ListingFiltersValue;
  onChange: (filters: ListingFiltersValue) => void;
  sliderMax: number;
}) {
  const update = (changes: Partial<ListingFiltersValue>) =>
    onChange({ ...value, ...changes });
  const formatPrice = (price: number) =>
    `KSh ${price.toLocaleString("en-KE", { maximumFractionDigits: 0 })}`;

  return (
    <div className="space-y-4 rounded-card border border-border-gray bg-white p-3">
      <div>
        <h3 className="mb-2 text-sm font-semibold text-text-primary">Location</h3>
        <input
          type="search"
          value={value.location}
          onChange={(event) => update({ location: event.target.value })}
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
              onChange={() => update({ propertyType: "" })}
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
                onChange={() => update({ propertyType: type })}
                className="h-4 w-4 text-primary-blue focus:ring-2 focus:ring-primary-blue"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-text-primary">Bedrooms</h3>
        <select
          value={value.minBedrooms}
          onChange={(event) => update({ minBedrooms: event.target.value })}
          aria-label="Filter by minimum bedrooms"
          className="input-field min-h-10 px-3 py-2 text-sm"
        >
          <option value="">Any number</option>
          {[1, 2, 3, 4, 5, 6].map((bedrooms) => (
            <option key={bedrooms} value={bedrooms}>
              {bedrooms}+ bedrooms
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-text-primary">Price Range (KSh)</h3>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          <div className="space-y-2">
            <label className="block text-xs text-text-secondary">
              Minimum
              <input
                type="number"
                min="0"
                inputMode="numeric"
                value={value.minPrice}
                onChange={(event) => update({ minPrice: event.target.value })}
                placeholder="No minimum"
                className="input-field mt-1 min-h-10 px-3 py-2 text-xs"
              />
            </label>
            <div>
              <div className="flex justify-between text-[10px] text-text-secondary">
                <span>Price slider</span>
                <span>{value.minPrice ? formatPrice(Number(value.minPrice)) : "No minimum"}</span>
              </div>
              <input
                type="range"
                min="0"
                max={sliderMax}
                step={Math.max(100_000, Math.round(sliderMax / 1000))}
                value={Math.min(Number(value.minPrice) || 0, sliderMax)}
                onChange={(event) =>
                  update({ minPrice: event.target.value === "0" ? "" : event.target.value })
                }
                aria-label="Minimum price slider"
                className="mt-1 h-2 w-full cursor-pointer accent-primary-blue"
              />
              <div className="flex justify-between text-[10px] text-text-secondary">
                <span>No minimum</span>
                <span>{formatPrice(sliderMax)}+</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-xs text-text-secondary">
              Maximum
              <input
                type="number"
                min="0"
                inputMode="numeric"
                value={value.maxPrice}
                onChange={(event) => update({ maxPrice: event.target.value })}
                placeholder="No maximum"
                className="input-field mt-1 min-h-10 px-3 py-2 text-xs"
              />
            </label>
            <div>
              <div className="flex justify-between text-[10px] text-text-secondary">
                <span>Price slider</span>
                <span>{value.maxPrice ? formatPrice(Number(value.maxPrice)) : "No maximum"}</span>
              </div>
              <input
                type="range"
                min="0"
                max={sliderMax}
                step={Math.max(100_000, Math.round(sliderMax / 1000))}
                value={value.maxPrice ? Math.min(Number(value.maxPrice), sliderMax) : sliderMax}
                onChange={(event) =>
                  update({
                    maxPrice:
                      event.target.value === String(sliderMax) ? "" : event.target.value,
                  })
                }
                aria-label="Maximum price slider"
                className="mt-1 h-2 w-full cursor-pointer accent-primary-blue"
              />
              <div className="flex justify-between text-[10px] text-text-secondary">
                <span>{formatPrice(0)}</span>
                <span>No maximum</span>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-2 text-[10px] leading-4 text-text-secondary">
          Drag to set a price, or type an exact amount above. The slider scales to the listings.
        </p>
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

export default function RealEstateExperience({
  initialListings,
  initialListingsError,
}: {
  initialListings: SaleListing[];
  initialListingsError: string;
}) {
  const [activeTab, setActiveTab] = useState<RealEstateTab>("listings");
  const [listings] = useState<SaleListing[]>(initialListings);
  const listingsLoading = false;
  const listingsError = initialListingsError;
  const [filters, setFilters] = useState<ListingFiltersValue>({
    location: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const syncTabWithHash = () => {
      setActiveTab(window.location.hash === "#pricing" ? "pricing" : "listings");
    };

    syncTabWithHash();
    window.addEventListener("hashchange", syncTabWithHash);
    return () => window.removeEventListener("hashchange", syncTabWithHash);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    if (!showFilterModal) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setShowFilterModal(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showFilterModal]);

  const selectTab = (tab: RealEstateTab) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.hash = tab === "pricing" ? "pricing" : "";
    window.history.replaceState(null, "", url);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const nextTab = activeTab === "listings" ? "pricing" : "listings";
    selectTab(nextTab);
    document.getElementById(`real-estate-${nextTab}-tab`)?.focus();
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      propertyType: "",
      minPrice: "",
      maxPrice: "",
      minBedrooms: "",
    });
  };

  const hasFilters = Object.values(filters).some(Boolean);
  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const sliderMax = useMemo(() => {
    const highestPrice = Math.max(
      MIN_PRICE_SLIDER_MAX,
      ...listings.map((listing) => listing.price),
      Number(filters.minPrice) || 0,
      Number(filters.maxPrice) || 0,
    );
    return Math.ceil(highestPrice / 1_000_000) * 1_000_000;
  }, [filters.maxPrice, filters.minPrice, listings]);
  const filteredListings = useMemo(() => {
    const searchLocation = filters.location.trim().toLowerCase();
    const minimumPrice = filters.minPrice ? Number(filters.minPrice) : null;
    const maximumPrice = filters.maxPrice ? Number(filters.maxPrice) : null;
    const minimumBedrooms = filters.minBedrooms ? Number(filters.minBedrooms) : null;

    return listings.filter((listing) => {
      const listingLocation = `${listing.city} ${listing.neighborhood}`.toLowerCase();
      if (searchLocation && !listingLocation.includes(searchLocation)) return false;
      if (
        filters.propertyType &&
        listing.property_type.toLowerCase() !== filters.propertyType.toLowerCase()
      ) {
        return false;
      }
      if (minimumPrice !== null && listing.price < minimumPrice) return false;
      if (maximumPrice !== null && listing.price > maximumPrice) return false;
      if (minimumBedrooms !== null && listing.bedrooms < minimumBedrooms) return false;
      return true;
    });
  }, [filters, listings]);

  const totalPages = Math.ceil(filteredListings.length / LISTINGS_PER_PAGE);
  const startIndex = (currentPage - 1) * LISTINGS_PER_PAGE;
  const currentListings = filteredListings.slice(
    startIndex,
    startIndex + LISTINGS_PER_PAGE,
  );

  const changePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-white">
      {isScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 rounded-full bg-primary-blue p-3 text-white shadow-lg transition-colors hover:bg-primary-blue-hover"
          aria-label="Scroll to top"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      <div
        className={`fixed left-0 right-0 top-16 z-40 border-b border-border-gray bg-white transition-transform duration-300 lg:hidden ${
          isScrolled && activeTab === "listings" ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container-custom flex items-center justify-between py-3">
          <button
            type="button"
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-2 rounded-card border border-border-gray px-4 py-2 hover:bg-bg-light"
          >
            <span className="font-medium">Filter</span>
            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-blue px-1 text-xs font-bold text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
          <span className="text-sm text-text-secondary">
            {filteredListings.length} properties
          </span>
        </div>
      </div>

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
                  ? listingsLoading
                    ? "Loading properties for sale..."
                    : listingsError
                      ? "Unable to load properties for sale"
                      : `Showing ${
                          filteredListings.length === 0 ? 0 : startIndex + 1
                        }-${Math.min(startIndex + LISTINGS_PER_PAGE, filteredListings.length)} of ${filteredListings.length} properties for sale`
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
          id="real-estate-listings-panel"
          role="tabpanel"
          aria-labelledby="real-estate-listings-tab"
          className="container-custom pb-8 pt-4"
        >
          <div className="mb-4 lg:hidden">
            <button
              type="button"
              onClick={() => setShowFilterModal(true)}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-card border border-border-gray px-4 py-2 hover:bg-bg-light"
            >
              <span className="font-medium">Filter properties</span>
              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-blue px-1 text-xs font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-20 space-y-3">
                <ListingFilters value={filters} onChange={setFilters} sliderMax={sliderMax} />
                <button
                  type="button"
                  onClick={clearFilters}
                  disabled={!hasFilters}
                  className="w-full rounded-card py-2 text-sm font-medium text-primary-blue hover:bg-bg-light disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Clear All Filters
                </button>
              </div>
            </aside>

            <div className="lg:col-span-9">
              {listingsError ? (
                <div
                  role="alert"
                  className="py-16 text-center text-sm text-red-700"
                >
                  {listingsError}
                </div>
              ) : listingsLoading ? (
                <div className="py-16 text-center text-text-secondary" role="status">
                  <div className="mb-4 text-4xl">⏳</div>
                  Loading sale listings...
                </div>
              ) : currentListings.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                    {currentListings.map((listing) => (
                      <SaleListingCard key={listing.id} listing={listing} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-8 flex flex-col items-center gap-4">
                      <p className="text-sm text-text-secondary">
                        Page {currentPage} of {totalPages}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => changePage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="rounded-card border border-border-gray px-3 py-2 text-sm font-medium transition-colors hover:bg-bg-light disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          ← Previous
                        </button>
                        <div className="flex gap-1">
                          {Array.from({ length: totalPages }, (_, index) => index + 1)
                            .filter(
                              (page) =>
                                page === 1 ||
                                page === totalPages ||
                                (page >= currentPage - 1 && page <= currentPage + 1),
                            )
                            .map((page, index, pages) => (
                              <span key={page} className="flex items-center gap-1">
                                {index > 0 && pages[index - 1] !== page - 1 && (
                                  <span className="px-1 text-text-secondary">...</span>
                                )}
                                <button
                                  onClick={() => changePage(page)}
                                  aria-current={page === currentPage ? "page" : undefined}
                                  className={`rounded-card px-3 py-2 text-sm font-medium transition-colors ${
                                    page === currentPage
                                      ? "bg-primary-blue text-white"
                                      : "border border-border-gray hover:bg-bg-light"
                                  }`}
                                >
                                  {page}
                                </button>
                              </span>
                            ))}
                        </div>
                        <button
                          onClick={() => changePage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="rounded-card border border-border-gray px-3 py-2 text-sm font-medium transition-colors hover:bg-bg-light disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-16 text-center">
                  <div className="mb-4 text-6xl">🏠</div>
                  <h2 className="mb-2 text-2xl font-semibold">
                    {hasFilters ? "No properties match those filters" : "No sale listings yet"}
                  </h2>
                  <p className="mb-6 text-text-secondary">
                    {hasFilters
                      ? "Try adjusting your filters to see more results."
                      : "We’re preparing the first properties for sale. Contact us and tell us what you’re looking for."}
                  </p>
                  {hasFilters ? (
                    <button type="button" onClick={clearFilters} className="btn-primary">
                      Clear Filters
                    </button>
                  ) : (
                    <a
                      href={getBuyerWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      Ask about available properties
                    </a>
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={() => selectTab("pricing")}
                className="mt-5 w-full rounded-card border border-border-gray bg-white px-4 py-3 text-center text-sm font-medium text-primary-blue hover:bg-bg-light"
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
          id="real-estate-pricing-panel"
          role="tabpanel"
          aria-labelledby="real-estate-pricing-tab"
          className="container-custom pb-8 pt-5"
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
                  <h3 className="text-xl font-semibold text-text-primary">{plan.name}</h3>
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
                <p className="mb-5 text-xs text-text-secondary">{plan.priceNote}</p>
                <ul className="mb-6 flex-1 space-y-3 text-sm text-text-secondary">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span aria-hidden="true" className="mt-0.5 font-semibold text-primary-blue">
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
            Advertising budgets are agreed separately and paid toward the selected
            platforms. A campaign can increase visibility, but impressions, enquiries,
            and sales are not guaranteed. These proposed options and prices are subject
            to confirmation before booking.
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
            <ListingFilters value={filters} onChange={setFilters} sliderMax={sliderMax} />
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
                Show {filteredListings.length} properties
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
