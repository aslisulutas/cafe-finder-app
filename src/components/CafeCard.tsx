import { Clock, MapPin, Star } from 'lucide-react';
import { AMENITIES } from '@/lib/amenities';
import { priceLabel } from '@/lib/format';
import type { Cafe } from '@/types/cafe';

interface CafeCardProps {
  cafe: Cafe;
  onSelect: (cafe: Cafe) => void;
  index: number;
}

export default function CafeCard({ cafe, onSelect, index }: CafeCardProps) {
  const activeAmenities = AMENITIES.filter(({ key }) => cafe[key]);

  return (
    <button
      type="button"
      onClick={() => onSelect(cafe)}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      className="group flex w-full animate-slide-up flex-col overflow-hidden rounded-2xl border border-primary-100 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-900/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-200"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-primary-100">
        <img
          src={cafe.imageUrl}
          alt={cafe.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-sm font-semibold text-primary-900 shadow-sm">
          <Star className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
          {cafe.rating.toFixed(1)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-xl font-bold leading-tight text-primary-900">{cafe.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-primary-600">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{cafe.neighborhood}</span>
            </p>
          </div>
          <span className="shrink-0 text-sm font-semibold text-primary-500">{priceLabel(cafe.priceLevel)}</span>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-primary-700">{cafe.description}</p>

        <div className="mt-auto flex items-center justify-between border-t border-primary-100 pt-4">
          <div className="flex items-center gap-2 text-primary-500">
            {activeAmenities.map(({ key, label, icon: Icon }) => (
              <span key={key} title={label} aria-label={label} className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary-50 text-secondary-700">
                <Icon className="h-3.5 w-3.5" />
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-primary-600">
            <Clock className="h-3.5 w-3.5" />
            Until {cafe.openUntil}
          </span>
        </div>
      </div>
    </button>
  );
}
