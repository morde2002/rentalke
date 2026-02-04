"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { optimizeCloudinaryImage } from "@/lib/cloudinary";

interface ImageCarouselProps {
  images: string[];
  title: string;
  autoSlideInterval?: number; // in milliseconds, default 5000 (5 seconds)
}

export default function ImageCarousel({ images, title, autoSlideInterval = 5000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalItems = images.length;

  // Auto-slide effect
  useEffect(() => {
    if (totalItems <= 1) return; // Don't auto-slide if only one item

    const interval = setInterval(() => {
      goToNext();
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [currentIndex, totalItems, autoSlideInterval]);

  const goToPrevious = () => {
    if (isTransitioning) return;
    const prevIdx = currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
    setNextIndex(prevIdx);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prevIdx);
      setIsTransitioning(false);
    }, 800);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    const nextIdx = currentIndex === totalItems - 1 ? 0 : currentIndex + 1;
    setNextIndex(nextIdx);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(nextIdx);
      setIsTransitioning(false);
    }, 800);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setNextIndex(index);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <div className="relative aspect-[21/9] bg-bg-light rounded-[20px] overflow-hidden group">
      {/* Main Image Display */}
      <div className="relative w-full h-full">
        {/* All images rendered but only visible one shows */}
        {images.map((image, index) => {
          // For images, show both current and next during transition
          const isCurrent = index === currentIndex;
          const isNext = index === nextIndex && isTransitioning;

          if (!isCurrent && !isNext) return null;

          return (
            <Image
              key={`image-${index}`}
              src={optimizeCloudinaryImage(image, { width: 1200, quality: 'auto:good' })}
              alt={`${title} - Image ${index + 1}`}
              fill
              className={`object-contain absolute inset-0 transition-opacity duration-[800ms] ease-in-out ${
                isCurrent && isTransitioning
                  ? 'opacity-0'
                  : isCurrent
                  ? 'opacity-100'
                  : isNext
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
              priority={index === 0}
            />
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {totalItems > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-text-primary p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-text-primary p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {totalItems > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-600 ${
                index === (isTransitioning ? nextIndex : currentIndex)
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {totalItems > 1 && (
        <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm transition-all duration-300">
          {(isTransitioning ? nextIndex : currentIndex) + 1} / {totalItems}
        </div>
      )}
    </div>
  );
}
