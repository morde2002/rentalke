import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

export default function LandlordsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-semibold">
                List Your House for FREE
              </h1>
              <p className="text-xl text-text-secondary">
                Get your house in front of hundreds of tenants looking for homes in Kenya
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding border-t border-border-gray">
          <div className="container-custom">
            <ScrollReveal>
              <h2 className="text-3xl font-semibold text-center mb-12">
                How It Works for Landlords
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <ScrollReveal delay={100}>
                <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">📸</span>
                </div>
                <div className="w-12 h-12 mx-auto bg-primary-blue text-white rounded-full flex items-center justify-center font-semibold text-xl">
                  1
                </div>
                <h3 className="text-xl font-semibold">Take Photos</h3>
                <p className="text-text-secondary">
                  Use your phone to take 3-5 photos of your house
                </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">✍️</span>
                </div>
                <div className="w-12 h-12 mx-auto bg-primary-blue text-white rounded-full flex items-center justify-center font-semibold text-xl">
                  2
                </div>
                <h3 className="text-xl font-semibold">Tell Us Details</h3>
                <p className="text-text-secondary">
                  How many rooms? How much rent? Easy questions
                </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary-blue/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🏠✓</span>
                </div>
                <div className="w-12 h-12 mx-auto bg-primary-blue text-white rounded-full flex items-center justify-center font-semibold text-xl">
                  3
                </div>
                <h3 className="text-xl font-semibold">Get Tenants</h3>
                <p className="text-text-secondary">
                  We send you people looking for homes
                </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding bg-bg-light">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <ScrollReveal>
                <h2 className="text-3xl font-semibold text-center mb-12">
                  Why List on RentalKE?
                </h2>
              </ScrollReveal>

              <div className="space-y-6">
                <ScrollReveal delay={100}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-status-available" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Completely Free</h3>
                      <p className="text-text-secondary">
                        No listing fees. No commission. No hidden charges.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={150}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-status-available" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Direct Contact</h3>
                      <p className="text-text-secondary">
                        Tenants contact you directly on WhatsApp or phone. No middleman.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-status-available" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Quick Setup</h3>
                      <p className="text-text-secondary">
                        List your house in 5 minutes. No complicated forms.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={250}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <svg className="w-6 h-6 text-status-available" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">More Visibility</h3>
                      <p className="text-text-secondary">
                        Reach students, comrades, and young professionals actively looking for homes.
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-custom">
            <ScrollReveal>
              <div className="max-w-2xl mx-auto bg-primary-blue text-white rounded-button p-12 text-center">
              <h2 className="text-3xl font-semibold mb-4">
                Ready to List Your House?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Coming soon! We're setting up WhatsApp integration to make listing super easy.
              </p>
              <div className="bg-white/20 rounded-button p-6">
                <p className="text-sm mb-4">
                  Want early access? Send us a message:
                </p>
                <a
                  href="https://wa.me/254712345678?text=Hi, I want to list my house on RentalKE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-primary-blue px-6 py-3 rounded-button font-medium hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Message Us on WhatsApp
                </a>
              </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
