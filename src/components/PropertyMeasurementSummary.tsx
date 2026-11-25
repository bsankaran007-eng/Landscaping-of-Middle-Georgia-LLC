import { formatCurrency, formatSqFt } from '../utils/estimateCalculator';
import type { PropertyTier, ServiceFrequency, TurfCultivar } from '../data/estateData';

interface PropertyMeasurementSummaryProps {
  title?: string;
  subtitle?: string;
  squareFootage: number;
  turfType: TurfCultivar;
  frequency: ServiceFrequency;
  irrigationZones?: number;
  crewHoursPerVisit?: number;
  propertyTier?: PropertyTier;
  perVisitEstimate?: number;
  monthlyEstimate?: number;
  verifiedFlag?: string;
}

export function PropertyMeasurementSummary({
  title = 'Property Measurement Summary',
  subtitle,
  squareFootage,
  turfType,
  frequency,
  irrigationZones,
  crewHoursPerVisit,
  propertyTier,
  perVisitEstimate,
  monthlyEstimate,
  verifiedFlag = 'SERVICE VERIFIED',
}: PropertyMeasurementSummaryProps) {
  const rows: { label: string; value: string; emphasize?: boolean }[] = [
    ...(propertyTier ? [{ label: 'Property Classification', value: propertyTier }] : []),
    { label: 'Measured Turf Area', value: formatSqFt(squareFootage) },
    { label: 'Primary Turf Cultivar', value: turfType },
    { label: 'Service Cadence', value: frequency },
    ...(typeof irrigationZones === 'number'
      ? [{ label: 'Irrigation Zones', value: `${irrigationZones} active zones` }]
      : []),
    ...(typeof crewHoursPerVisit === 'number'
      ? [{ label: 'Estimated Crew Time', value: `${crewHoursPerVisit} hrs / visit` }]
      : []),
    ...(typeof perVisitEstimate === 'number'
      ? [{ label: 'Estimated Per Visit', value: formatCurrency(perVisitEstimate) }]
      : []),
    ...(typeof monthlyEstimate === 'number'
      ? [{ label: 'Estimated Monthly Plan', value: `${formatCurrency(monthlyEstimate)} / mo`, emphasize: true }]
      : []),
  ];

  return (
    <div className="estate-card rounded-[16px] p-6" data-testid="property-measurement-summary">
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#0F172A]/8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#14532D]">
            {verifiedFlag}
          </p>
          <h3 className="mt-1 text-[20px] font-semibold leading-[28px] text-[#0F172A]">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1 text-[14px] leading-[20px] text-[#404941]">{subtitle}</p>
          )}
        </div>
      </div>

      <dl className="mt-4 space-y-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className={`flex items-center justify-between gap-4 px-4 py-3 rounded-[8px] ${
              row.emphasize
                ? 'bg-[#F0FDF4] border border-[#DCFCE7]'
                : 'bg-[#F1F5F9]'
            }`}
          >
            <dt className="text-[14px] font-medium text-[#404941]">{row.label}</dt>
            <dd
              className={`tabular-nums text-right font-bold ${
                row.emphasize
                  ? 'text-[18px] text-[#003B1B]'
                  : 'text-[15px] text-[#14532D]'
              }`}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
