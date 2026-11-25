import { useEffect } from 'react';
import { ArrowRight, Building2, Check, Layers, Leaf, X } from 'lucide-react';
import type { EstateService } from '../data/estateData';
import { ResilientImage } from './ResilientImage';
import { formatSqFt } from '../utils/estimateCalculator';

interface ServiceInspectionModalProps {
  service: EstateService | null;
  onClose: () => void;
  onAddToEstimate: (service: EstateService) => void;
}

function ServiceTypeIcon({ category }: { category: EstateService['category'] }) {
  if (category === 'Commercial') return <Building2 className="w-3.5 h-3.5" aria-hidden="true" />;
  if (category === 'Hardscaping') return <Layers className="w-3.5 h-3.5" aria-hidden="true" />;
  return <Leaf className="w-3.5 h-3.5" aria-hidden="true" />;
}

export function ServiceInspectionModal({
  service,
  onClose,
  onAddToEstimate,
}: ServiceInspectionModalProps) {
  useEffect(() => {
    if (!service) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/40 backdrop-blur-[8px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[24px] estate-modal-shadow border border-[#0F172A]/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/9] w-full bg-[#ECEEEC]">
          <ResilientImage
            src={service.image}
            alt={service.imageAlt}
            fallbackTitle={service.title}
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close service specification sheet"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 text-[#0F172A] hover:bg-white shadow-md flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14532D] cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#DCFCE7] text-[#14532D] text-[12px] font-semibold tracking-[0.04em]">
              <ServiceTypeIcon category={service.category} />
              <span>{service.serviceBadgeLabel}</span>
            </span>
            <span className="text-[12px] font-medium text-[#404941]">{service.cadence}</span>
          </div>

          <h2
            id="service-modal-title"
            className="mt-2 text-[24px] sm:text-[28px] font-bold leading-[32px] sm:leading-[36px] tracking-[-0.01em] text-[#0F172A]"
          >
            {service.title}
          </h2>

          <p className="mt-2 text-[14px] font-medium text-[#404941]">
            {service.propertyTypes}
          </p>

          <p className="mt-4 text-[16px] leading-[26px] text-[#191C1B]">
            {service.fullSpecification}
          </p>

          {/* Split-data specification summary */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="px-4 py-3 rounded-[8px] bg-[#F1F5F9] flex items-center justify-between gap-2">
              <span className="text-[13px] font-medium text-[#404941]">Typical Starting Rate</span>
              <span className="text-[14px] font-bold text-[#14532D] tabular-nums">
                {service.startingRateLabel}
              </span>
            </div>
            <div className="px-4 py-3 rounded-[8px] bg-[#F1F5F9] flex items-center justify-between gap-2">
              <span className="text-[13px] font-medium text-[#404941]">Baseline Lot Size</span>
              <span className="text-[14px] font-bold text-[#14532D] tabular-nums">
                {formatSqFt(service.recommendedSqFt)}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-[14px] font-bold tracking-[0.02em] text-[#0F172A]">
              Included Field Deliverables
            </h3>
            <ul className="mt-3 space-y-2.5">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-[22px] text-[#404941]">
                  <span className="mt-0.5 w-5 h-5 rounded-[5px] bg-[#14532D] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-5 border-t border-[#0F172A]/8 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-12 px-6 rounded-[8px] border-[1.5px] border-[#14532D] bg-white text-[#14532D] text-[14px] font-bold tracking-[0.02em] hover:bg-[#F0FDF4] transition-colors whitespace-nowrap cursor-pointer"
            >
              Close Sheet
            </button>
            <button
              type="button"
              onClick={() => onAddToEstimate(service)}
              className="estate-btn-primary h-12 px-6 rounded-[8px] text-[14px] font-bold tracking-[0.02em] inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>Add to Estimate</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
