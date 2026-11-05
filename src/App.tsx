import { useCallback, useMemo, useState } from 'react';
import SiteHeader from '@/components/SiteHeader';
import SearchFilters from '@/components/SearchFilters';
import CafeCard from '@/components/CafeCard';
import CafeDetailModal from '@/components/CafeDetailModal';
import { CafeGridSkeleton, CafeLoadError, CafeNoResults } from '@/components/CafeGridStates';
import { useCafes } from '@/hooks/useCafes';
import { EMPTY_FILTERS, filterCafes, type CafeFilters } from '@/lib/cafeFilters';
import type { Cafe } from '@/types/cafe';

function App() {
  const { state, retry } = useCafes();
  const [filters, setFilters] = useState<CafeFilters>(EMPTY_FILTERS);
  const [selected, setSelected] = useState<Cafe | null>(null);
  const closeDetail = useCallback(() => setSelected(null), []);

  const cafes = useMemo(() => (state.status === 'ready' ? state.cafes : []), [state]);
  const visibleCafes = useMemo(() => filterCafes(cafes, filters), [cafes, filters]);

  return (
    <div className="min-h-screen bg-primary-50/60 font-sans text-primary-900">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-12 sm:pt-16">
        <section className="mb-10 max-w-2xl sm:mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-600">Coffee, curated</p>
          <h1 className="font-display text-4xl font-bold leading-[1.15] text-primary-900 sm:text-5xl">
            Find the cup and corner that suit your day.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-primary-600">
            Browse independent cafes by neighborhood, price, and amenities, from quiet laptop spots to pet-friendly patios.
          </p>
        </section>

        {state.status === 'ready' && (
          <div className="mb-10">
            <SearchFilters
              filters={filters}
              onChange={setFilters}
              resultCount={visibleCafes.length}
              totalCount={cafes.length}
            />
          </div>
        )}

        {state.status === 'loading' && <CafeGridSkeleton />}

        {state.status === 'error' && <CafeLoadError onAction={retry} />}

        {state.status === 'ready' && visibleCafes.length === 0 && (
          <CafeNoResults onAction={() => setFilters(EMPTY_FILTERS)} />
        )}

        {state.status === 'ready' && visibleCafes.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCafes.map((cafe, index) => (
              <CafeCard key={cafe.id} cafe={cafe} index={index} onSelect={setSelected} />
            ))}
          </div>
        )}
      </main>

      {selected && <CafeDetailModal cafe={selected} onClose={closeDetail} />}
    </div>
  );
}

export default App;
