import type { Cafe } from '@/types/cafe';
import type { AmenityKey } from '@/lib/amenities';

export interface CafeFilters {
  query: string;
  amenities: AmenityKey[];
  maxPrice: number | null;
}

export const EMPTY_FILTERS: CafeFilters = {
  query: '',
  amenities: [],
  maxPrice: null,
};

export function filterCafes(cafes: Cafe[], filters: CafeFilters): Cafe[] {
  const term = filters.query.trim().toLowerCase();

  return cafes.filter((cafe) => {
    if (term) {
      const haystack = `${cafe.name} ${cafe.neighborhood} ${cafe.description}`.toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    if (filters.maxPrice !== null && cafe.priceLevel > filters.maxPrice) return false;
    return filters.amenities.every((key) => cafe[key]);
  });
}
