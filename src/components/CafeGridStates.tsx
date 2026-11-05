import { AlertTriangle, RefreshCw, SearchX, Coffee } from 'lucide-react';

export function CafeGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading cafes">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-primary-100 bg-white">
          <div className="aspect-[4/3] animate-pulse bg-primary-100" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-2/3 animate-pulse rounded-full bg-primary-100" />
            <div className="h-4 w-1/3 animate-pulse rounded-full bg-primary-100" />
            <div className="h-4 w-full animate-pulse rounded-full bg-primary-50" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface StatePanelProps {
  onAction: () => void;
}

export function CafeLoadError({ onAction }: StatePanelProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-error-50 bg-white px-6 py-16 text-center shadow-sm">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-error-50 text-error-700">
        <AlertTriangle className="h-7 w-7" />
      </span>
      <div className="space-y-1">
        <h3 className="font-display text-xl font-bold text-primary-900">We couldn't load the cafes</h3>
        <p className="text-primary-600">Check your connection and try again.</p>
      </div>
      <button
        type="button"
        onClick={onAction}
        className="inline-flex items-center gap-2 rounded-full bg-primary-800 px-5 py-2.5 font-medium text-primary-50 transition-colors hover:bg-primary-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-200"
      >
        <RefreshCw className="h-4 w-4" />
        Try again
      </button>
    </div>
  );
}

export function CafeNoResults({ onAction }: StatePanelProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-primary-100 bg-white px-6 py-16 text-center shadow-sm">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-700">
        <SearchX className="h-7 w-7" />
      </span>
      <div className="space-y-1">
        <h3 className="font-display text-xl font-bold text-primary-900">No cafes match those filters</h3>
        <p className="text-primary-600">Try removing an amenity or widening your search.</p>
      </div>
      <button
        type="button"
        onClick={onAction}
        className="inline-flex items-center gap-2 rounded-full border border-primary-200 px-5 py-2.5 font-medium text-primary-800 transition-colors hover:bg-primary-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-200"
      >
        <Coffee className="h-4 w-4" />
        Show all cafes
      </button>
    </div>
  );
}
