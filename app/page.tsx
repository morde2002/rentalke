"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
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
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-semibold text-text-primary">
              Find Your Next Home in Minutes
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto">
              Affordable rentals in Kenya. No agents. No stress. Just simple.
            </p>

            {/* Search Box */}
            <div className="mt-12 max-w-2xl mx-auto relative" ref={dropdownRef}>
              <form onSubmit={handleSearch} className="bg-white rounded-button shadow-lg p-2 flex flex-col sm:flex-row gap-2">
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
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-16">
              How It Works
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Step 1 */}
            <ScrollReveal delay={100}>
              <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary-blue/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">🔍</span>
              </div>
              <div className="w-12 h-12 mx-auto bg-primary-blue text-white rounded-full flex items-center justify-center font-semibold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold">Search</h3>
              <p className="text-text-secondary">
                Tell us where you want to live
              </p>
              </div>
            </ScrollReveal>

            {/* Step 2 */}
            <ScrollReveal delay={200}>
              <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary-blue/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">👀</span>
              </div>
              <div className="w-12 h-12 mx-auto bg-primary-blue text-white rounded-full flex items-center justify-center font-semibold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold">Browse</h3>
              <p className="text-text-secondary">
                See photos and prices of real homes
              </p>
              </div>
            </ScrollReveal>

            {/* Step 3 */}
            <ScrollReveal delay={300}>
              <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary-blue/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">📱</span>
              </div>
              <div className="w-12 h-12 mx-auto bg-primary-blue text-white rounded-full flex items-center justify-center font-semibold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold">Contact</h3>
              <p className="text-text-secondary">
                Message the landlord directly on WhatsApp
              </p>
              </div>
            </ScrollReveal>
          </div>
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
