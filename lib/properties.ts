// Database queries for properties

import { supabase } from './supabase';
import type { PropertyFilters, PublicProperty } from '@/types/database';

const PUBLIC_PROPERTY_COLUMNS = [
  'id',
  'created_at',
  'updated_at',
  'title',
  'description',
  'city',
  'neighborhood',
  'type',
  'bedrooms',
  'bathroom',
  'price',
  'price_min',
  'price_max',
  'deposit',
  'water_included',
  'electricity_cost',
  'available',
  'images',
  'video_url',
  'features',
  'nearby_places',
  'additional_info',
  'google_maps_url',
  'phone_verified',
  'id_verified',
  'address_verified',
  'rentalke_visited',
  'verified_at',
  'payment_method',
  'paybill_number',
  'till_number',
  'business_name',
  'water_source',
  'water_payment',
  'electricity_type',
  'electricity_payment',
  'security_type',
  'security_details',
  'average_rating',
  'total_ratings',
].join(',');

// Simple in-memory cache
const cache: {
  properties: PublicProperty[] | null;
  timestamp: number | null;
} = {
  properties: null,
  timestamp: null,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Clear the properties cache (call after admin updates)
 */
export function clearPropertiesCache() {
  cache.properties = null;
  cache.timestamp = null;
}

/**
 * Get all properties with optional filters
 */
export async function getProperties(filters?: PropertyFilters): Promise<PublicProperty[]> {
  // Use cache if available and not expired (only for unfiltered requests)
  const now = Date.now();
  if (!filters && cache.properties && cache.timestamp && (now - cache.timestamp) < CACHE_DURATION) {
    return cache.properties;
  }
  let query = supabase
    .from('properties')
    .select(PUBLIC_PROPERTY_COLUMNS)
    .order('created_at', { ascending: false });

  // Apply filters
  if (filters?.city) {
    query = query.ilike('city', `%${filters.city}%`);
  }

  if (filters?.neighborhood) {
    query = query.ilike('neighborhood', `%${filters.neighborhood}%`);
  }

  if (filters?.type && filters.type !== 'all') {
    query = query.eq('type', filters.type);
  }

  if (filters?.minPrice !== undefined) {
    query = query.gte('price', filters.minPrice);
  }

  if (filters?.maxPrice !== undefined) {
    query = query.lte('price', filters.maxPrice);
  }

  if (filters?.available !== undefined) {
    query = query.eq('available', filters.available);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching properties:', error);
    return [];
  }

  // Update cache for unfiltered requests
  if (!filters && data) {
    cache.properties = data;
    cache.timestamp = Date.now();
  }

  return data || [];
}

/**
 * Get a single property by ID
 */
export async function getPropertyById(id: string): Promise<PublicProperty | null> {
  const { data, error } = await supabase
    .from('properties')
    .select(PUBLIC_PROPERTY_COLUMNS)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching property:', error);
    return null;
  }

  return data;
}

/**
 * Get available properties count
 */
export async function getAvailablePropertiesCount(): Promise<number> {
  const { count, error } = await supabase
    .from('properties')
    .select('id', { count: 'exact', head: true })
    .eq('available', true);

  if (error) {
    console.error('Error counting properties:', error);
    return 0;
  }

  return count || 0;
}

/**
 * Search properties by text (searches title, description, city, neighborhood)
 */
export async function searchProperties(searchText: string): Promise<PublicProperty[]> {
  const { data, error } = await supabase
    .from('properties')
    .select(PUBLIC_PROPERTY_COLUMNS)
    .textSearch('search_vector', searchText)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching properties:', error);
    return [];
  }

  return data || [];
}
