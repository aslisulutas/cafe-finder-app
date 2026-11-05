import { Search, X } from 'lucide-react';
import { AMENITIES, type AmenityKey } from '@/lib/amenities';
import { EMPTY_FILTERS, type CafeFilters } from '@/lib/cafeFilters';

const PRICE_OPTIONS = [
  { value: 1, label: '$' },
  { value: 2, label: '$$' },
  { value: 3, label: '$$$' },
  { value: 4, label: '$$$$' },
];

interface SearchFiltersProps {
  filters: CafeFilters;
  onChange: (next: CafeFilters) => void;
  resultCount: number;
  totalCount: number;
}

export default function SearchFilters({ filters, onChange, resultCount, totalCount }: SearchFiltersProps) {
  const hasActiveFilters =
    filters.query.trim() !== '' || filters.amenities.length > 0 || filters.maxPrice !== null;

  const toggleAmenity = (key: AmenityKey) => {
    const amenities = filters.amenities.includes(key)
      ? filters.amenities.filter((a) => a !== key)
      : [...filters.amenities, key];
    onChange({ ...filters, amenities });
  };

  return (
    <div className="rounded-2xl border border-primary-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-400" />
        <input
          type="search"
          value={filters.query}
          onChange={(e) => onChange({ ...filters, query: e.target.value })}
          placeholder="Search by name, neighborhood, or vibe"
          aria-label="Search cafes"
          className="w-full rounded-xl border border-primary-200 bg-primary-50/50 py-3 pl-12 pr-4 text-primary-900 placeholder:text-primary-400 transition focus:border-accent-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent-100"
        />
      </div>

      <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-500">Amenities</span>
          <div className="flex flex-wrap gap-2">
            {AMENITIES.map(({ key, label, icon: Icon }) => {
              const active = filters.amenities.includes(key);
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleAmenity(key)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95 ${
                    active
                      ? 'border-primary-800 bg-primary-800 text-primary-50'
                      : 'border-primary-200 bg-white text-primary-700 hover:border-primary-400 hover:bg-primary-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-500">Price</span>
          <div className="inline-flex rounded-full border border-primary-200 bg-primary-50/60 p-1">
            <button
              type="button"
              aria-pressed={filters.maxPrice === null}
              onClick={() => onChange({ ...filters, maxPrice: null })}
              className={`rounded-full px-3.5 py-1 text-sm font-medium transition-all duration-200 ${
                filters.maxPrice === null ? 'bg-white text-primary-900 shadow-sm' : 'text-primary-600 hover:text-primary-900'
              }`}
            >
              Any
            </button>
            {PRICE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={filters.maxPrice === option.value}
                onClick={() => onChange({ ...filters, maxPrice: option.value })}
                className={`rounded-full px-3.5 py-1 text-sm font-medium transition-all duration-200 ${
                  filters.maxPrice === option.value
                    ? 'bg-white text-primary-900 shadow-sm'
                    : 'text-primary-600 hover:text-primary-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-primary-100 pt-4 text-sm">
        <p className="text-primary-600" aria-live="polite">
          Showing <span className="font-semibold text-primary-900">{resultCount}</span> of {totalCount} cafes
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => onChange(EMPTY_FILTERS)}
            className="inline-flex items-center gap-1 font-medium text-accent-600 transition-colors hover:text-primary-800"
          >
            <X className="h-4 w-4" />
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
