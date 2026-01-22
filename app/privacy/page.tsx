import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <ScrollReveal>
                <h1 className="text-3xl md:text-4xl font-semibold mb-6">Privacy Policy</h1>
                <p className="text-sm text-text-secondary mb-8">Last updated: January 2026</p>
              </ScrollReveal>

              <div className="space-y-8 text-text-secondary">
                <ScrollReveal delay={100}>
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">1. Information We Collect</h2>
                    <p className="leading-relaxed mb-4">
                      We collect minimal information necessary to operate RentalKE:
                    </p>
                    <p className="leading-relaxed font-semibold text-text-primary mb-2">For Landlords:</p>
                    <ul className="space-y-2 ml-6 mb-4">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Name, phone number, and WhatsApp number</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>National ID details (for verification)</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Property details and photos</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Proof of ownership documents</span>
                      </li>
                    </ul>
                    <p className="leading-relaxed font-semibold text-text-primary mb-2">For Tenants:</p>
                    <ul className="space-y-2 ml-6">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>No personal information is collected - you contact landlords directly</span>
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={150}>
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">2. How We Use Your Information</h2>
                    <p className="leading-relaxed mb-3">
                      We use the information we collect to:
                    </p>
                    <ul className="space-y-2 ml-6">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Verify landlord identities to prevent fraud</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Display property listings on our platform</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Facilitate contact between landlords and tenants</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Improve our service and user experience</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Communicate with you about your listings</span>
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">3. Information Sharing</h2>
                    <p className="leading-relaxed mb-3">
                      We display the following information publicly on our platform:
                    </p>
                    <ul className="space-y-2 ml-6 mb-4">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Landlord name and contact numbers (for tenant inquiries)</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Property details, photos, and location (neighborhood level only)</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Verification status badges</span>
                      </li>
                    </ul>
                    <p className="leading-relaxed bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <strong className="text-text-primary">We NEVER share:</strong> National ID numbers, proof of ownership documents, or exact property addresses publicly. These are kept private for verification purposes only.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={250}>
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">4. Data Security</h2>
                    <p className="leading-relaxed">
                      We store all data securely using Supabase (a secure, encrypted database service). Sensitive verification documents are stored privately and are not accessible publicly.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={300}>
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">5. Cookies and Tracking</h2>
                    <p className="leading-relaxed">
                      We do not use cookies or tracking technologies. We do not collect browsing data or user analytics at this time.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={350}>
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">6. Your Rights</h2>
                    <p className="leading-relaxed mb-3">
                      You have the right to:
                    </p>
                    <ul className="space-y-2 ml-6">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Request removal of your listing at any time</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Update your contact information</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Request deletion of your personal data</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Ask what information we have about you</span>
                      </li>
                    </ul>
                    <p className="leading-relaxed mt-4">
                      To exercise these rights, contact us via WhatsApp, email, or phone (details below).
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={400}>
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">7. Third-Party Services</h2>
                    <p className="leading-relaxed">
                      We use the following third-party services:
                    </p>
                    <ul className="space-y-2 ml-6 mt-3">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span><strong>Supabase:</strong> Database and hosting (secure, encrypted)</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span><strong>Vercel:</strong> Website hosting</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span><strong>WhatsApp:</strong> Communication between users (we don't control WhatsApp's privacy)</span>
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={450}>
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">8. Children's Privacy</h2>
                    <p className="leading-relaxed">
                      RentalKE is not intended for users under 18 years old. We do not knowingly collect information from children.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={500}>
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">9. Changes to Privacy Policy</h2>
                    <p className="leading-relaxed">
                      We may update this policy from time to time. Changes will be posted on this page with an updated date.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={550}>
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">10. Contact Us</h2>
                    <p className="leading-relaxed">
                      Questions about your privacy or this policy? Contact us:
                    </p>
                    <ul className="space-y-2 mt-3">
                      <li>Email: <a href="mailto:rentalke@gmail.com" className="text-primary-blue hover:underline">rentalke@gmail.com</a></li>
                      <li>Phone: <a href="tel:+254115588218" className="text-primary-blue hover:underline">+254 115 588 218</a></li>
                      <li>WhatsApp: <a href="https://wa.me/254115588218" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">Message Us</a></li>
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={600}>
                  <div className="pt-8 border-t border-border-gray text-center">
                    <Link href="/" className="text-primary-blue hover:underline font-medium">
                      ← Back to Home
                    </Link>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
