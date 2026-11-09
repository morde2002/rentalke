import ImageCarousel from "@/components/ImageCarousel";
import type { SaleListing } from "@/types/real-estate";

function getWhatsAppUrl(listing: SaleListing) {
  const phone = listing.contact_phone.replace(/\D/g, "");
  const message = `Hi, I'm interested in ${listing.title} in ${listing.neighborhood}, ${listing.city}. Please share more details.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function SaleListingCard({
  listing,
}: {
  listing: SaleListing;
}) {
  return (
    <article className="rounded-card border border-border-gray bg-white p-4 sm:p-6">
      {listing.images.length > 0 && (
        <ImageCarousel images={listing.images} title={listing.title} />
      )}

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <p className="text-sm font-semibold text-primary-blue">
            {listing.property_type} for sale
          </p>
          <h2 className="mt-1 text-xl font-semibold text-text-primary sm:text-2xl">
            {listing.title}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            {listing.neighborhood}, {listing.city}
          </p>
          <p className="mt-4 text-2xl font-bold text-text-primary">
            KSh {listing.price.toLocaleString("en-KE")}
          </p>
          <p className="mt-3 leading-7 text-text-secondary">
            {listing.description}
          </p>

          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-card bg-bg-light p-3">
              <dt className="text-text-secondary">Bedrooms</dt>
              <dd className="mt-1 font-semibold text-text-primary">
                {listing.bedrooms}
              </dd>
            </div>
            <div className="rounded-card bg-bg-light p-3">
              <dt className="text-text-secondary">Bathrooms</dt>
              <dd className="mt-1 font-semibold text-text-primary">
                {listing.bathrooms ?? "Not specified"}
              </dd>
            </div>
            {listing.land_area_details && (
              <div className="rounded-card bg-bg-light p-3">
                <dt className="text-text-secondary">Land size</dt>
                <dd className="mt-1 font-semibold text-text-primary">
                  {listing.land_area_details}
                </dd>
              </div>
            )}
          </dl>

          {listing.features.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {listing.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-full bg-bg-light px-3 py-1 text-sm text-text-secondary"
                >
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {listing.google_maps_url && (
            <a
              href={listing.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-sm font-medium text-primary-blue hover:underline"
            >
              Open location in Google Maps
            </a>
          )}
        </div>

        <div className="space-y-4">
          {listing.video_url && (
            <video
              className="w-full rounded-card bg-black"
              controls
              preload="metadata"
              playsInline
              src={listing.video_url}
              aria-label={`Video tour of ${listing.title}`}
            />
          )}
          <div className="flex flex-col gap-3">
            <a
              href={`tel:${listing.contact_phone}`}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border-gray px-5 py-3 text-sm font-semibold text-text-primary hover:bg-bg-light"
            >
              Call seller
            </a>
            <a
              href={getWhatsAppUrl(listing)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-blue-hover"
            >
              Contact on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
