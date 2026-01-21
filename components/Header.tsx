import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-border-gray sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-semibold text-text-primary">
              RentalKE
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/search"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Find a Home
            </Link>
            <Link
              href="/landlords"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              List Your House
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Link href="/landlords" className="btn-primary hidden md:block">
              List Your House
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-text-secondary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
