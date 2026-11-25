import { useState } from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { AGRONOMY_CALENDAR, ESTATE_SERVICES } from '../data/estateData';
import type { EstateService, ServiceCategory } from '../data/estateData';
import { filterItemsByCategory } from '../utils/estimateCalculator';
import { ServiceCard } from './ServiceCard';
import type { ScreenId } from './Header';

interface ServicesScreenProps {
  onInspectService: (service: EstateService) => void;
  onNavigate: (screen: ScreenId) => void;
  onOpenEmergency: () => void;
}

const CATEGORIES: ServiceCategory[] = ['All', 'Residential', 'Commercial', 'Hardscaping'];

export function ServicesScreen({
  onInspectService,
  onNavigate,
  onOpenEmergency,
}: ServicesScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('All');
  const [selectedSeason, setSelectedSeason] = useState<string>(AGRONOMY_CALENDAR[0].season);

  const filteredServices = filterItemsByCategory(ESTATE_SERVICES, selectedCategory);
  const activePhase =
    AGRONOMY_CALENDAR.find((phase) => phase.season === selectedSeason) ?? AGRONOMY_CALENDAR[0];

  return (
    <div className="pt-8 md:pt-12 space-y-16 md:space-y-20">
      {/* Header & Filter Bar */}
      <section aria-labelledby="services-page-title">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#14532D]">
            RESIDENTIAL &amp; COMMERCIAL PROGRAMS
          </p>
          <h1
            id="services-page-title"
            className="mt-2 text-[34px] leading-[42px] md:text-[44px] md:leading-[52px] font-extrabold tracking-[-0.02em] text-[#0F172A]"
          >
            Estate-Grade Services &amp; Seasonal Agronomy
          </h1>
          <p className="mt-4 text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] text-[#404941]">
            Inspect technical scope specifications for each division below, or add any program
            directly to your property measurement estimate.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#0F172A]/8">
          <div
            role="group"
            aria-label="Filter catalog by discipline"
            className="flex flex-wrap items-center gap-2"
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`h-10 px-4 rounded-full text-[13px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#14532D] text-white border border-[#14532D]'
                      : 'bg-white text-[#0F172A] border border-[#E2E8F0] hover:border-[#14532D]/40'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <p className="text-[13px] font-medium text-[#404941] tabular-nums">
            Showing {filteredServices.length} of {ESTATE_SERVICES.length} programs
          </p>
        </div>

        {/* Service Cards Grid */}
        <div
          data-testid="services-catalog-grid"
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onInspect={onInspectService}
            />
          ))}
        </div>
      </section>

      {/* Interactive Middle Georgia Seasonal Agronomy Calendar */}
      <section aria-labelledby="agronomy-calendar-heading">
        <div className="estate-card rounded-[24px] p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#0F172A]/8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#14532D]">
                MIDDLE GEORGIA TURF SCIENCE
              </p>
              <h2
                id="agronomy-calendar-heading"
                className="mt-2 text-[24px] md:text-[32px] font-bold leading-[32px] md:leading-[40px] tracking-[-0.015em] text-[#0F172A]"
              >
                Four-Season Agronomy Protocol
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Select season"
              className="flex flex-wrap items-center gap-2"
            >
              {AGRONOMY_CALENDAR.map((phase) => {
                const isSelected = phase.season === activePhase.season;
                return (
                  <button
                    key={phase.season}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedSeason(phase.season)}
                    className={`h-10 px-4 rounded-full text-[13px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-[#14532D] text-white'
                        : 'bg-[#F2F4F2] text-[#0F172A] hover:bg-[#E6E9E7]'
                    }`}
                  >
                    {phase.season}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-3">
              <div className="px-4 py-3 rounded-[8px] bg-[#F1F5F9] flex items-center justify-between gap-4">
                <span className="text-[14px] font-medium text-[#404941]">Active Window</span>
                <span className="text-[15px] font-bold text-[#14532D]">{activePhase.months}</span>
              </div>
              <div className="px-4 py-3 rounded-[8px] bg-[#F1F5F9] flex items-center justify-between gap-4">
                <span className="text-[14px] font-medium text-[#404941]">Target Soil Range</span>
                <span className="text-[15px] font-bold text-[#14532D] tabular-nums">
                  {activePhase.soilTemp}
                </span>
              </div>
              <div className="px-4 py-3 rounded-[8px] bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-between gap-4">
                <span className="text-[14px] font-medium text-[#404941]">Primary Objective</span>
                <span className="text-[14px] font-bold text-[#003B1B] text-right">
                  {activePhase.focusTitle}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-[16px] font-bold text-[#0F172A]">
                Scheduled Field Treatments ({activePhase.season})
              </h3>
              <ul className="mt-4 space-y-3">
                {activePhase.protocols.map((protocol, index) => (
                  <li
                    key={protocol}
                    className="flex items-start gap-4 p-4 rounded-[12px] bg-[#F8FAF8] border border-[#0F172A]/6"
                  >
                    <span className="text-[13px] font-bold text-[#14532D] tabular-nums">
                      0{index + 1}.
                    </span>
                    <span className="text-[15px] leading-[22px] text-[#191C1B]">{protocol}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="rounded-[24px] bg-[#003B1B] text-white p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#96D5A3]">
            CUSTOM PROPERTY WALKTHROUGH
          </p>
          <h2 className="mt-2 text-[24px] md:text-[30px] font-bold leading-[32px] md:leading-[38px] text-white">
            Need a unified turf, masonry, and irrigation plan?
          </h2>
          <p className="mt-2 text-[15px] leading-[24px] text-[#EFF1EF]/85">
            Configure your property square footage and cultivars online for an immediate investment
            range and on-site agronomist appointment.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('estimate')}
            className="h-12 px-6 rounded-[8px] bg-white text-[#14532D] hover:bg-[#F0FDF4] text-[14px] font-bold tracking-[0.02em] inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Build Custom Estimate</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onOpenEmergency}
            className="h-12 px-5 rounded-[8px] bg-[#22C55E] hover:bg-[#16A34A] text-[#0F172A] text-[14px] font-bold tracking-[0.02em] inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" aria-hidden="true" />
            <span>Emergency Tree Service</span>
          </button>
        </div>
      </section>
    </div>
  );
}
