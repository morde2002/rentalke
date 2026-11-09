"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { SaleListing } from "@/types/real-estate";

function getWhatsAppUrl(listing: SaleListing) {
  const phone = listing.contact_phone.replace(/\D/g, "");
  const message = `Hi, I'm interested in ${listing.title} in ${listing.neighborhood}, ${listing.city}. Please share more details.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function SaleListingDetails({
  listing,
}: {
  listing: SaleListing;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowLeft") {
        setLightboxIndex((index) =>
          index === null
            ? null
            : index === 0
              ? listing.images.length - 1
              : index - 1,
        );
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((index) =>
          index === null
            ? null
            : index === listing.images.length - 1
              ? 0
              : index + 1,
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, listing.images.length]);

  return (
    <main className="min-h-screen bg-white">
      <section className="pb-4 pt-6">
        <div className="container-custom">
          <Link
            href="/real-estate"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            <span aria-hidden="true">←</span>
            Back to properties for sale
          </Link>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-custom">
          <div className="mb-5">
            <p className="text-sm font-semibold text-primary-blue">
              {listing.property_type} for sale
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-text-primary sm:text-3xl">
              {listing.title}
            </h1>
            <p className="mt-2 text-sm text-text-secondary">
              {listing.neighborhood}, {listing.city}
            </p>
          </div>

          {listing.images.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-[20px] sm:gap-3 lg:grid-cols-4">
              {listing.images.slice(0, 5).map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className={`group relative aspect-square overflow-hidden bg-bg-light ${
                    index === 0
                      ? "col-span-2 aspect-[16/10] lg:row-span-2 lg:aspect-auto lg:min-h-[500px]"
                      : ""
                  }`}
                  aria-label={`View photo ${index + 1} of ${listing.title}`}
                >
                  <Image
                    src={image}
                    alt={`${listing.title} - Photo ${index + 1}`}
                    fill
                    sizes={
                      index === 0
                        ? "(max-width: 640px) 100vw, 50vw"
                        : "(max-width: 640px) 50vw, 25vw"
                    }
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    priority={index === 0}
                  />
                  {index === 4 && listing.images.length > 5 && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-lg font-semibold text-white">
                      +{listing.images.length - 5} more
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-[20px] bg-bg-light text-6xl">
              🏠
            </div>
          )}

          {listing.video_url && (
            <section className="mt-8">
              <h2 className="mb-3 text-xl font-semibold text-text-primary">Video Tour</h2>
              <video
                src={listing.video_url}
                controls
                playsInline
                preload="metadata"
                className="max-h-[600px] w-full rounded-[20px] bg-black object-contain"
                aria-label={`Video tour of ${listing.title}`}
              />
            </section>
          )}

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-8">
              <section>
                <h2 className="text-xl font-semibold text-text-primary">About this property</h2>
                <p className="mt-3 whitespace-pre-line leading-7 text-text-secondary">
                  {listing.description}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-text-primary">Property Details</h2>
                <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="border-b border-border-gray pb-3">
                    <dt className="text-sm text-text-secondary">Price</dt>
                    <dd className="mt-1 font-semibold text-text-primary">
                      KSh {listing.price.toLocaleString("en-KE")}
                    </dd>
                  </div>
                  <div className="border-b border-border-gray pb-3">
                    <dt className="text-sm text-text-secondary">Property Type</dt>
                    <dd className="mt-1 font-semibold text-text-primary">
                      {listing.property_type}
                    </dd>
                  </div>
                  <div className="border-b border-border-gray pb-3">
                    <dt className="text-sm text-text-secondary">Bedrooms</dt>
                    <dd className="mt-1 font-semibold text-text-primary">
                      {listing.bedrooms}
                    </dd>
                  </div>
                  <div className="border-b border-border-gray pb-3">
                    <dt className="text-sm text-text-secondary">Bathrooms</dt>
                    <dd className="mt-1 font-semibold text-text-primary">
                      {listing.bathrooms ?? "Not specified"}
                    </dd>
                  </div>
                  <div className="border-b border-border-gray pb-3">
                    <dt className="text-sm text-text-secondary">Furnishing</dt>
                    <dd className="mt-1 font-semibold text-text-primary">
                      {listing.furnished ? "Fully furnished" : "Not furnished"}
                    </dd>
                  </div>
                  {listing.land_area_details && (
                    <div className="border-b border-border-gray pb-3">
                      <dt className="text-sm text-text-secondary">Land Size</dt>
                      <dd className="mt-1 font-semibold text-text-primary">
                        {listing.land_area_details}
                      </dd>
                    </div>
                  )}
                </dl>
              </section>

              {listing.features.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-text-primary">Features</h2>
                  <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {listing.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-text-secondary">
                        <span className="text-status-available" aria-hidden="true">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {listing.google_maps_url && (
                <section>
                  <h2 className="text-xl font-semibold text-text-primary">Location</h2>
                  <p className="mt-2 text-text-secondary">
                    {listing.neighborhood}, {listing.city}
                  </p>
                  <a
                    href={listing.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 font-medium text-primary-blue hover:underline"
                  >
                    Open location in Google Maps
                  </a>
                </section>
              )}
            </div>

            <aside className="lg:col-span-4">
              <div className="space-y-4 rounded-card border border-border-gray bg-white p-5 lg:sticky lg:top-24">
                <div>
                  <p className="text-sm text-text-secondary">Asking Price</p>
                  <p className="mt-1 text-2xl font-bold text-text-primary">
                    KSh {listing.price.toLocaleString("en-KE")}
                  </p>
                </div>
                <p className="text-sm leading-6 text-text-secondary">
                  Contact us to ask questions or arrange a viewing.
                </p>
                <a
                  href={`tel:${listing.contact_phone}`}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-border-gray px-5 py-3 text-sm font-semibold text-text-primary hover:bg-bg-light"
                >
                  Call seller
                </a>
                <a
                  href={getWhatsAppUrl(listing)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#20BA5A]"
                >
                  Contact on WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && listing.images.length > 0 && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Property photo viewer"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 z-10 rounded-full p-2 text-3xl text-white hover:bg-white/10"
            aria-label="Close photo viewer"
          >
            ×
          </button>
          <span className="absolute left-4 top-5 text-sm text-white">
            {lightboxIndex + 1} / {listing.images.length}
          </span>
          {listing.images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxIndex(
                  lightboxIndex === 0 ? listing.images.length - 1 : lightboxIndex - 1,
                );
              }}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 p-2 text-4xl text-white"
              aria-label="Previous photo"
            >
              ‹
            </button>
          )}
          <div
            className="relative h-[80vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={listing.images[lightboxIndex]}
              alt={`${listing.title} - Photo ${lightboxIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          {listing.images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxIndex(
                  lightboxIndex === listing.images.length - 1 ? 0 : lightboxIndex + 1,
                );
              }}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 p-2 text-4xl text-white"
              aria-label="Next photo"
            >
              ›
            </button>
          )}
        </div>
      )}
    </main>
  );
}
