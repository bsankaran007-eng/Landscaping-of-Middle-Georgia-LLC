import { useEffect, useState } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { ESTATE_IMAGES, PORTFOLIO_PROJECTS } from '../data/estateData';
import type { PortfolioProject, ServiceCategory } from '../data/estateData';
import { filterItemsByCategory, formatSqFt } from '../utils/estimateCalculator';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { PropertyMeasurementSummary } from './PropertyMeasurementSummary';
import { ResilientImage } from './ResilientImage';

interface PortfolioScreenProps {
  onRequestProjectScope: (projectId: string) => void;
}

const CATEGORIES: ServiceCategory[] = ['All', 'Residential', 'Commercial', 'Hardscaping'];

export function PortfolioScreen({ onRequestProjectScope }: PortfolioScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('All');
  const [comparisonProjectId, setComparisonProjectId] = useState<string>(PORTFOLIO_PROJECTS[0].id);
  const [inspectedProject, setInspectedProject] = useState<PortfolioProject | null>(null);

  const filteredProjects = filterItemsByCategory(PORTFOLIO_PROJECTS, selectedCategory);
  const comparisonProject =
    PORTFOLIO_PROJECTS.find((p) => p.id === comparisonProjectId) ?? PORTFOLIO_PROJECTS[0];

  useEffect(() => {
    if (!inspectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setInspectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inspectedProject]);

  return (
    <div className="pt-8 md:pt-12 space-y-16 md:space-y-20">
      {/* Portfolio Header & Interactive Before/After Feature */}
      <section aria-labelledby="portfolio-page-title">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#14532D]">
            MIDDLE GEORGIA CASE STUDIES
          </p>
          <h1
            id="portfolio-page-title"
            className="mt-2 text-[34px] leading-[42px] md:text-[44px] md:leading-[52px] font-extrabold tracking-[-0.02em] text-[#0F172A]"
          >
            Measured Exterior Transformations
          </h1>
          <p className="mt-4 text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] text-[#404941]">
            Inspect documented restorations across historic residential districts, lakefront
            properties, and corporate campuses—complete with verified turf and irrigation metrics.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {PORTFOLIO_PROJECTS.slice(0, 3).map((project) => {
                const isSelected = project.id === comparisonProject.id;
                return (
                  <button
                    key={project.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setComparisonProjectId(project.id)}
                    className={`h-9 px-4 rounded-full text-[13px] font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-[#14532D] text-white border border-[#14532D]'
                        : 'bg-white text-[#0F172A] border border-[#E2E8F0] hover:border-[#14532D]/40'
                    }`}
                  >
                    {project.title}
                  </button>
                );
              })}
            </div>

            <BeforeAfterSlider
              beforeImage={comparisonProject.beforeImage ?? ESTATE_IMAGES.transformBefore}
              afterImage={comparisonProject.afterImage ?? comparisonProject.image}
              beforeAlt={`Before photo of ${comparisonProject.title}`}
              afterAlt={`After photo of ${comparisonProject.title}`}
              projectTitle={comparisonProject.title}
            />
          </div>

          <div className="lg:col-span-5 space-y-4">
            <PropertyMeasurementSummary
              title={comparisonProject.title}
              subtitle={`${comparisonProject.location} · ${comparisonProject.completionQuarter}`}
              squareFootage={comparisonProject.measurements.squareFootage}
              turfType={comparisonProject.measurements.turfType}
              frequency={comparisonProject.measurements.frequency}
              irrigationZones={comparisonProject.measurements.irrigationZones}
              crewHoursPerVisit={comparisonProject.measurements.crewHoursPerVisit}
              verifiedFlag={
                comparisonProject.category === 'Commercial'
                  ? 'COMMERCIAL GRADE'
                  : 'SERVICE VERIFIED'
              }
            />

            <button
              type="button"
              onClick={() => onRequestProjectScope(comparisonProject.id)}
              className="estate-btn-primary w-full h-12 px-6 rounded-[8px] text-[14px] font-bold tracking-[0.02em] inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>Request Similar Scope Estimate</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Filterable Full Project Gallery */}
      <section aria-labelledby="gallery-grid-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#0F172A]/8">
          <h2
            id="gallery-grid-heading"
            className="text-[24px] md:text-[28px] font-bold leading-[32px] text-[#0F172A]"
          >
            Completed Estates &amp; Commercial Contracts
          </h2>

          <div
            role="group"
            aria-label="Filter portfolio projects"
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
        </div>

        <div
          data-testid="portfolio-gallery-grid"
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="estate-card-interactive rounded-[16px] overflow-hidden flex flex-col"
            >
              <div className="aspect-[16/10] w-full bg-[#ECEEEC] overflow-hidden">
                <ResilientImage
                  src={project.image}
                  alt={project.imageAlt}
                  fallbackTitle={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-[#14532D]">
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#404941]">{project.location}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#404941] tabular-nums">
                    {formatSqFt(project.measurements.squareFootage)}
                  </span>
                </div>

                <h3 className="mt-2 text-[22px] font-bold leading-[30px] text-[#0F172A]">
                  {project.title}
                </h3>

                <p className="mt-2.5 text-[15px] leading-[24px] text-[#404941] flex-1">
                  {project.summary}
                </p>

                <div className="mt-4 px-4 py-3 rounded-[8px] bg-[#F1F5F9] flex items-center justify-between gap-3">
                  <span className="text-[13px] font-medium text-[#404941]">Measured Outcome</span>
                  <span className="text-[13px] font-bold text-[#14532D] text-right">
                    {project.outcomeMetric}
                  </span>
                </div>

                <div className="mt-5 pt-4 border-t border-[#0F172A]/8 flex items-center justify-between gap-4">
                  <span className="text-[13px] font-medium text-[#404941]">
                    {project.measurements.turfType} · {project.measurements.frequency}
                  </span>
                  <button
                    type="button"
                    onClick={() => setInspectedProject(project)}
                    aria-label={`Inspect property dossier for ${project.title}`}
                    className="inline-flex items-center gap-1.5 text-[14px] font-bold tracking-[0.02em] text-[#14532D] hover:text-[#003B1B] whitespace-nowrap cursor-pointer"
                  >
                    <span>Inspect Dossier</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Level 3 Full Gallery Inspection Modal */}
      {inspectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/40 backdrop-blur-[8px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dossier-title"
          onClick={() => setInspectedProject(null)}
        >
          <div
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-[24px] estate-modal-shadow border border-[#0F172A]/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full bg-[#ECEEEC]">
              <ResilientImage
                src={inspectedProject.image}
                alt={inspectedProject.imageAlt}
                fallbackTitle={inspectedProject.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setInspectedProject(null)}
                aria-label="Close project dossier"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 text-[#0F172A] hover:bg-white shadow-md flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#14532D]">
                  {inspectedProject.category} · {inspectedProject.location} ·{' '}
                  {inspectedProject.completionQuarter}
                </p>
                <h2
                  id="project-dossier-title"
                  className="mt-2 text-[26px] font-bold leading-[34px] text-[#0F172A]"
                >
                  {inspectedProject.title}
                </h2>
                <p className="mt-2 text-[15px] leading-[24px] text-[#404941]">
                  {inspectedProject.summary}
                </p>
              </div>

              <PropertyMeasurementSummary
                title="Verified Field Specifications"
                squareFootage={inspectedProject.measurements.squareFootage}
                turfType={inspectedProject.measurements.turfType}
                frequency={inspectedProject.measurements.frequency}
                irrigationZones={inspectedProject.measurements.irrigationZones}
                crewHoursPerVisit={inspectedProject.measurements.crewHoursPerVisit}
              />

              <div>
                <h3 className="text-[14px] font-bold tracking-[0.02em] text-[#0F172A]">
                  Key Scope Deliverables
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {inspectedProject.scopeHighlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-[15px] leading-[22px] text-[#404941]"
                    >
                      <span className="mt-0.5 w-5 h-5 rounded-[5px] bg-[#14532D] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#0F172A]/8 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setInspectedProject(null)}
                  className="h-12 px-6 rounded-[8px] border-[1.5px] border-[#14532D] bg-white text-[#14532D] hover:bg-[#F0FDF4] text-[14px] font-bold whitespace-nowrap cursor-pointer"
                >
                  Close Dossier
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const id = inspectedProject.id;
                    setInspectedProject(null);
                    onRequestProjectScope(id);
                  }}
                  className="estate-btn-primary h-12 px-6 rounded-[8px] text-[14px] font-bold inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>Request Similar Scope</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
