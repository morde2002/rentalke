"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "./LoadingScreen";

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Initial page load - hide when content is ready
  useEffect(() => {
    if (isInitialLoad) {
      // Check if document is already loaded
      if (document.readyState === "complete") {
        setIsLoading(false);
        setIsInitialLoad(false);
      } else {
        // Wait for page to fully load
        const handleLoad = () => {
          // Small delay to ensure animation plays smoothly
          setTimeout(() => {
            setIsLoading(false);
            setIsInitialLoad(false);
          }, 800);
        };

        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
      }
    }
  }, [isInitialLoad]);

  // Handle route changes - show loader briefly
  useEffect(() => {
    if (!isInitialLoad) {
      // Show loader briefly on route change
      setIsLoading(true);

      // Hide after content starts rendering (very short delay)
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [pathname, isInitialLoad]);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      {children}
    </>
  );
}
