"use client";

import { useEffect, useState, use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Spinner from "@/components/Spinner";
import SafetyTips from "@/components/SafetyTips";
import VerificationBadges from "@/components/VerificationBadges";
import PropertyHighlights from "@/components/PropertyHighlights";
import StarRating from "@/components/StarRating";
import Link from "next/link";
import { getPropertyById } from "@/lib/properties";
import type { Property } from "@/types/database";

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWhatsAppLoading, setIsWhatsAppLoading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    if (property?.images) {
      setLightboxIndex(prev => prev === 0 ? property.images.length - 1 : prev - 1);
    }
  };

  const goToNext = () => {
    if (property?.images) {
      setLightboxIndex(prev => prev === property.images.length - 1 ? 0 : prev + 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, property?.images]);

  useEffect(() => {
    async function loadProperty() {
      setLoading(true);
      const data = await getPropertyById(id);
      setProperty(data);
      setLoading(false);
    }

    loadProperty();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white">
          <div className="container-custom section-padding">
            <div className="text-center py-16">
              <div className="text-4xl mb-4">⏳</div>
              <p className="text-text-secondary">Loading property...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!property) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white">
          <div className="container-custom section-padding">
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-semibold mb-2">Property not found</h3>
              <p className="text-text-secondary mb-6">
                This property doesn't exist or has been removed
              </p>
              <Link href="/search" className="btn-primary">
                Back to Search
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Generate structured data for SEO (Schema.org JSON-LD)
  const generateStructuredData = () => {
    if (!property) return null;

    return {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": property.title,
      "description": property.description || `${property.type} for rent in ${property.neighborhood}, ${property.city}`,
      "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://rentalke.vercel.app'}/homes/${property.id}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": property.neighborhood,
        "addressRegion": property.city,
        "addressCountry": "KE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "addressCountry": "KE"
      },
      "offers": {
        "@type": "Offer",
        "price": property.price,
        "priceCurrency": "KES",
        "availability": property.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": property.price,
          "priceCurrency": "KES",
          "unitText": "MONTH"
        }
      },
      "numberOfRooms": property.bedrooms,
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": property.type
      },
      "image": property.images && property.images.length > 0 ? property.images : undefined,
      "aggregateRating": property.average_rating ? {
        "@type": "AggregateRating",
        "ratingValue": property.average_rating,
        "reviewCount": property.total_ratings || 0,
        "bestRating": "5",
        "worstRating": "1"
      } : undefined
    };
  };

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      {property && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData())
          }}
        />
      )}

      <Header />
      <main className="min-h-screen bg-white">
        {/* Back Button */}
        <section className="bg-white pt-6 pb-4">
          <div className="container-custom">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to search results
            </Link>
          </div>
        </section>

        {/* Property Details */}
        <section className="pb-16">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              {/* Images Grid and Video */}
              <div className="mb-8">
                {property.video_url ? (
                  /* Layout with video: Video left, Images right */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Video Section - Narrower column */}
                    <div className="lg:col-span-5">
                      <h2 className="text-lg font-semibold mb-3">Video Tour</h2>
                      <div className="relative aspect-[9/16] max-h-[500px] bg-bg-light rounded-[20px] overflow-hidden mx-auto">
                        {property.video_url.includes('youtube.com') || property.video_url.includes('youtu.be') ? (
                          <iframe
                            src={(() => {
                              const videoId = property.video_url.includes('youtu.be')
                                ? property.video_url.split('youtu.be/')[1]?.split('?')[0]
                                : property.video_url.split('v=')[1]?.split('&')[0];
                              return `https://www.youtube.com/embed/${videoId}`;
                            })()}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            src={property.video_url}
                            controls
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                    </div>

                    {/* Images Grid - Wider column with 2x2 grid */}
                    <div className="lg:col-span-7">
                      <h2 className="text-lg font-semibold mb-3">
                        Photos ({property.images?.length || 0})
                      </h2>
                      {property.images && property.images.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3 max-h-[500px] h-[500px]">
                          {property.images.slice(0, 4).map((image, index) => (
                            <button
                              key={index}
                              onClick={() => openLightbox(index)}
                              className="relative bg-bg-light rounded-[12px] overflow-hidden cursor-pointer group hover:opacity-90 transition-opacity h-full"
                            >
                              <img
                                src={image}
                                alt={`${property.title} - Photo ${index + 1}`}
                                className="w-full h-full object-contain"
                              />
                              {/* Hover overlay */}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <svg
                                  className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                </svg>
                              </div>
                              {/* Show "+X more" on 4th image if there are more */}
                              {index === 3 && property.images.length > 4 && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                  <span className="text-white text-2xl font-semibold">
                                    +{property.images.length - 4} more
                                  </span>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="relative aspect-square bg-bg-light rounded-[20px] flex items-center justify-center">
                          <span className="text-6xl">🏠</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Layout without video: Full-width images grid */
                  <div>
                    <h2 className="text-xl font-semibold mb-3">
                      Property Photos ({property.images?.length || 0})
                    </h2>
                    {property.images && property.images.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {property.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => openLightbox(index)}
                            className="relative aspect-square bg-bg-light rounded-[12px] overflow-hidden cursor-pointer group hover:opacity-90 transition-opacity"
                          >
                            <img
                              src={image}
                              alt={`${property.title} - Photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="relative aspect-video bg-bg-light rounded-[20px] flex items-center justify-center">
                        <span className="text-8xl">🏠</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Lightbox Overlay */}
              {lightboxOpen && property.images && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
                  {/* Close button */}
                  <button
                    onClick={closeLightbox}
                    className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                    aria-label="Close"
                  >
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Image counter */}
                  <div className="absolute top-4 left-4 text-white text-lg font-medium z-10">
                    {lightboxIndex + 1} / {property.images.length}
                  </div>

                  {/* Previous button */}
                  {property.images.length > 1 && (
                    <button
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2 z-10"
                      aria-label="Previous image"
                    >
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}

                  {/* Main image */}
                  <div className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
                    <img
                      src={property.images[lightboxIndex]}
                      alt={`${property.title} - Photo ${lightboxIndex + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {/* Next button */}
                  {property.images.length > 1 && (
                    <button
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2 z-10"
                      aria-label="Next image"
                    >
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}

                  {/* Thumbnail strip at bottom */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-5xl w-full px-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
                      {property.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setLightboxIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                            index === lightboxIndex
                              ? 'border-white scale-110'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8">
                  <ScrollReveal>
                    <div className="space-y-8">
                  {/* Title and Price */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                          {property.title}
                        </h1>
                        <p className="text-xl text-text-secondary mb-3">
                          {property.neighborhood}, {property.city}
                        </p>
                        {/* Star Rating */}
                        {property.average_rating !== null && property.average_rating !== undefined && (
                          <div className="mb-3">
                            <StarRating
                              rating={property.average_rating}
                              totalRatings={property.total_ratings || 0}
                              size="lg"
                              showCount={true}
                            />
                          </div>
                        )}
                        <VerificationBadges
                          phoneVerified={property.phone_verified}
                          idVerified={property.id_verified}
                          addressVerified={property.address_verified}
                          rentalkeVisited={property.rentalke_visited}
                        />
                      </div>
                      {property.available ? (
                        <span className="badge-available">
                          <span className="w-2 h-2 bg-status-available rounded-full"></span>
                          Available
                        </span>
                      ) : (
                        <span className="badge-occupied">
                          <span className="w-2 h-2 bg-status-occupied rounded-full"></span>
                          Occupied
                        </span>
                      )}
                    </div>
                    <p className="text-4xl font-semibold text-text-primary">
                      Ksh {property.price.toLocaleString()}
                      <span className="text-xl text-text-secondary font-normal">
                        /month
                      </span>
                    </p>
                  </div>

                  {/* About This Home */}
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">
                      About This Home
                    </h2>
                    <p className="text-text-secondary leading-relaxed">
                      {property.description}
                    </p>
                  </div>

                  {/* Property Highlights */}
                  <PropertyHighlights
                    paymentMethod={property.payment_method}
                    paybillNumber={property.paybill_number}
                    tillNumber={property.till_number}
                    businessName={property.business_name}
                    waterSource={property.water_source}
                    waterPayment={property.water_payment}
                    electricityType={property.electricity_type}
                    electricityPayment={property.electricity_payment}
                    securityType={property.security_type}
                    securityDetails={property.security_details}
                  />

                  {/* Details */}
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Details</h2>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-text-secondary min-w-[140px]">
                          Type:
                        </span>
                        <span className="text-text-primary font-medium">
                          {property.type}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-text-secondary min-w-[140px]">
                          Bedrooms:
                        </span>
                        <span className="text-text-primary font-medium">
                          {property.bedrooms}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-text-secondary min-w-[140px]">
                          Bathroom:
                        </span>
                        <span className="text-text-primary font-medium">
                          {property.bathroom}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-text-secondary min-w-[140px]">
                          Water:
                        </span>
                        <span className="text-text-primary font-medium">
                          {property.water_included
                            ? "Included in rent"
                            : "Pay separately"}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-text-secondary min-w-[140px]">
                          Electricity:
                        </span>
                        <span className="text-text-primary font-medium">
                          {property.electricity_cost || "Pay separately"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  {property.features && property.features.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-semibold mb-4">Features</h2>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {property.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-status-available flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-text-secondary">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* What's Nearby */}
                  {property.nearby_places && property.nearby_places.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-semibold mb-4">
                        What's Nearby
                      </h2>
                      <ul className="space-y-2">
                        {property.nearby_places.map((place, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary-blue mt-1">•</span>
                            <span className="text-text-secondary">{place}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                    </div>
                  </ScrollReveal>
                </div>

                {/* Contact Sidebar */}
                <div className="lg:col-span-4">
                  <ScrollReveal delay={100}>
                  <div className="bg-white border border-border-gray rounded-card p-6 sticky top-24 space-y-4">
                    <h3 className="text-xl font-semibold">
                      Ready to See This Home?
                    </h3>

                    {property.available ? (
                      <>
                        <p className="text-text-secondary text-sm">
                          Contact the landlord directly to schedule a viewing
                        </p>

                        {property.whatsapp_number && (
                          <button
                            onClick={() => {
                              if (!isWhatsAppLoading) {
                                setIsWhatsAppLoading(true);
                                window.open(
                                  `https://wa.me/${property.whatsapp_number}?text=Hi, I'm interested in the ${property.type} in ${property.neighborhood} for Ksh ${property.price.toLocaleString()}/month. Can I schedule a viewing?`,
                                  "_blank"
                                );
                                setTimeout(() => setIsWhatsAppLoading(false), 1000);
                              }
                            }}
                            disabled={isWhatsAppLoading}
                            className="btn-whatsapp w-full disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {isWhatsAppLoading ? (
                              <Spinner size="sm" color="white" />
                            ) : (
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                              </svg>
                            )}
                            Message on WhatsApp
                          </button>
                        )}

                        <div className="text-center text-sm text-text-secondary my-2">
                          or call
                        </div>

                        <a
                          href={`tel:${property.landlord_phone}`}
                          className="btn-secondary w-full text-center block"
                        >
                          <span className="truncate">{property.landlord_phone}</span>
                        </a>

                        <div className="pt-4 border-t border-border-gray">
                          <div className="flex items-center gap-2 text-sm text-text-secondary">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Landlord usually replies in 1 hour</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-text-secondary mb-4">
                          This home is currently occupied
                        </p>
                        <Link href="/search" className="btn-primary w-full text-center">
                          Find Other Homes
                        </Link>
                      </div>
                    )}
                  </div>
                  </ScrollReveal>

                  {/* Safety Tips */}
                  <ScrollReveal delay={200}>
                    <div className="mt-6">
                      <SafetyTips />
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
