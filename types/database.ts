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
  video_url?: string | null;
  features: string[];
  nearby_places: string[];
  additional_info?: string | null;
  google_maps_url?: string | null;
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
  // Payment verification
  payment_method?: string | null; // 'paybill', 'till_number', 'send_money', 'pochi'
  paybill_number?: string | null;
  till_number?: string | null;
  business_name?: string | null;
  // Water details
  water_source?: string | null; // 'piped_to_house', 'jerricans', 'borehole'
  water_payment?: string | null; // 'included', 'separate_monthly', 'per_jerrican'
  // Electricity details
  electricity_type?: string | null; // 'tokens', 'monthly_bill', 'included'
  electricity_payment?: string | null; // 'tenant', 'landlord'
  // Security
  security_type?: string | null; // 'gated_compound', 'open_access', 'watchman', 'gate_and_watchman'
  security_details?: string | null;
  // Ratings
  average_rating?: number | null; // Average star rating (1-5)
  total_ratings?: number | null; // Total number of ratings
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
