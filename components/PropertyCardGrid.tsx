import Link from "next/link";
import Image from "next/image";

interface PropertyCardGridProps {
  id: string;
  title: string;
  price: number;
  location: string;
  neighborhood: string;
  type: string;
  bedrooms: string;
  bathroom: string;
  image: string;
  available: boolean;
}

export default function PropertyCardGrid({
  id,
  title,
  price,
  location,
  neighborhood,
  type,
  bedrooms,
  bathroom,
  image,
  available,
}: PropertyCardGridProps) {
  return (
    <Link href={`/homes/${id}`}>
      <div className="bg-white border border-border-gray rounded-card overflow-hidden property-card cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-[4/3] bg-bg-light">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-text-secondary">
              <span className="text-4xl">🏠</span>
            </div>
          )}
          {/* Availability Badge */}
          {available ? (
            <div className="absolute top-3 right-3 badge-available text-xs">
              <span className="w-1.5 h-1.5 bg-status-available rounded-full"></span>
              Available
            </div>
          ) : (
            <div className="absolute top-3 right-3 badge-occupied text-xs">
              <span className="w-1.5 h-1.5 bg-status-occupied rounded-full"></span>
              Occupied
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Price */}
          <p className="text-xl font-semibold text-text-primary mb-2">
            Ksh {price.toLocaleString()}<span className="text-sm font-normal text-text-secondary">/mo</span>
          </p>

          {/* Title */}
          <h3 className="text-base font-semibold text-text-primary mb-2 line-clamp-1 hover:text-primary-blue transition-colors">
            {title}
          </h3>

          {/* Location */}
          <p className="text-sm text-text-secondary mb-3 line-clamp-1">
            {neighborhood}, {location}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-3 text-xs text-text-secondary mt-auto">
            <div className="flex items-center gap-1">
              <span>•</span>
              <span>{type}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>•</span>
              <span>{bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>•</span>
              <span>{bathroom}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
