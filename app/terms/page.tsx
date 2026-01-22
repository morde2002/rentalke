import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <ScrollReveal>
                <h1 className="text-3xl md:text-4xl font-semibold mb-6">Terms of Service</h1>
                <p className="text-sm text-text-secondary mb-8">Last updated: January 2026</p>
              </ScrollReveal>

              <div className="space-y-8 text-text-secondary">
                <ScrollReveal delay={100}>
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">1. About RentalKE</h2>
                    <p className="leading-relaxed">
                      RentalKE is a FREE platform that connects landlords with tenants in Kenya. We do NOT handle payments, rentals agreements, or property management. We simply provide a listing service to help people find homes.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={150}>
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">2. Use of Service</h2>
                    <p className="leading-relaxed mb-3">
                      By using RentalKE, you agree to:
                    </p>
                    <ul className="space-y-2 ml-6">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Provide accurate and truthful information</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Not use the platform for fraudulent purposes</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Respect other users and communicate professionally</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Not post false or misleading property listings</span>
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">3. Landlord Responsibilities</h2>
                    <p className="leading-relaxed mb-3">
                      If you list a property on RentalKE, you agree to:
                    </p>
                    <ul className="space-y-2 ml-6">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Provide accurate photos and descriptions of your property</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Verify your identity when requested by RentalKE</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Update your listing if the property becomes unavailable</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Respond to tenant inquiries in a timely and professional manner</span>
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={250}>
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">4. Tenant Responsibilities</h2>
                    <p className="leading-relaxed mb-3">
                      If you're searching for a home on RentalKE, you agree to:
                    </p>
                    <ul className="space-y-2 ml-6">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Contact landlords only for genuine housing inquiries</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Visit properties in person before making any payments</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Communicate respectfully with landlords</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Report suspicious or fraudulent listings immediately</span>
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={300}>
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">5. No Liability</h2>
                    <p className="leading-relaxed">
                      RentalKE is a listing platform only. We are NOT responsible for:
                    </p>
                    <ul className="space-y-2 ml-6 mt-3">
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>The accuracy of property listings</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Disputes between landlords and tenants</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Property condition or safety</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Payment transactions or rental agreements</span>
                      </li>
                      <li className="flex gap-2">
                        <span>•</span>
                        <span>Loss or damages resulting from use of our platform</span>
                      </li>
                    </ul>
                    <p className="leading-relaxed mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <strong className="text-text-primary">Important:</strong> Always verify properties and landlords independently. Never send money before viewing a property in person.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={350}>
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">6. Content Removal</h2>
                    <p className="leading-relaxed">
                      We reserve the right to remove any listing or user from our platform if we suspect fraud, misrepresentation, or violation of these terms.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={400}>
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">7. Changes to Terms</h2>
                    <p className="leading-relaxed">
                      We may update these terms from time to time. Continued use of RentalKE means you accept any changes.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={450}>
                  <div>
                    <h2 className="text-2xl font-semibold text-text-primary mb-4">8. Contact Us</h2>
                    <p className="leading-relaxed">
                      Questions about these terms? Contact us:
                    </p>
                    <ul className="space-y-2 mt-3">
                      <li>Email: <a href="mailto:rentalke@gmail.com" className="text-primary-blue hover:underline">rentalke@gmail.com</a></li>
                      <li>Phone: <a href="tel:+254115588218" className="text-primary-blue hover:underline">+254 115 588 218</a></li>
                      <li>WhatsApp: <a href="https://wa.me/254115588218" target="_blank" rel="noopener noreferrer" className="text-primary-blue hover:underline">Message Us</a></li>
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={500}>
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
