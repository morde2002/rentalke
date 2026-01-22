import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import VerificationBadges from "./VerificationBadges";

interface PropertyCardGridProps {
  id: string;
  title: string;
  price: number;
  location: string;
  neighborhood: string;
  type: string;
  bedrooms: string;
  bathroom: string;
  images: string[];
  available: boolean;
  whatsappNumber?: string | null;
  phoneVerified?: boolean;
  idVerified?: boolean;
  addressVerified?: boolean;
  rentalkeVisited?: boolean;
  isDemo?: boolean;
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
  images,
  available,
  whatsappNumber,
  phoneVerified,
  idVerified,
  addressVerified,
  rentalkeVisited,
  isDemo = false,
}: PropertyCardGridProps) {
  const [isWhatsAppLoading, setIsWhatsAppLoading] = useState(false);
  const [isViewLoading, setIsViewLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (whatsappNumber && !isWhatsAppLoading) {
      setIsWhatsAppLoading(true);
      const cleanNumber = whatsappNumber.replace(/\D/g, "");
      const message = encodeURIComponent(`Hi, I'm interested in: ${title}`);
      window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
      // Reset loading after a short delay
      setTimeout(() => setIsWhatsAppLoading(false), 1000);
    }
  };

  // Auto-slide effect for property cards
  useEffect(() => {
    if (!images || images.length <= 1) return; // Don't auto-slide if only one image or no images

    const interval = setInterval(() => {
      goToNextImage();
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, [currentImageIndex, images]);

  const goToNextImage = () => {
    if (isTransitioning || !images || images.length === 0) return;
    const nextIdx = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setNextImageIndex(nextIdx);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(nextIdx);
      setIsTransitioning(false);
    }, 1000); // Increased to 1000ms for smoother transition
  };

  const goToImage = (index: number) => {
    if (isTransitioning || index === currentImageIndex || !images || images.length === 0) return;
    setNextImageIndex(index);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsTransitioning(false);
    }, 1000); // Increased to 1000ms for smoother transition
  };

  return (
    <div className="bg-white border border-border-gray rounded-[20px] overflow-hidden property-card h-full flex flex-col">
        {/* Image Carousel Preview */}
        <div className="relative aspect-[4/3] bg-bg-light group">
          {images && images.length > 0 ? (
            <>
              {/* Render all images with crossfade transitions */}
              {images.map((image, index) => {
                const isCurrent = index === currentImageIndex;
                const isNext = index === nextImageIndex && isTransitioning;

                if (!isCurrent && !isNext) return null;

                return (
                  <Image
                    key={`image-${index}`}
                    src={image}
                    alt={`${title} - Image ${index + 1}`}
                    fill
                    className={`object-cover absolute inset-0 transition-opacity duration-[1000ms] ease-in-out ${
                      isCurrent && isTransitioning
                        ? 'opacity-0'
                        : isCurrent
                        ? 'opacity-100'
                        : isNext
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                );
              })}
              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs transition-all duration-500">
                  {(isTransitioning ? nextImageIndex : currentImageIndex) + 1} / {images.length}
                </div>
              )}
              {/* Dot Indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        goToImage(index);
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-[1000ms] ease-in-out ${
                        index === (isTransitioning ? nextImageIndex : currentImageIndex)
                          ? "bg-white w-6"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-text-secondary">
              <span className="text-4xl">🏠</span>
            </div>
          )}
          {/* Demo Badge */}
          {isDemo && (
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
              DEMO
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

          {/* Verification Badges */}
          <div className="mb-3">
            <VerificationBadges
              phoneVerified={phoneVerified}
              idVerified={idVerified}
              addressVerified={addressVerified}
              rentalkeVisited={rentalkeVisited}
              size="sm"
            />
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-3 text-xs text-text-secondary mb-4">
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

          {/* Action Buttons */}
          <div className="space-y-2 mt-auto">
            <Link
              href={`/homes/${id}`}
              onClick={() => setIsViewLoading(true)}
              className="flex items-center justify-center gap-2 text-center px-4 py-2.5 border-2 border-primary-blue text-primary-blue rounded-card text-sm font-medium hover:bg-primary-blue hover:text-white transition-colors"
            >
              {isViewLoading && <Spinner size="sm" color="currentColor" />}
              View Details
            </Link>
            <button
              onClick={handleWhatsApp}
              disabled={isWhatsAppLoading}
              className="w-full px-4 py-2.5 bg-[#25D366] text-white rounded-card text-sm font-medium hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isWhatsAppLoading ? (
                <Spinner size="sm" color="white" />
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              )}
              Message Landlord
            </button>
          </div>
        </div>
      </div>
  );
}
