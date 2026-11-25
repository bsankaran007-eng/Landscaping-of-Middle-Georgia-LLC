import { PhoneCall } from 'lucide-react';
import type { ScreenId } from './Header';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenEmergency: () => void;
}

export function Footer({ onNavigate, onOpenEmergency }: FooterProps) {
  return (
    <footer className="mt-20 bg-[#0F172A] text-[#EFF1EF]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          <div className="md:col-span-5">
            <p className="text-[22px] font-extrabold tracking-[-0.02em] text-white">
              Estate Verve
            </p>
            <p className="mt-3 text-[15px] leading-[24px] text-[#CBD5E1] max-w-md">
              Meticulously managed residential groundskeeping, stone masonry terraces, and
              commercial campus stewardship across Middle Georgia.
            </p>
            <p className="mt-4 text-[13px] font-medium text-[#96D5A3]">
              Macon · Warner Robins · Lake Oconee · Milledgeville · Forsyth
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#96D5A3]">
              Navigation
            </h2>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[#CBD5E1]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('overview')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services &amp; Agronomy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('portfolio')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Portfolio Transformations
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('estimate')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Property Estimate Builder
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#96D5A3]">
              Middle Georgia Operations
            </h2>
            <dl className="mt-4 space-y-2 text-[14px] text-[#CBD5E1]">
              <div className="flex justify-between gap-4">
                <dt className="text-[#94A3B8]">Main Office</dt>
                <dd className="tabular-nums font-medium text-white">(478) 555-0140</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#94A3B8]">Dispatch Yard</dt>
                <dd className="text-right">2140 Riverside Dr, Macon, GA</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#94A3B8]">Hours</dt>
                <dd className="tabular-nums">Mon–Sat, 7:00 AM – 6:00 PM</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={onOpenEmergency}
              className="mt-5 w-full sm:w-auto h-11 px-5 rounded-[8px] bg-[#22C55E] hover:bg-[#16A34A] text-[#0F172A] text-[14px] font-bold tracking-[0.02em] inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" aria-hidden="true" />
              <span>Emergency Tree Service</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[13px] text-[#94A3B8]">
          <p>© 2026 Estate Verve Groundskeeping LLC. Licensed &amp; Insured in Georgia.</p>
          <p>GA Commercial Pesticide License #48192 · ISA Certified Arborists</p>
        </div>
      </div>
    </footer>
  );
}
