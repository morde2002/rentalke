import Image from "next/image";
import Link from "next/link";
import type { SaleListing } from "@/types/real-estate";

export default function SaleListingCard({
  listing,
}: {
  listing: SaleListing;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-border-gray bg-white">
      <Link
        href={`/real-estate/listings/${listing.slug}`}
        className="group relative block aspect-[4/3] bg-bg-light"
        aria-label={`View ${listing.title}`}
      >
        {listing.images[0] ? (
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-text-secondary">
            🏠
          </div>
        )}
        {listing.images.length > 1 && (
          <span className="absolute bottom-2 right-2 rounded-full bg-black/65 px-2 py-1 text-xs font-medium text-white">
            {listing.images.length} photos
          </span>
        )}
        <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-primary-blue">
          For sale
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-sm font-bold text-text-primary sm:text-base">
          KSh {listing.price.toLocaleString("en-KE")}
        </p>
        <Link
          href={`/real-estate/listings/${listing.slug}`}
          className="mt-1 line-clamp-2 text-sm font-semibold text-text-primary hover:text-primary-blue sm:text-base"
        >
          {listing.title}
        </Link>
        <p className="mt-1 line-clamp-1 text-xs text-text-secondary sm:text-sm">
          {listing.neighborhood}, {listing.city}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-text-secondary">
          <span>{listing.bedrooms} bedrooms</span>
          {listing.bathrooms !== null && <span>{listing.bathrooms} bathrooms</span>}
          {listing.furnished && <span>Furnished</span>}
        </div>

        <Link
          href={`/real-estate/listings/${listing.slug}`}
          className="mt-auto inline-flex min-h-9 items-center justify-center rounded-card border border-primary-blue px-3 py-2 text-xs font-semibold text-primary-blue transition-colors hover:bg-primary-blue hover:text-white sm:mt-4"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
