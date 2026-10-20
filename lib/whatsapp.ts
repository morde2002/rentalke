export const RENTALKE_WHATSAPP_NUMBER = "254115588218";

export function getPropertyInquiryUrl(property: {
  id: string;
  title: string;
  type: string;
  neighborhood: string;
  city: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rentalke.com";
  const propertyUrl = `${siteUrl.replace(/\/$/, "")}/homes/${property.id}`;
  const message = [
    "Hi, I'm interested in this RentalKE listing:",
    property.title,
    `${property.type} in ${property.neighborhood}, ${property.city}`,
    propertyUrl,
    "Please share the exact rent and landlord's contact details.",
  ].join("\n");

  return `https://wa.me/${RENTALKE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
