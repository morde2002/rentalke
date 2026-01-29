"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import ScrollReveal from "@/components/ScrollReveal";
import PropertyCardGrid from "@/components/PropertyCardGrid";
import { getProperties } from "@/lib/properties";
import type { Property } from "@/types/database";

export default function SearchPage() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("all");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 20;
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isFilterAnimating, setIsFilterAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for sticky filter bar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (priceRange[0] > 0 || priceRange[1] < 20000) count++;
    if (selectedType !== "all") count++;
    if (selectedCity !== "all") count++;
    if (selectedNeighborhood !== "all") count++;
    if (!showOnlyAvailable) count++;
    return count;
  };

  // Available cities and neighborhoods
  const cities = ["Mombasa", "Nairobi", "Kisumu"];
  const neighborhoods: Record<string, string[]> = {
    Mombasa: ["Bamburi", "Nyali", "Likoni", "Changamwe", "Mtongwe", "Vijiweni"],
    Nairobi: ["Kasarani", "Umoja", "Kahawa", "Ruaka", "Kitengela"],
    Kisumu: ["Kondele", "Nyalenda", "Migosi", "Mamboleo"],
  };

  // Load properties from database
  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      const data = await getProperties({
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        type: selectedType,
        available: showOnlyAvailable ? true : undefined,
      });

      setProperties(data);
      setLoading(false);
    }

    loadProperties();
  }, [priceRange, selectedType, showOnlyAvailable, selectedCity, selectedNeighborhood]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [priceRange, selectedType, showOnlyAvailable, selectedCity, selectedNeighborhood]);

  // Reset neighborhood when city changes
  useEffect(() => {
    setSelectedNeighborhood("all");
  }, [selectedCity]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Filter properties by location
  const filteredProperties = properties.filter((property) => {
    if (selectedCity !== "all" && property.city !== selectedCity) return false;
    if (selectedNeighborhood !== "all" && property.neighborhood !== selectedNeighborhood) return false;
    return true;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openFilterModal = () => {
    setShowFilterModal(true);
    setTimeout(() => setIsFilterAnimating(true), 10);
  };

  const closeFilterModal = () => {
    setIsFilterAnimating(false);
    setTimeout(() => setShowFilterModal(false), 300);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Scroll to Top Button */}
        {isScrolled && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 p-3 bg-primary-blue text-white rounded-full shadow-lg hover:bg-primary-blue-hover transition-all duration-300"
            aria-label="Scroll to top"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}

        {/* Mobile Sticky Filter Bar - Shows on scroll */}
        <div className={`lg:hidden fixed top-16 left-0 right-0 bg-white border-b border-border-gray z-40 transition-transform duration-300 ${isScrolled ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="container-custom py-3 flex items-center justify-between">
            <button
              onClick={openFilterModal}
              className="flex items-center gap-2 px-4 py-2 border border-border-gray rounded-card hover:bg-bg-light transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="font-medium">Filter</span>
              {getActiveFilterCount() > 0 && (
                <span className="bg-primary-blue text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>
            <span className="text-sm text-text-secondary">
              • {filteredProperties.length} homes found
            </span>
          </div>
        </div>

        {/* Search Header */}
        <section className="bg-white pt-8 pb-4">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">
              Find Your Next Home
            </h1>
            <p className="text-text-secondary">
              {loading ? 'Loading...' : `Showing ${startIndex + 1}-${Math.min(endIndex, filteredProperties.length)} of ${filteredProperties.length} homes${selectedCity !== "all" ? ` in ${selectedCity}` : selectedNeighborhood !== "all" ? ` in ${selectedNeighborhood}` : " in Kenya"}`}
            </p>
          </div>
        </section>

        {/* Filters and Results */}
        <section className="pt-4 pb-8">
          <div className="container-custom">
            {/* Mobile Filter Button - Before scrolling */}
            <div className="lg:hidden mb-4">
              <button
                onClick={openFilterModal}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-border-gray rounded-card hover:bg-bg-light transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="font-medium">Filter & Sort</span>
                {getActiveFilterCount() > 0 && (
                  <span className="bg-primary-blue text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getActiveFilterCount()}
                  </span>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Filters Sidebar - Desktop Only */}
              <aside className="hidden lg:block lg:col-span-3">
                <div className="lg:sticky lg:top-20 space-y-3">
                <div className="bg-white border border-border-gray rounded-card p-3 space-y-3">
                  {/* Location Filter */}
                  <div>
                    <h3 className="font-semibold text-text-primary mb-2 text-sm">
                      Location
                    </h3>
                    <div className="space-y-2">
                      {/* City Filter */}
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full px-2 py-1.5 text-xs border border-border-gray rounded-card focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      >
                        <option value="all">All Cities</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>

                      {/* Neighborhood Filter - only show if city is selected */}
                      {selectedCity !== "all" && (
                        <select
                          value={selectedNeighborhood}
                          onChange={(e) => setSelectedNeighborhood(e.target.value)}
                          className="w-full px-2 py-1.5 text-xs border border-border-gray rounded-card focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        >
                          <option value="all">All Neighborhoods</option>
                          {neighborhoods[selectedCity]?.map((neighborhood) => (
                            <option key={neighborhood} value={neighborhood}>
                              {neighborhood}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>

                  {/* Availability Filter */}
                  <div>
                    <h3 className="font-semibold text-text-primary mb-2 text-sm">
                      Availability
                    </h3>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showOnlyAvailable}
                        onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                        className="w-4 h-4 rounded border-border-gray text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                      />
                      <span className="text-text-secondary text-xs">
                        Show only available
                      </span>
                    </label>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold text-text-primary mb-2 text-sm">
                      Price Range
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-secondary">Min</span>
                        <span className="font-medium">
                          Ksh {priceRange[0].toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="20000"
                        step="500"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([parseInt(e.target.value), priceRange[1]])
                        }
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-secondary">Max</span>
                        <span className="font-medium">
                          Ksh {priceRange[1].toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="20000"
                        step="500"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], parseInt(e.target.value)])
                        }
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* House Type */}
                  <div>
                    <h3 className="font-semibold text-text-primary mb-2 text-sm">
                      House Type
                    </h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="all"
                          checked={selectedType === "all"}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-4 h-4 text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                        />
                        <span className="text-text-secondary text-xs">All Types</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="Bedsitter"
                          checked={selectedType === "Bedsitter"}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-4 h-4 text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                        />
                        <span className="text-text-secondary text-xs">Bedsitter</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="1 Bedroom"
                          checked={selectedType === "1 Bedroom"}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-4 h-4 text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                        />
                        <span className="text-text-secondary text-xs">1 Bedroom</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="2 Bedroom"
                          checked={selectedType === "2 Bedroom"}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-4 h-4 text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                        />
                        <span className="text-text-secondary text-xs">2 Bedroom</span>
                      </label>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={() => {
                      setPriceRange([0, 20000]);
                      setSelectedType("all");
                      setSelectedCity("all");
                      setSelectedNeighborhood("all");
                      setShowOnlyAvailable(true);
                    }}
                    className="w-full text-primary-blue hover:text-primary-blue-hover font-medium text-xs transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
                </div>
              </aside>

              {/* Results */}
              <div className="lg:col-span-9">
                {loading ? (
                  <div className="text-center py-16">
                    <div className="text-4xl mb-4">⏳</div>
                    <p className="text-text-secondary">Loading properties...</p>
                  </div>
                ) : filteredProperties.length > 0 ? (
                  <>
                    <ScrollReveal>
                      <div className="grid gap-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                        {currentProperties.map((property) => (
                        <PropertyCardGrid
                          key={property.id}
                          id={property.id}
                          title={property.title}
                          price={property.price}
                          location={property.city}
                          neighborhood={property.neighborhood}
                          type={property.type}
                          bedrooms={property.bedrooms}
                          bathroom={property.bathroom}
                          images={property.images || []}
                          available={property.available}
                          whatsappNumber={property.whatsapp_number}
                          phoneVerified={property.phone_verified}
                          idVerified={property.id_verified}
                          addressVerified={property.address_verified}
                          rentalkeVisited={property.rentalke_visited}
                          isDemo={false}
                          averageRating={property.average_rating}
                          totalRatings={property.total_ratings}
                        />
                      ))}
                    </div>
                  </ScrollReveal>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex flex-col items-center gap-4">
                      {/* Page info */}
                      <p className="text-sm text-text-secondary">
                        Page {currentPage} of {totalPages}
                      </p>

                      {/* Pagination controls */}
                      <div className="flex items-center gap-2">
                        {/* Previous button */}
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-3 py-2 border border-border-gray rounded-card text-sm font-medium hover:bg-bg-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ← Previous
                        </button>

                        {/* Page numbers */}
                        <div className="flex gap-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                            // Show first page, last page, current page, and pages around current
                            const showPage =
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 && page <= currentPage + 1);

                            const showEllipsis =
                              (page === currentPage - 2 && currentPage > 3) ||
                              (page === currentPage + 2 && currentPage < totalPages - 2);

                            if (showEllipsis) {
                              return <span key={page} className="px-2 text-text-secondary">...</span>;
                            }

                            if (!showPage) return null;

                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-2 rounded-card text-sm font-medium transition-colors ${
                                  page === currentPage
                                    ? 'bg-primary-blue text-white'
                                    : 'border border-border-gray hover:bg-bg-light'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          })}
                        </div>

                        {/* Next button */}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-3 py-2 border border-border-gray rounded-card text-sm font-medium hover:bg-bg-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  )}
                  </>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🏠</div>
                    <h3 className="text-2xl font-semibold mb-2">
                      No homes found
                    </h3>
                    <p className="text-text-secondary mb-6">
                      Try adjusting your filters to see more results
                    </p>
                    <button
                      onClick={() => {
                        setPriceRange([0, 20000]);
                        setSelectedType("all");
                        setSelectedCity("all");
                        setSelectedNeighborhood("all");
                        setShowOnlyAvailable(true);
                      }}
                      className="btn-primary"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filter Modal - Bottom Sheet */}
        {showFilterModal && (
          <>
            {/* Backdrop */}
            <div
              className={`lg:hidden fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isFilterAnimating ? 'opacity-100' : 'opacity-0'}`}
              onClick={closeFilterModal}
            ></div>

            {/* Bottom Sheet */}
            <div className={`lg:hidden fixed bottom-0 left-0 right-0 h-[75vh] z-50 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out ${isFilterAnimating ? 'translate-y-0' : 'translate-y-full'}`}>
              {/* Modal Header */}
              <div className="sticky top-0 bg-white rounded-t-3xl border-b border-border-gray px-4 py-3 flex items-center justify-between">
                <h2 className="text-base font-semibold">Filters</h2>
                <button
                  onClick={closeFilterModal}
                  className="p-1.5 hover:bg-bg-light rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="overflow-y-auto h-[calc(75vh-110px)] px-4 py-3">
                <div className="space-y-4">
                  {/* Location Filter */}
                  <div>
                    <h3 className="font-medium text-text-primary mb-2 text-sm">
                      Location
                    </h3>
                    <div className="space-y-2">
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-border-gray rounded-card focus:outline-none focus:ring-2 focus:ring-primary-blue"
                      >
                        <option value="all">All Cities</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>

                      {selectedCity !== "all" && (
                        <select
                          value={selectedNeighborhood}
                          onChange={(e) => setSelectedNeighborhood(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-border-gray rounded-card focus:outline-none focus:ring-2 focus:ring-primary-blue"
                        >
                          <option value="all">All Neighborhoods</option>
                          {neighborhoods[selectedCity]?.map((neighborhood) => (
                            <option key={neighborhood} value={neighborhood}>
                              {neighborhood}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>

                  {/* Availability Filter */}
                  <div>
                    <h3 className="font-medium text-text-primary mb-2 text-sm">
                      Availability
                    </h3>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showOnlyAvailable}
                        onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                        className="w-4 h-4 rounded border-border-gray text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                      />
                      <span className="text-text-secondary text-sm">
                        Show only available
                      </span>
                    </label>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium text-text-primary mb-2 text-sm">
                      Price Range
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-secondary">Min</span>
                        <span className="font-medium">
                          Ksh {priceRange[0].toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="20000"
                        step="500"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([parseInt(e.target.value), priceRange[1]])
                        }
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-secondary">Max</span>
                        <span className="font-medium">
                          Ksh {priceRange[1].toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="20000"
                        step="500"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], parseInt(e.target.value)])
                        }
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* House Type */}
                  <div>
                    <h3 className="font-medium text-text-primary mb-2 text-sm">
                      House Type
                    </h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="all"
                          checked={selectedType === "all"}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-4 h-4 text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                        />
                        <span className="text-text-secondary text-sm">All Types</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="Bedsitter"
                          checked={selectedType === "Bedsitter"}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-4 h-4 text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                        />
                        <span className="text-text-secondary text-sm">Bedsitter</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="1 Bedroom"
                          checked={selectedType === "1 Bedroom"}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-4 h-4 text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                        />
                        <span className="text-text-secondary text-sm">1 Bedroom</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="2 Bedroom"
                          checked={selectedType === "2 Bedroom"}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-4 h-4 text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                        />
                        <span className="text-text-secondary text-sm">2 Bedroom</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer - Sticky at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-border-gray px-4 py-3 flex gap-2">
                <button
                  onClick={() => {
                    setPriceRange([0, 20000]);
                    setSelectedType("all");
                    setSelectedCity("all");
                    setSelectedNeighborhood("all");
                    setShowOnlyAvailable(true);
                  }}
                  className="flex-1 px-3 py-2.5 text-sm border border-border-gray text-text-primary rounded-card font-medium hover:bg-bg-light transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={closeFilterModal}
                  className="flex-1 px-3 py-2.5 text-sm bg-primary-blue text-white rounded-card font-medium hover:bg-primary-blue-hover transition-colors"
                >
                  Show {filteredProperties.length} homes
                </button>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
