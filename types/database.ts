// Database types for RentalKE

export interface Property {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string | null;
  city: string;
  neighborhood: string;
  type: string;
  bedrooms: string;
  bathroom: string;
  price: number;
  deposit: number | null;
  water_included: boolean;
  electricity_cost: string | null;
  available: boolean;
  landlord_name: string;
  landlord_phone: string;
  whatsapp_number: string | null;
  images: string[];
  features: string[];
  nearby_places: string[];
}

export interface PropertyInsert {
  title: string;
  description?: string;
  city: string;
  neighborhood: string;
  type: string;
  bedrooms: string;
  bathroom: string;
  price: number;
  deposit?: number;
  water_included?: boolean;
  electricity_cost?: string;
  available?: boolean;
  landlord_name: string;
  landlord_phone: string;
  whatsapp_number?: string;
  images?: string[];
  features?: string[];
  nearby_places?: string[];
}

export interface PropertyFilters {
  city?: string;
  neighborhood?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
}
