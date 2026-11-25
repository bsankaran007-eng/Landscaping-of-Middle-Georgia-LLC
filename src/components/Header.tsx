import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export type ScreenId = 'overview' | 'services' | 'portfolio' | 'estimate';

interface HeaderProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

const NAV_ITEMS: { id: ScreenId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'estimate', label: 'Estimate' },
];

export function Header({ activeScreen, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (screen: ScreenId) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8FAF8]/95 backdrop-blur-md border-b border-[#0F172A]/8">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element brand wordmark */}
        <button
          type="button"
          onClick={() => handleSelect('overview')}
          className="text-[20px] md:text-[22px] font-extrabold tracking-[-0.02em] text-[#003B1B] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14532D] rounded-[6px] cursor-pointer"
        >
          Estate Verve
        </button>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-[14px] font-semibold whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14532D] rounded-[4px] cursor-pointer ${
                  isActive
                    ? 'text-[#14532D]'
                    : 'text-[#404941] hover:text-[#0F172A]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 bottom-0 h-[2px] rounded-full transition-opacity ${
                    isActive ? 'bg-[#14532D] opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary CTA button (desktop) + Mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('estimate')}
            className="hidden sm:inline-flex estate-btn-primary h-11 md:h-12 px-5 md:px-6 rounded-[8px] text-[14px] font-bold tracking-[0.02em] items-center justify-center whitespace-nowrap shrink-0 cursor-pointer"
          >
            Schedule Estimate
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden w-11 h-11 rounded-[8px] border border-[#CBD5E1] bg-white text-[#0F172A] flex items-center justify-center cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden bg-white border-b border-[#0F172A]/10 px-5 py-4 space-y-2"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full text-left px-4 py-3 rounded-[8px] text-[15px] font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#F0FDF4] text-[#14532D]'
                    : 'text-[#0F172A] hover:bg-[#F2F4F2]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => handleSelect('estimate')}
            className="w-full estate-btn-primary h-12 rounded-[8px] text-[14px] font-bold tracking-[0.02em] mt-2 cursor-pointer"
          >
            Schedule Estimate
          </button>
        </nav>
      )}
    </header>
  );
}
