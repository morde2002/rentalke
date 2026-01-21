"use client";

import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({ children, delay = 0, className = "" }: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let timeoutId: NodeJS.Timeout;

    // Create intersection observer with bidirectional animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is entering viewport - fade in
            if (delay > 0) {
              timeoutId = setTimeout(() => {
                element.classList.add("scroll-reveal-visible");
              }, delay);
            } else {
              element.classList.add("scroll-reveal-visible");
            }
          } else {
            // Element is leaving viewport - fade out
            if (timeoutId) clearTimeout(timeoutId);
            element.classList.remove("scroll-reveal-visible");
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "-60px 0px -60px 0px", // Create buffer zones at top and bottom
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [delay]);

  return (
    <div ref={elementRef} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  );
}
