import { useEffect } from 'react';
import { Check, Clock, MapPin, Minus, Star, X } from 'lucide-react';
import { AMENITIES } from '@/lib/amenities';
import { priceLabel } from '@/lib/format';
import type { Cafe } from '@/types/cafe';

interface CafeDetailModalProps {
  cafe: Cafe;
  onClose: () => void;
}

export default function CafeDetailModal({ cafe, onClose }: CafeDetailModalProps) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-primary-900/50 p-0 backdrop-blur-sm animate-fade-in sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cafe-detail-title"
        className="relative max-h-[92vh] w-full max-w-2xl animate-slide-up overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <div className="relative aspect-[16/9] bg-primary-100">
          <img src={cafe.imageUrl} alt={cafe.name} className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-primary-900 shadow-md transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-6 p-6 sm:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="inline-flex items-center gap-1 font-semibold text-primary-900">
                <Star className="h-4 w-4 fill-accent-500 text-accent-500" />
                {cafe.rating.toFixed(1)}
              </span>
              <span className="text-primary-300">|</span>
              <span className="font-semibold text-primary-500">{priceLabel(cafe.priceLevel)}</span>
              <span className="text-primary-300">|</span>
              <span className="flex items-center gap-1 text-primary-600">
                <Clock className="h-4 w-4" />
                Open until {cafe.openUntil}
              </span>
            </div>
            <h2 id="cafe-detail-title" className="mt-2 font-display text-3xl font-bold leading-tight text-primary-900">
              {cafe.name}
            </h2>
            <p className="mt-2 flex items-center gap-1.5 text-primary-600">
              <MapPin className="h-4 w-4 shrink-0" />
              {cafe.address}, {cafe.neighborhood}
            </p>
          </div>

          <p className="leading-relaxed text-primary-700">{cafe.description}</p>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-500">Amenities</h3>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {AMENITIES.map(({ key, label, icon: Icon }) => {
                const available = cafe[key];
                return (
                  <li
                    key={key}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium ${
                      available
                        ? 'border-secondary-100 bg-secondary-50 text-secondary-700'
                        : 'border-primary-100 bg-primary-50/50 text-primary-500'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{label}</span>
                    {available ? <Check className="h-4 w-4" aria-label="Available" /> : <Minus className="h-4 w-4" aria-label="Not available" />}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
