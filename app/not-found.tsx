import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="container-custom py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Icon */}
            <div className="text-8xl mb-6">🏚️</div>

            {/* Error Code */}
            <h1 className="text-6xl font-bold text-primary-blue mb-4">404</h1>

            {/* Message */}
            <h2 className="text-3xl font-semibold text-text-primary mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/search" className="btn-primary w-full sm:w-auto">
                Browse Available Homes
              </Link>
              <Link href="/" className="btn-secondary w-full sm:w-auto">
                Back to Home
              </Link>
            </div>

            {/* Helpful Links */}
            <div className="mt-12 pt-8 border-t border-border-gray">
              <p className="text-sm text-text-secondary mb-4">
                Need help? Try these:
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
      <Footer />
    </>
  );
}
