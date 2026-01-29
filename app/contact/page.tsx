import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

export const metadata = {
  title: "Contact Us - RentalKE",
  description: "Get in touch with RentalKE. We're here to help you find your next home or list your property.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white py-16 md:py-20">
          <div className="container-custom text-center">
            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Get In Touch
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Have questions? We're here to help! Reach out to us through any of the channels below.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* Email Card */}
                <ScrollReveal>
                  <a
                    href="mailto:info.rentalke@gmail.com"
                    className="bg-white border-2 border-border-gray rounded-card p-6 text-center hover:border-primary-blue hover:shadow-lg transition-all group"
                  >
                    <div className="w-16 h-16 bg-primary-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-blue/20 transition-colors">
                      <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Email Us</h3>
                    <p className="text-text-secondary text-sm mb-3">
                      Send us an email and we'll get back to you within 24 hours
                    </p>
                    <p className="text-primary-blue font-medium break-words">
                      info.rentalke@gmail.com
                    </p>
                  </a>
                </ScrollReveal>

                {/* Phone Card */}
                <ScrollReveal delay={100}>
                  <a
                    href="tel:+254115588218"
                    className="bg-white border-2 border-border-gray rounded-card p-6 text-center hover:border-primary-blue hover:shadow-lg transition-all group"
                  >
                    <div className="w-16 h-16 bg-primary-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-blue/20 transition-colors">
                      <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">Call Us</h3>
                    <p className="text-text-secondary text-sm mb-3">
                      Give us a call Monday to Saturday, 8am - 6pm
                    </p>
                    <p className="text-primary-blue font-medium">
                      +254 115 588 218
                    </p>
                  </a>
                </ScrollReveal>

                {/* WhatsApp Card */}
                <ScrollReveal delay={200}>
                  <a
                    href="https://wa.me/254115588218"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border-2 border-border-gray rounded-card p-6 text-center hover:border-[#25D366] hover:shadow-lg transition-all group"
                  >
                    <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#25D366]/20 transition-colors">
                      <svg className="w-8 h-8 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">WhatsApp</h3>
                    <p className="text-text-secondary text-sm mb-3">
                      Message us instantly and get quick responses
                    </p>
                    <p className="text-[#25D366] font-medium">
                      Chat on WhatsApp
                    </p>
                  </a>
                </ScrollReveal>
              </div>

              {/* Office Location */}
              <ScrollReveal delay={300}>
                <div className="bg-bg-light rounded-card p-8 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="w-16 h-16 bg-primary-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-text-primary mb-2">Our Office</h3>
                      <p className="text-text-secondary mb-4">
                        Visit us at our office in Mombasa. We're happy to meet in person to discuss your housing needs.
                      </p>
                      <p className="text-text-primary font-medium">
                        Mombasa, Kenya
                      </p>
                      <p className="text-text-secondary text-sm mt-2">
                        Monday - Saturday: 8:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* FAQ Section */}
              <ScrollReveal delay={400}>
                <div className="mt-12 text-center">
                  <h2 className="text-3xl font-semibold text-text-primary mb-4">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                    Looking for quick answers? Check out our most common questions below.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    {/* FAQ Item 1 */}
                    <div className="bg-white border border-border-gray rounded-card p-6">
                      <h4 className="font-semibold text-text-primary mb-2">
                        How do I list my property?
                      </h4>
                      <p className="text-text-secondary text-sm">
                        Contact us via WhatsApp, email, or phone. We'll guide you through the listing process and get your property online quickly.
                      </p>
                    </div>

                    {/* FAQ Item 2 */}
                    <div className="bg-white border border-border-gray rounded-card p-6">
                      <h4 className="font-semibold text-text-primary mb-2">
                        Is there a fee to list properties?
                      </h4>
                      <p className="text-text-secondary text-sm">
                        Get in touch with us to discuss pricing and packages. We offer competitive rates for landlords.
                      </p>
                    </div>

                    {/* FAQ Item 3 */}
                    <div className="bg-white border border-border-gray rounded-card p-6">
                      <h4 className="font-semibold text-text-primary mb-2">
                        How do I contact landlords?
                      </h4>
                      <p className="text-text-secondary text-sm">
                        Every property listing has a WhatsApp button and phone number. Connect directly with landlords - no agents involved.
                      </p>
                    </div>

                    {/* FAQ Item 4 */}
                    <div className="bg-white border border-border-gray rounded-card p-6">
                      <h4 className="font-semibold text-text-primary mb-2">
                        What areas do you cover?
                      </h4>
                      <p className="text-text-secondary text-sm">
                        Currently, we focus on Mombasa, Nairobi, and Kisumu. We're expanding to more cities across Kenya.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* CTA Section */}
              <ScrollReveal delay={500}>
                <div className="mt-16 bg-gradient-primary text-white rounded-card p-8 md:p-12 text-center">
                  <h2 className="text-3xl font-bold mb-4">
                    Ready to Find Your Next Home?
                  </h2>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    Browse hundreds of verified rental properties across Kenya. No agents, no hassle.
                  </p>
                  <Link
                    href="/search"
                    className="btn-primary bg-white text-primary-blue hover:bg-gray-100 inline-block"
                  >
                    Browse Available Homes
                  </Link>
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
