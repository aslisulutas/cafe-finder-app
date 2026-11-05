import { Coffee } from 'lucide-react';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-primary-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-800 text-primary-50 transition-transform duration-300 group-hover:-rotate-12">
            <Coffee className="h-4 w-4" />
          </span>
          <span className="font-display text-xl font-bold text-primary-900">Brew Finder</span>
        </a>
        <p className="hidden text-sm text-primary-600 sm:block">Independent cafes, curated for you</p>
      </div>
    </header>
  );
}
