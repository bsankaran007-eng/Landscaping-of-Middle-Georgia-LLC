import { ArrowRight } from 'lucide-react';
import type { EstateService } from '../data/estateData';
import { ResilientImage } from './ResilientImage';

interface ServiceCardProps {
  service: EstateService;
  onInspect: (service: EstateService) => void;
}

export function ServiceCard({ service, onInspect }: ServiceCardProps) {
  return (
    <article className="estate-card-interactive rounded-[16px] overflow-hidden flex flex-col h-full">
      {/* Edge-to-edge 3:2 Imagery */}
      <div className="relative aspect-[3/2] w-full bg-[#ECEEEC] overflow-hidden">
        <ResilientImage
          src={service.image}
          alt={service.imageAlt}
          fallbackTitle={service.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      {/* 1.5rem Padding Block */}
      <div className="p-6 flex flex-col flex-1">
        {/* Clean unboxed typographic metadata kicker */}
        <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.05em] text-[#14532D]">
          <span>{service.category}</span>
          <span className="text-[#404941] tabular-nums">{service.code}</span>
        </div>

        <h3 className="mt-2 text-[20px] font-semibold leading-[28px] text-[#0F172A]">
          {service.title}
        </h3>

        <p className="mt-1 text-[13px] font-medium text-[#404941]">
          {service.propertyTypes}
        </p>

        <p className="mt-3 text-[15px] leading-[24px] text-[#404941] flex-1">
          {service.shortDescription}
        </p>

        <div className="mt-5 pt-4 border-t border-[#0F172A]/8 flex items-center justify-between gap-3">
          <span className="text-[13px] font-semibold text-[#0F172A] tabular-nums whitespace-nowrap">
            {service.startingRateLabel}
          </span>
          <button
            type="button"
            onClick={() => onInspect(service)}
            aria-label={`Inspect specification for ${service.title}`}
            className="inline-flex items-center gap-1.5 text-[14px] font-bold tracking-[0.02em] text-[#14532D] hover:text-[#003B1B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#14532D] focus-visible:ring-offset-2 rounded-[6px] py-1 px-1 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Inspect Scope</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
