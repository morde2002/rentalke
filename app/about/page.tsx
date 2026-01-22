import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-12 md:pt-16 pb-8 md:pb-12 bg-bg-light">
          <div className="container-custom">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6">
                <h1 className="text-3xl md:text-5xl font-semibold">
                  About RentalKE
                </h1>
                <p className="text-lg md:text-xl text-text-secondary">
                  Making affordable housing accessible to everyone in Kenya
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto space-y-8">
              <ScrollReveal>
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Mission</h2>
                  <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                    RentalKE was born from a simple observation: finding affordable rental housing in Kenya is unnecessarily complicated.
                    Between dealing with agents, paying commissions, and not knowing if listings are real, the process is frustrating for both
                    tenants and landlords.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4">What We Do</h2>
                  <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-4">
                    We connect landlords directly with tenants - no middlemen, no commissions, no stress. Every property on RentalKE is:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <svg className="w-6 h-6 text-status-available flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <span className="font-semibold">Personally Verified</span>
                        <p className="text-text-secondary">We call every landlord and verify their identity before listing</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <svg className="w-6 h-6 text-status-available flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <span className="font-semibold">Physically Inspected</span>
                        <p className="text-text-secondary">Our team in Mombasa visits properties to confirm they exist and match the description</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <svg className="w-6 h-6 text-status-available flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <span className="font-semibold">100% Free to Use</span>
                        <p className="text-text-secondary">No listing fees, no commissions, no hidden charges - ever</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Commitment to Transparency</h2>
                  <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-4">
                    We believe in complete honesty. That's why:
                  </p>
                  <ul className="space-y-2 text-text-secondary">
                    <li className="flex gap-2">
                      <span className="text-primary-blue">•</span>
                      <span>We clearly mark demo listings during our launch phase</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary-blue">•</span>
                      <span>We show verification badges so you know what we've checked</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary-blue">•</span>
                      <span>We provide safety tips to help you avoid scams</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary-blue">•</span>
                      <span>We respond quickly to reports of suspicious listings</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4">Where We Are</h2>
                  <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                    We're based in Mombasa, Kenya, starting with properties in the coastal region. Our goal is to expand across Kenya,
                    making quality, affordable housing accessible to everyone.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="bg-primary-blue text-white rounded-[20px] p-8 md:p-12 text-center">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                    Join Us
                  </h2>
                  <p className="text-lg mb-6 opacity-90">
                    Whether you're a landlord with properties to list or a tenant searching for a home,
                    we're here to help - for free.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/search"
                      className="inline-block bg-white text-primary-blue px-6 py-3 rounded-button text-base font-medium hover:bg-gray-100 transition-colors"
                    >
                      Find a Home
                    </Link>
                    <a
                      href="https://wa.me/254115588218?text=Hi, I want to list my property on RentalKE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-white text-primary-blue px-6 py-3 rounded-button text-base font-medium hover:bg-gray-100 transition-colors"
                    >
                      List Your Property
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <div className="border-t border-border-gray pt-8">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4">Get in Touch</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-text-secondary">
                    <div>
                      <p className="font-semibold text-text-primary mb-1">Email</p>
                      <a href="mailto:info.rentalke@gmail.com" className="text-primary-blue hover:underline">
                        info.rentalke@gmail.com
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary mb-1">Phone</p>
                      <a href="tel:+254115588218" className="text-primary-blue hover:underline">
                        +254 115 588 218
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary mb-1">WhatsApp</p>
                      <a href="https://wa.me/254115588218" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">
                        Message Us
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary mb-1">Location</p>
                      <p>Mombasa, Kenya</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
