"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-border-gray sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/rentalke-logo.png"
              alt="RentalKE"
              width={180}
              height={50}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {pathname !== "/" && (
              <Link
                href="/"
                className="text-primary-blue hover:text-primary-blue-hover transition-colors"
              >
                Home
              </Link>
            )}
            <Link
              href="/search"
              className={`transition-colors ${
                pathname === "/search"
                  ? "text-primary-blue font-black"
                  : "text-primary-blue hover:text-primary-blue-hover"
              }`}
            >
              Find a Home
            </Link>
            <Link
              href="/contact"
              className={`transition-colors ${
                pathname === "/contact"
                  ? "text-primary-blue font-black"
                  : "text-primary-blue hover:text-primary-blue-hover"
              }`}
            >
              Contact
            </Link>
            <Link
              href="/landlords"
              className={`transition-colors ${
                pathname === "/landlords"
                  ? "text-primary-blue font-black"
                  : "text-primary-blue hover:text-primary-blue-hover"
              }`}
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
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-text-secondary relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <span className="sr-only">Toggle menu</span>
              {/* Hamburger Icon */}
              <div className="relative w-6 h-5">
                <span
                  className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? "top-2 rotate-45" : "top-0 rotate-0"
                  }`}
                ></span>
                <span
                  className={`absolute left-0 top-2 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? "top-2 -rotate-45" : "top-4 rotate-0"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container-custom py-4 space-y-4 border-t border-border-gray">
          {pathname !== "/" && (
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center py-3 text-primary-blue hover:text-primary-blue-hover hover:bg-bg-light rounded-card transition-colors"
            >
              Home
            </Link>
          )}
          <Link
            href="/search"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-center py-3 rounded-card transition-colors ${
              pathname === "/search"
                ? "text-primary-blue font-black bg-bg-light"
                : "text-primary-blue hover:text-primary-blue-hover hover:bg-bg-light"
            }`}
          >
            Find a Home
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-center py-3 rounded-card transition-colors ${
              pathname === "/contact"
                ? "text-primary-blue font-black bg-bg-light"
                : "text-primary-blue hover:text-primary-blue-hover hover:bg-bg-light"
            }`}
          >
            Contact
          </Link>
          <Link
            href="/landlords"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center btn-primary w-full"
          >
            List Your House
          </Link>
        </nav>
      </div>
    </header>
  );
}
