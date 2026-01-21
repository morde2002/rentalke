// Database queries for properties

import { supabase } from './supabase';
import type { Property, PropertyFilters } from '@/types/database';

// Simple in-memory cache
const cache: {
  properties: Property[] | null;
  timestamp: number | null;
} = {
  properties: null,
  timestamp: null,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get all properties with optional filters
 */
export async function getProperties(filters?: PropertyFilters): Promise<Property[]> {
  // Use cache if available and not expired (only for unfiltered requests)
  const now = Date.now();
  if (!filters && cache.properties && cache.timestamp && (now - cache.timestamp) < CACHE_DURATION) {
    return cache.properties;
  }
  let query = supabase
    .from('properties')
    .select('*')
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
export async function getPropertyById(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
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
    .select('*', { count: 'exact', head: true })
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
export async function searchProperties(searchText: string): Promise<Property[]> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .textSearch('search_vector', searchText)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching properties:', error);
    return [];
  }

  return data || [];
}
