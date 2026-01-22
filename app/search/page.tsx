"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PropertyCardGrid from "@/components/PropertyCardGrid";
import { getProperties } from "@/lib/properties";
import type { Property } from "@/types/database";

export default function SearchPage() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, [priceRange, selectedType, showOnlyAvailable]);

  const filteredProperties = properties;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Search Header */}
        <section className="bg-white pt-8 pb-4">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">
              Find Your Next Home
            </h1>
            <p className="text-text-secondary">
              {filteredProperties.length} homes found in Mombasa
            </p>
          </div>
        </section>

        {/* Filters and Results */}
        <section className="pt-4 pb-8">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Filters Sidebar */}
              <aside className="lg:col-span-3 space-y-6">
                <div className="bg-white border border-border-gray rounded-card p-6 space-y-6">
                  {/* Availability Filter */}
                  <div>
                    <h3 className="font-semibold text-text-primary mb-4">
                      Availability
                    </h3>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showOnlyAvailable}
                        onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                        className="w-5 h-5 rounded border-border-gray text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                      />
                      <span className="text-text-secondary">
                        Show only available
                      </span>
                    </label>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold text-text-primary mb-4">
                      Price Range
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
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
                      <div className="flex items-center justify-between text-sm">
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
                    <h3 className="font-semibold text-text-primary mb-4">
                      House Type
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="all"
                          checked={selectedType === "all"}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-5 h-5 text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                        />
                        <span className="text-text-secondary">All Types</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="Bedsitter"
                          checked={selectedType === "Bedsitter"}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-5 h-5 text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                        />
                        <span className="text-text-secondary">Bedsitter</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="1 Bedroom"
                          checked={selectedType === "1 Bedroom"}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-5 h-5 text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                        />
                        <span className="text-text-secondary">1 Bedroom</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value="2 Bedroom"
                          checked={selectedType === "2 Bedroom"}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-5 h-5 text-primary-blue focus:ring-2 focus:ring-primary-blue cursor-pointer"
                        />
                        <span className="text-text-secondary">2 Bedroom</span>
                      </label>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={() => {
                      setPriceRange([0, 20000]);
                      setSelectedType("all");
                      setShowOnlyAvailable(true);
                    }}
                    className="w-full text-primary-blue hover:text-primary-blue-hover font-medium text-sm transition-colors"
                  >
                    Clear All Filters
                  </button>
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
                  <ScrollReveal>
                    <div className={`grid gap-6 ${
                      filteredProperties.length === 1
                        ? "grid-cols-1 max-w-md mx-auto"
                        : filteredProperties.length === 2
                        ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
                        : filteredProperties.length === 3
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    }`}>
                      {filteredProperties.map((property) => (
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
                        />
                      ))}
                    </div>
                  </ScrollReveal>
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
                        setShowOnlyAvailable(false);
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
      </main>
      <Footer />
    </>
  );
}
