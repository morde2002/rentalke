// Price category utilities

export type PriceCategory = 'budget' | 'mid-range' | 'premium';

export interface PriceCategoryInfo {
  label: string;
  colorClass: string;
  bgClass: string;
}

/**
 * Get price category based on monthly rent
 */
export function getPriceCategory(price: number): PriceCategory {
  if (price < 7000) return 'budget';
  if (price <= 12000) return 'mid-range';
  return 'premium';
}

/**
 * Get display info for a price category
 */
export function getCategoryInfo(category: PriceCategory): PriceCategoryInfo {
  const categoryMap: Record<PriceCategory, PriceCategoryInfo> = {
    budget: {
      label: 'Budget-Friendly',
      colorClass: 'text-green-700',
      bgClass: 'bg-green-100',
    },
    'mid-range': {
      label: 'Mid-Range',
      colorClass: 'text-blue-700',
      bgClass: 'bg-blue-100',
    },
    premium: {
      label: 'Premium',
      colorClass: 'text-purple-700',
      bgClass: 'bg-purple-100',
    },
  };

  return categoryMap[category];
}

/**
 * Get category from price
 */
export function getPriceCategoryInfo(price: number): PriceCategoryInfo {
  const category = getPriceCategory(price);
  return getCategoryInfo(category);
}
