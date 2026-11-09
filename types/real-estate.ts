export interface SaleListing {
  id: string;
  title: string;
  description: string;
  city: string;
  neighborhood: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number | null;
  price: number;
  land_area_details: string | null;
  furnished: boolean;
  features: string[];
  images: string[];
  video_url: string | null;
  google_maps_url: string | null;
  contact_phone: string;
}
