import { useState } from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';
import {
  CLIENT_TESTIMONIALS,
  ESTATE_IMAGES,
  ESTATE_SERVICES,
  PORTFOLIO_PROJECTS,
} from '../data/estateData';
import type { EstateService, ServiceCategory } from '../data/estateData';
import { filterItemsByCategory } from '../utils/estimateCalculator';
import { ResilientImage } from './ResilientImage';
import { ServiceCard } from './ServiceCard';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { PropertyMeasurementSummary } from './PropertyMeasurementSummary';
import type { ScreenId } from './Header';

interface OverviewScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onInspectService: (service: EstateService) => void;
  onOpenEmergency: () => void;
  onRequestProjectScope: (projectId: string) => void;
}

const FILTER_CATEGORIES: ServiceCategory[] = ['All', 'Residential', 'Commercial', 'Hardscaping'];

export function OverviewScreen({
  onNavigate,
  onInspectService,
  onOpenEmergency,
  onRequestProjectScope,
}: OverviewScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('All');
  const [featuredProjectId, setFeaturedProjectId] = useState<string>(PORTFOLIO_PROJECTS[0].id);

  const visibleServices = filterItemsByCategory(ESTATE_SERVICES, selectedCategory).slice(
    0,
    selectedCategory === 'All' ? 3 : 6
  );

  const activeTransformation =
    PORTFOLIO_PROJECTS.find((p) => p.id === featuredProjectId) ?? PORTFOLIO_PROJECTS[0];

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Section 1: Hero Highlight (rounded-[24px], 12-col split with items-stretch) */}
      <section aria-labelledby="hero-headline" className="pt-8 md:pt-10">
        <div className="bg-white rounded-[24px] border border-[#0F172A]/6 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Editorial Copy Column */}
            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#14532D]">
                  MIDDLE GEORGIA ESTATE &amp; COMMERCIAL GROUNDSKEEPING
                </p>

                <h1
                  id="hero-headline"
                  className="mt-4 text-[34px] leading-[42px] sm:text-[42px] sm:leading-[50px] lg:text-[48px] lg:leading-[56px] font-extrabold tracking-[-0.02em] text-[#0F172A]"
                >
                  Architectural Turf &amp; Exterior Stewardship
                </h1>

                <p className="mt-5 text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] text-[#404941] max-w-[56ch]">
                  Estate-grade agronomy, natural stone masonry, and scheduled commercial campus care
                  across Macon, Warner Robins, and Lake Oconee—delivered by uniformed crews with
                  documented site verification.
                </p>

                {/* Primary + Secondary CTAs */}
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => onNavigate('estimate')}
                    className="estate-btn-primary h-12 px-6 rounded-[8px] text-[14px] font-bold tracking-[0.02em] inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>Schedule Estimate</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('portfolio')}
                    className="h-12 px-6 rounded-[8px] border-[1.5px] border-[#14532D] bg-white text-[#14532D] hover:bg-[#F0FDF4] text-[14px] font-bold tracking-[0.02em] inline-flex items-center justify-center transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Explore Portfolio
                  </button>
                </div>
              </div>

              {/* Quiet Unboxed Regional & Certification Line */}
              <div className="mt-8 pt-6 border-t border-[#0F172A]/8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-medium text-[#404941]">
                <span>Service Verified Routes</span>
                <span aria-hidden="true">·</span>
                <span>ISA Arborist Oversight</span>
                <span aria-hidden="true">·</span>
                <span>Commercial SLA Ready</span>
              </div>
            </div>

            {/* Full-Height Architectural Estate Photograph */}
            <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[360px] lg:min-h-full bg-[#ECEEEC]">
              <ResilientImage
                src={ESTATE_IMAGES.hero}
                alt="Manicured Middle Georgia residential estate featuring striped emerald Zeon Zoysia lawn, travertine stone walkway, and evergreen boxwood borders"
                fallbackTitle="Estate Verve Middle Georgia Residence"
                className="w-full h-full lg:absolute lg:inset-0 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quantified Proof & Urgent Dispatch Strip Below Hero Split */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="estate-card rounded-[16px] p-5 flex flex-col justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#404941]">
              ACTIVE PROPERTIES
            </p>
            <p className="mt-2 text-[28px] font-extrabold tracking-[-0.015em] text-[#14532D] tabular-nums">
              140+ Estates
            </p>
            <p className="mt-1 text-[13px] text-[#404941]">
              Managed weekly across Bibb, Houston &amp; Greene counties
            </p>
          </div>

          <div className="estate-card rounded-[16px] p-5 flex flex-col justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#404941]">
              ROUTE RELIABILITY
            </p>
            <p className="mt-2 text-[28px] font-extrabold tracking-[-0.015em] text-[#14532D] tabular-nums">
              99.4% On-Time
            </p>
            <p className="mt-1 text-[13px] text-[#404941]">
              Photo-verified completion logs across 12 rolling months
            </p>
          </div>

          <div className="estate-card rounded-[16px] p-5 flex flex-col justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#404941]">
              WATER SAVINGS
            </p>
            <p className="mt-2 text-[28px] font-extrabold tracking-[-0.015em] text-[#14532D] tabular-nums">
              -31% Avg Use
            </p>
            <p className="mt-1 text-[13px] text-[#404941]">
              Measured after smart controller &amp; rotor upgrades
            </p>
          </div>

          {/* Urgent Storm / Emergency Tree CTA Module */}
          <div className="rounded-[16px] p-5 bg-[#0F172A] text-white flex flex-col justify-between border border-[#0F172A]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#96D5A3]">
                STORM HAZARD RESPONSE
              </p>
              <p className="mt-1.5 text-[16px] font-bold leading-[22px] text-white">
                Fallen limb or blocked drive?
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenEmergency}
              className="mt-4 h-11 px-4 rounded-[8px] bg-[#22C55E] hover:bg-[#16A34A] text-[#0F172A] text-[14px] font-bold tracking-[0.02em] inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Emergency Tree Service</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Filterable Landscape Services Preview */}
      <section aria-labelledby="services-preview-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#14532D]">
              CORE CAPABILITIES
            </p>
            <h2
              id="services-preview-heading"
              className="mt-2 text-[28px] md:text-[36px] font-bold leading-[36px] md:leading-[44px] tracking-[-0.015em] text-[#0F172A]"
            >
              Structured Exterior Programs
            </h2>
          </div>

          {/* Interactive Filter Chips per Estate Verve spec */}
          <div
            role="group"
            aria-label="Filter services by property discipline"
            className="flex flex-wrap items-center gap-2"
          >
            {FILTER_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`h-10 px-4 rounded-full text-[13px] font-semibold transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14532D] focus-visible:ring-offset-2 ${
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
        </div>

        <div
          data-testid="overview-services-grid"
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visibleServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onInspect={onInspectService}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 text-[14px] font-bold tracking-[0.02em] text-[#14532D] hover:text-[#003B1B] py-2 cursor-pointer"
          >
            <span>View All 6 Services &amp; Agronomy Calendar</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* Section 3: Interactive Before / After Transformation + Property Measurement Summary */}
      <section aria-labelledby="transformation-heading">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#14532D]">
              FIELD PROOF · BEFORE &amp; AFTER
            </p>
            <h2
              id="transformation-heading"
              className="mt-2 text-[28px] md:text-[36px] font-bold leading-[36px] md:leading-[44px] tracking-[-0.015em] text-[#0F172A]"
            >
              Verified Property Transformations
            </h2>
          </div>

          <div
            role="group"
            aria-label="Select transformation project"
            className="flex flex-wrap items-center gap-2"
          >
            {PORTFOLIO_PROJECTS.slice(0, 3).map((project) => {
              const isSelected = project.id === activeTransformation.id;
              return (
                <button
                  key={project.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setFeaturedProjectId(project.id)}
                  className={`h-10 px-4 rounded-full text-[13px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#14532D] text-white border border-[#14532D]'
                      : 'bg-white text-[#0F172A] border border-[#E2E8F0] hover:border-[#14532D]/40'
                  }`}
                >
                  {project.location}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <BeforeAfterSlider
              beforeImage={activeTransformation.beforeImage ?? ESTATE_IMAGES.transformBefore}
              afterImage={activeTransformation.afterImage ?? activeTransformation.image}
              beforeAlt={`Before landscaping renovation at ${activeTransformation.title}`}
              afterAlt={`After Estate Verve renovation at ${activeTransformation.title}`}
              projectTitle={activeTransformation.title}
            />
          </div>

          <div className="lg:col-span-5 space-y-5">
            <PropertyMeasurementSummary
              title={activeTransformation.title}
              subtitle={`${activeTransformation.location} · ${activeTransformation.outcomeMetric}`}
              squareFootage={activeTransformation.measurements.squareFootage}
              turfType={activeTransformation.measurements.turfType}
              frequency={activeTransformation.measurements.frequency}
              irrigationZones={activeTransformation.measurements.irrigationZones}
              crewHoursPerVisit={activeTransformation.measurements.crewHoursPerVisit}
              verifiedFlag={
                activeTransformation.category === 'Commercial'
                  ? 'COMMERCIAL GRADE'
                  : 'SERVICE VERIFIED'
              }
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => onRequestProjectScope(activeTransformation.id)}
                className="estate-btn-primary flex-1 h-12 px-5 rounded-[8px] text-[14px] font-bold tracking-[0.02em] inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Price Similar Property</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                className="h-12 px-5 rounded-[8px] border-[1.5px] border-[#14532D] bg-white text-[#14532D] hover:bg-[#F0FDF4] text-[14px] font-bold tracking-[0.02em] whitespace-nowrap cursor-pointer"
              >
                Full Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Attributable Client Proof Adjacent to Field Metrics */}
      <section aria-labelledby="testimonials-heading">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#14532D]">
            CLIENT ACCOUNTS
          </p>
          <h2
            id="testimonials-heading"
            className="mt-2 text-[28px] md:text-[36px] font-bold leading-[36px] md:leading-[44px] tracking-[-0.015em] text-[#0F172A]"
          >
            Trusted by Estate Owners &amp; Facility Directors
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {CLIENT_TESTIMONIALS.map((item) => (
            <figure
              key={item.id}
              className="estate-card rounded-[16px] p-6 sm:p-8 flex flex-col justify-between"
            >
              <blockquote className="text-[16px] leading-[26px] text-[#191C1B]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 pt-5 border-t border-[#0F172A]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="text-[15px] font-bold text-[#0F172A]">{item.author}</p>
                  <p className="text-[13px] text-[#404941]">
                    {item.role} · {item.property}
                  </p>
                </div>
                <span className="text-[12px] font-semibold text-[#14532D] tabular-nums whitespace-nowrap">
                  {item.metricBadge}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
