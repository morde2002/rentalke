"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoBanner from "@/components/DemoBanner";
import ScrollReveal from "@/components/ScrollReveal";
import PropertyCardGrid from "@/components/PropertyCardGrid";
import { getProperties } from "@/lib/properties";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo";
import type { Property } from "@/types/database";
import Link from "next/link";

// Available locations - will be expanded later with database
const availableLocations = [
  { city: "Mombasa", neighborhoods: ["Vijiweni", "Likoni", "Bamburi", "Nyali", "Changamwe"] },
  { city: "Nairobi", neighborhoods: ["Kasarani", "Umoja", "Kahawa", "Ruaka", "Kitengela"] },
  { city: "Kisumu", neighborhoods: ["Kondele", "Nyalenda", "Migosi", "Mamboleo"] },
];

// Logo colors for branding
// Primary: #513bf3 (main purple)
// Secondary: #7C5EF7 (light purple for accents)

export default function HomePage() {
  const router = useRouter();
  const [searchLocation, setSearchLocation] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load featured properties
  useEffect(() => {
    async function loadFeatured() {
      setLoadingProperties(true);
      const properties = await getProperties({ available: true });
      // Get first 3 available properties
      setFeaturedProperties(properties.slice(0, 3));
      setLoadingProperties(false);
    }
    loadFeatured();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setSearchLocation(value);

    if (value.trim().length > 0) {
      // Filter locations based on input
      const filtered: string[] = [];

      availableLocations.forEach((location) => {
        // Check if city matches
        if (location.city.toLowerCase().includes(value.toLowerCase())) {
          filtered.push(location.city);
        }

        // Check if any neighborhood matches
        location.neighborhoods.forEach((neighborhood) => {
          if (neighborhood.toLowerCase().includes(value.toLowerCase())) {
            filtered.push(`${neighborhood}, ${location.city}`);
          }
        });
      });

      setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
      setShowDropdown(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchLocation(suggestion);
    setShowDropdown(false);
    router.push("/search");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to search page immediately
    router.push("/search");
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema())
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebsiteSchema())
          }}
        />
      </Head>

      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="section-padding bg-white">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center space-y-8">
              {/* Main Headline */}
              <h1 className="text-4xl md:text-6xl font-semibold text-text-primary leading-tight">
                Find Your Next Home <br className="hidden sm:inline" />in Minutes
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto">
                Affordable rentals in Kenya. Direct connections. Real listings. Simple search.
              </p>

              {/* Search Box */}
              <div className="mt-12 max-w-2xl mx-auto relative" ref={dropdownRef}>
              {/* Desktop Search - Horizontal Layout */}
              <form onSubmit={handleSearch} className="hidden sm:flex bg-white rounded-button shadow-lg p-2 gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => {
                      if (suggestions.length > 0) setShowDropdown(true);
                    }}
                    placeholder="Where do you want to live? (e.g., Mombasa, Nairobi)"
                    className="w-full px-6 py-4 text-lg border-none focus:outline-none rounded-button"
                  />

                  {/* Dropdown Suggestions */}
                  {showDropdown && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border-gray rounded-button shadow-xl z-50 overflow-hidden">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full px-6 py-3 text-left hover:bg-bg-light transition-colors text-text-primary"
                        >
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{suggestion}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Show Me Homes
                </button>
              </form>

              {/* Mobile Search - Vertical Layout */}
              <form onSubmit={handleSearch} className="sm:hidden space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => {
                      if (suggestions.length > 0) setShowDropdown(true);
                    }}
                    placeholder="Where do you want to live?"
                    className="w-full px-6 py-4 text-lg border-none focus:outline-none rounded-button bg-white shadow-lg"
                  />

                  {/* Dropdown Suggestions */}
                  {showDropdown && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border-gray rounded-button shadow-xl z-50 overflow-hidden">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full px-6 py-3 text-left hover:bg-bg-light transition-colors text-text-primary"
                        >
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{suggestion}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button type="submit" className="btn-primary w-full">
                  Show Me Homes
                </button>
              </form>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-text-secondary mt-8">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-status-available" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Real photos</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-status-available" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Real prices</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-status-available" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Updated daily</span>
              </div>
            </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="section-padding bg-bg-light">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Available Now in Mombasa
              </h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-3">
                Real homes, real prices, real availability. Updated daily.
              </p>
              <p className="text-base text-blue-600 font-semibold">
                Sample listings shown • Actively partnering with landlords
              </p>
            </div>
          </ScrollReveal>

          {loadingProperties ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
              <p className="text-text-secondary mt-4">Loading properties...</p>
            </div>
          ) : featuredProperties.length > 0 ? (
            <>
              <ScrollReveal delay={100}>
                <div className={`grid gap-6 mb-8 ${
                  featuredProperties.length === 1
                    ? "grid-cols-1 max-w-md mx-auto"
                    : featuredProperties.length === 2
                    ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
                    : "grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto"
                }`}>
                  {featuredProperties.map((property) => (
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
                      isDemo={true}
                      averageRating={property.average_rating}
                      totalRatings={property.total_ratings}
                    />
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="flex justify-center">
                  <Link href="/search" className="btn-primary">
                    View All Properties
                  </Link>
                </div>
              </ScrollReveal>
            </>
          ) : null}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">
              How It Works
            </h2>
            <p className="text-xl text-text-secondary text-center mb-16 max-w-2xl mx-auto">
              Finding your next home is simple. Connect directly with landlords and move in faster.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Step 1 */}
            <ScrollReveal delay={100}>
              <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary-blue text-white rounded-full flex items-center justify-center font-semibold text-2xl">
                1
              </div>
              <h3 className="text-xl font-semibold">Search Your Area</h3>
              <p className="text-text-secondary">
                Enter your preferred location - Mombasa, Nairobi, Kisumu, or anywhere in Kenya. Filter by price and house type.
              </p>
              </div>
            </ScrollReveal>

            {/* Step 2 */}
            <ScrollReveal delay={200}>
              <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary-blue text-white rounded-full flex items-center justify-center font-semibold text-2xl">
                2
              </div>
              <h3 className="text-xl font-semibold">View Real Listings</h3>
              <p className="text-text-secondary">
                Browse verified properties with real photos, actual prices, and accurate availability status updated daily.
              </p>
              </div>
            </ScrollReveal>

            {/* Step 3 */}
            <ScrollReveal delay={300}>
              <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary-blue text-white rounded-full flex items-center justify-center font-semibold text-2xl">
                3
              </div>
              <h3 className="text-xl font-semibold">Contact Directly</h3>
              <p className="text-text-secondary">
                Message landlords instantly via WhatsApp or call them directly. Schedule viewings and move in faster.
              </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Choose RentalKE */}
      <section className="section-padding bg-bg-light">
        <div className="container-custom">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">
              Why Choose RentalKE?
            </h2>
            <p className="text-xl text-text-secondary text-center mb-16 max-w-2xl mx-auto">
              We're making rental housing accessible and transparent for everyone in Kenya.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <ScrollReveal delay={100}>
              <div className="bg-white p-6 rounded-card border border-border-gray">
                <h3 className="text-lg font-semibold mb-3">Direct Contact</h3>
                <p className="text-text-secondary text-sm">
                  Connect directly with landlords via WhatsApp or phone. Simple, fast, and personal.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="bg-white p-6 rounded-card border border-border-gray">
                <h3 className="text-lg font-semibold mb-3">Real-Time Updates</h3>
                <p className="text-text-secondary text-sm">
                  See only available properties. No more wasting time on houses that are already taken.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-white p-6 rounded-card border border-border-gray">
                <h3 className="text-lg font-semibold mb-3">Verified Listings</h3>
                <p className="text-text-secondary text-sm">
                  All properties are verified with real photos and accurate information. No fake listings.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <div className="bg-white p-6 rounded-card border border-border-gray">
                <h3 className="text-lg font-semibold mb-3">Affordable Options</h3>
                <p className="text-text-secondary text-sm">
                  Find bedsitters, 1-bedrooms, and 2-bedrooms that fit your budget. Prices you can trust.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Rent Safely Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                  Rent Safely in Kenya
                </h2>
                <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                  Know the signs of a real rental listing and protect yourself from scammers
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Safe Payment Methods */}
                <ScrollReveal delay={100}>
                  <div className="bg-green-50 border-2 border-green-200 rounded-card p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="text-3xl">✅</div>
                      <div>
                        <h3 className="text-xl font-semibold text-green-800 mb-2">
                          Safe Payment Signs
                        </h3>
                        <p className="text-sm text-gray-700 mb-4">
                          Look for these trusted payment methods:
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span><strong>Paybill Number</strong> - Registered business (safest)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span><strong>Till Number</strong> - Verified merchant account</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span><strong>Tip:</strong> Send Ksh 1 first to verify the business name</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>Check M-Pesa confirmation shows correct landlord</span>
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>

                {/* Warning Signs */}
                <ScrollReveal delay={200}>
                  <div className="bg-red-50 border-2 border-red-200 rounded-card p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="text-3xl">⚠️</div>
                      <div>
                        <h3 className="text-xl font-semibold text-red-800 mb-2">
                          Warning Signs
                        </h3>
                        <p className="text-sm text-gray-700 mb-4">
                          Be cautious if you encounter:
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Send Money</strong> requests (personal M-Pesa)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span><strong>Pochi la Biashara</strong> without verification</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Asking for deposit <strong>before viewing</strong></span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-red-600 font-bold">•</span>
                        <span>Prices unrealistic for the area (too cheap)</span>
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>

                {/* What to Check */}
                <ScrollReveal delay={300}>
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-card p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="text-3xl">🔍</div>
                      <div>
                        <h3 className="text-xl font-semibold text-blue-800 mb-2">
                          What to Check During Viewing
                        </h3>
                      </div>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span><strong>Water:</strong> Piped to house (not jerricans)</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span><strong>Electricity:</strong> Check the meter/token system</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span><strong>Security:</strong> Gated compound or open access?</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>Meet at the <strong>actual property</strong> location</span>
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>

                {/* Our Commitment */}
                <ScrollReveal delay={400}>
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-card p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="text-3xl">🛡️</div>
                      <div>
                        <h3 className="text-xl font-semibold text-purple-800 mb-2">
                          Our Verification Process
                        </h3>
                      </div>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span>We verify landlord phone numbers</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span>Our team physically visits properties</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span>We confirm property addresses</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span>Look for verification badges on listings</span>
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>
              </div>

              {/* Report Section */}
              <ScrollReveal delay={500}>
                <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-card p-6 text-center">
                  <p className="text-gray-800">
                    <span className="font-semibold text-lg">🚨 Suspicious listing or scam attempt?</span>
                    <br />
                    <a
                      href="https://wa.me/254115588218?text=I want to report a suspicious listing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-blue hover:underline font-semibold text-lg mt-2 inline-block"
                    >
                      Report it immediately on WhatsApp
                    </a>
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* For Landlords CTA */}
      <section className="section-padding bg-primary-blue text-white">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold">
                Do You Have a House to Rent?
              </h2>
              <p className="text-xl opacity-90">
                List it here for FREE. Get tenants faster.
              </p>
              <Link href="/landlords" className="inline-block bg-white text-primary-blue px-8 py-4 rounded-button font-medium text-lg hover:bg-gray-100 transition-colors">
                List My House (It's Free)
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </main>
    <Footer />
    </>
  );
}
