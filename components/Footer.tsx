import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-text-primary text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <div className="bg-white rounded-lg p-4 inline-block mb-4">
              <Image
                src="/images/rentalkelogo.png"
                alt="RentalKE"
                width={200}
                height={56}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Find affordable rental homes in Kenya. No agents, no stress. Connect directly with landlords and find your next home in minutes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Find a Home
                </Link>
              </li>
              <li>
                <Link
                  href="/landlords"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  List Your Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@rentalke.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  info@rentalke.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/254115588218"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  WhatsApp Support
                </a>
              </li>
              <li className="text-gray-400">
                Mombasa, Kenya
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright - Centered Below */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            © 2026 RentalKE. Built by{" "}
            <a
              href="https://xeleratedtech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Xelerated Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
