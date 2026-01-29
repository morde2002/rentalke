"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console (you can replace with error tracking service later)
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Icon */}
          <div className="text-8xl mb-6">⚠️</div>

          {/* Error Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Something Went Wrong
          </h1>
          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            We encountered an unexpected error. Don't worry, our team has been notified and we're working on a fix.
          </p>

          {/* Error Details (for development) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mb-8 p-4 bg-bg-light rounded-card text-left">
              <p className="text-sm font-mono text-text-secondary break-words">
                {error.message}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={reset}
              className="btn-primary w-full sm:w-auto"
            >
              Try Again
            </button>
            <Link href="/" className="btn-secondary w-full sm:w-auto">
              Go to Homepage
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-border-gray">
            <p className="text-sm text-text-secondary mb-4">
              Or continue browsing:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link href="/search" className="text-primary-blue hover:text-primary-blue-hover transition-colors">
                Find a Home
              </Link>
              <Link href="/landlords" className="text-primary-blue hover:text-primary-blue-hover transition-colors">
                List Your Property
              </Link>
              <Link href="/contact" className="text-primary-blue hover:text-primary-blue-hover transition-colors">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
