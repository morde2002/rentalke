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
  // Verification fields
  phone_verified?: boolean;
  id_verified?: boolean;
  address_verified?: boolean;
  rentalke_visited?: boolean;
  verified_at?: string | null;
  verified_by?: string | null;
  // Private landlord details (not displayed publicly)
  landlord_id_number?: string | null;
  landlord_alt_phone?: string | null;
  landlord_physical_address?: string | null;
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
