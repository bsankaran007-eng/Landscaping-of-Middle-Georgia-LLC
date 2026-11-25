import { useState } from 'react';
import type { FormEvent } from 'react';
import { AlertTriangle, CalendarCheck2, Check, Trash2 } from 'lucide-react';
import { ADD_ON_SERVICE_OPTIONS } from '../data/estateData';
import type {
  AddOnServiceId,
  PropertyTier,
  ServiceFrequency,
  TurfCultivar,
} from '../data/estateData';
import {
  calculateEstateEstimate,
  formatCurrency,
  formatSqFt,
  validateEstimateForm,
} from '../utils/estimateCalculator';
import type { EstimateContactForm } from '../utils/estimateCalculator';
import { PropertyMeasurementSummary } from './PropertyMeasurementSummary';

export interface SavedEstimateRecord {
  referenceId: string;
  submittedAt: string;
  propertyTier: PropertyTier;
  squareFootage: number;
  turfType: TurfCultivar;
  frequency: ServiceFrequency;
  selectedAddOns: AddOnServiceId[];
  monthlyEstimate: number;
  perVisitEstimate: number;
  contact: EstimateContactForm;
}

export interface EstimateDraftConfig {
  propertyTier: PropertyTier;
  squareFootage: number;
  turfType: TurfCultivar;
  frequency: ServiceFrequency;
  selectedAddOns: AddOnServiceId[];
  sourceLabel?: string;
}

interface EstimateScreenProps {
  draftConfig: EstimateDraftConfig;
  onUpdateDraft: (next: EstimateDraftConfig) => void;
  savedEstimates: SavedEstimateRecord[];
  onSaveEstimate: (record: SavedEstimateRecord) => void;
  onDeleteEstimate: (referenceId: string) => void;
}

const PROPERTY_TIERS: PropertyTier[] = [
  'Residential Estate',
  'Commercial Campus',
  'HOA / Multi-Family',
];

const TURF_CULTIVARS: TurfCultivar[] = [
  'Zeon Zoysia',
  'Tifway 419 Bermuda',
  'Centipede',
  'Tall Fescue',
];

const FREQUENCIES: ServiceFrequency[] = [
  'Weekly Precision',
  'Bi-Weekly Estate',
  'Seasonal Program',
];

const EMPTY_CONTACT: EstimateContactForm = {
  fullName: '',
  email: '',
  phone: '',
  streetAddress: '',
  cityZip: '',
  notes: '',
};

type FormErrorKey = keyof EstimateContactForm | 'selectedAddOns' | 'squareFootage';

export function EstimateScreen({
  draftConfig,
  onUpdateDraft,
  savedEstimates,
  onSaveEstimate,
  onDeleteEstimate,
}: EstimateScreenProps) {
  const [contact, setContact] = useState<EstimateContactForm>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<Partial<Record<FormErrorKey, string>>>({});
  const [latestConfirmation, setLatestConfirmation] = useState<SavedEstimateRecord | null>(null);

  const breakdown = calculateEstateEstimate({
    propertyTier: draftConfig.propertyTier,
    squareFootage: draftConfig.squareFootage,
    turfType: draftConfig.turfType,
    frequency: draftConfig.frequency,
    selectedAddOns: draftConfig.selectedAddOns,
  });

  const toggleAddOn = (id: AddOnServiceId) => {
    const exists = draftConfig.selectedAddOns.includes(id);
    const nextAddOns = exists
      ? draftConfig.selectedAddOns.filter((item) => item !== id)
      : [...draftConfig.selectedAddOns, id];

    onUpdateDraft({ ...draftConfig, selectedAddOns: nextAddOns });
    if (errors.selectedAddOns && nextAddOns.length > 0) {
      setErrors((prev) => ({ ...prev, selectedAddOns: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = validateEstimateForm(
      contact,
      draftConfig.selectedAddOns,
      draftConfig.squareFootage
    );

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    const record: SavedEstimateRecord = {
      referenceId: `EV-${new Date().getFullYear()}-${String(1040 + savedEstimates.length + 1)}`,
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      propertyTier: draftConfig.propertyTier,
      squareFootage: breakdown.squareFootage,
      turfType: draftConfig.turfType,
      frequency: draftConfig.frequency,
      selectedAddOns: [...draftConfig.selectedAddOns],
      monthlyEstimate: breakdown.monthlyEstimate,
      perVisitEstimate: breakdown.perVisitEstimate,
      contact: { ...contact },
    };

    onSaveEstimate(record);
    setLatestConfirmation(record);
    setErrors({});
    setContact(EMPTY_CONTACT);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-8 md:pt-12 space-y-12">
      {/* Page Title */}
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#14532D]">
          PROPERTY MEASUREMENT &amp; CONSULTATION
        </p>
        <h1 className="mt-2 text-[34px] leading-[42px] md:text-[44px] md:leading-[52px] font-extrabold tracking-[-0.02em] text-[#0F172A]">
          Schedule an On-Site Estate Estimate
        </h1>
        <p className="mt-4 text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] text-[#404941]">
          Configure your property parameters to preview an immediate investment range, then book a
          complimentary walkthrough with our Middle Georgia lead agronomist.
        </p>
        {draftConfig.sourceLabel && (
          <p className="mt-3 text-[13px] font-semibold text-[#14532D]">
            Pre-configured from: {draftConfig.sourceLabel}
          </p>
        )}
      </div>

      {/* Confirmation Banner after Successful Submission */}
      {latestConfirmation && (
        <div
          data-testid="estimate-confirmation-card"
          role="status"
          className="rounded-[24px] bg-[#F0FDF4] border border-[#DCFCE7] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-[12px] bg-[#14532D] text-white flex items-center justify-center shrink-0">
              <CalendarCheck2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#14532D]">
                ESTIMATE SCHEDULED · {latestConfirmation.referenceId}
              </p>
              <h2 className="mt-1 text-[22px] font-bold text-[#0F172A]">
                Walkthrough Request Confirmed for {latestConfirmation.contact.fullName}
              </h2>
              <p className="mt-1.5 text-[15px] leading-[22px] text-[#404941]">
                Our agronomy director will reach out to{' '}
                <span className="font-semibold text-[#0F172A]">{latestConfirmation.contact.email}</span>{' '}
                within one business day to confirm your measurement walkthrough at{' '}
                {latestConfirmation.contact.streetAddress}, {latestConfirmation.contact.cityZip}.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#404941]">
                ESTIMATED PLAN
              </p>
              <p className="text-[22px] font-extrabold text-[#14532D] tabular-nums">
                {formatCurrency(latestConfirmation.monthlyEstimate)} / mo
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLatestConfirmation(null)}
              className="h-11 px-4 rounded-[8px] border border-[#14532D] bg-white text-[#14532D] text-[13px] font-bold hover:bg-[#F8FAF8] cursor-pointer whitespace-nowrap"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main 12-Col Form + Sticky Live Measurement Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="lg:col-span-7 estate-card rounded-[24px] p-6 sm:p-8 space-y-8"
        >
          {/* Step 1: Property Classification (20px Circular Radios) */}
          <fieldset>
            <legend className="text-[18px] font-semibold text-[#0F172A]">
              01. Property Classification
            </legend>
            <p className="mt-1 text-[14px] text-[#404941]">
              Select the operating profile for your grounds.
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PROPERTY_TIERS.map((tier) => {
                const isSelected = draftConfig.propertyTier === tier;
                return (
                  <label
                    key={tier}
                    className={`flex items-center gap-3 p-3.5 rounded-[8px] border cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#F0FDF4] border-[#14532D]'
                        : 'bg-white border-[#CBD5E1] hover:border-[#14532D]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="propertyTier"
                      value={tier}
                      checked={isSelected}
                      onChange={() => onUpdateDraft({ ...draftConfig, propertyTier: tier })}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#14532D] border-[#14532D]'
                          : 'bg-white border-[#94A3B8]'
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                    <span className="text-[14px] font-semibold text-[#0F172A]">{tier}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Step 2: Turf Area, Cultivar & Service Frequency */}
          <div className="pt-6 border-t border-[#0F172A]/8 space-y-5">
            <div>
              <h2 className="text-[18px] font-semibold text-[#0F172A]">
                02. Property Measurements &amp; Turf Profile
              </h2>
              <p className="mt-1 text-[14px] text-[#404941]">
                Adjust approximate maintainable turf area to update your live estimate.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <label
                  htmlFor="turf-sqft-input"
                  className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#64748B]"
                >
                  Approximate Turf Area (Sq Ft)
                </label>
                <span className="text-[15px] font-bold text-[#14532D] tabular-nums">
                  {formatSqFt(draftConfig.squareFootage)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <input
                  type="range"
                  aria-label="Adjust turf square footage slider"
                  min={2500}
                  max={80000}
                  step={500}
                  value={Math.min(80000, Math.max(2500, draftConfig.squareFootage))}
                  onChange={(e) => {
                    onUpdateDraft({
                      ...draftConfig,
                      squareFootage: Number(e.target.value),
                    });
                    if (errors.squareFootage) {
                      setErrors((prev) => ({ ...prev, squareFootage: undefined }));
                    }
                  }}
                  className="sm:col-span-8 accent-[#14532D] h-2 cursor-pointer"
                />
                <input
                  id="turf-sqft-input"
                  type="number"
                  min={2500}
                  max={80000}
                  step={500}
                  value={draftConfig.squareFootage}
                  onChange={(e) => {
                    onUpdateDraft({
                      ...draftConfig,
                      squareFootage: Number(e.target.value),
                    });
                    if (errors.squareFootage) {
                      setErrors((prev) => ({ ...prev, squareFootage: undefined }));
                    }
                  }}
                  className={`sm:col-span-4 estate-input px-3.5 text-[15px] tabular-nums ${
                    errors.squareFootage ? 'estate-input-error' : ''
                  }`}
                />
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                {[8000, 16000, 32000, 54000].map((preset) => {
                  const isActive = draftConfig.squareFootage === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        onUpdateDraft({ ...draftConfig, squareFootage: preset });
                        if (errors.squareFootage) {
                          setErrors((prev) => ({ ...prev, squareFootage: undefined }));
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-[12px] font-semibold tabular-nums transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#14532D] text-white'
                          : 'bg-[#F2F4F2] text-[#404941] hover:bg-[#E6E9E7] hover:text-[#0F172A]'
                      }`}
                    >
                      {formatSqFt(preset)}
                    </button>
                  );
                })}
              </div>
              {errors.squareFootage && (
                <p role="alert" className="mt-1.5 text-[12px] font-medium text-[#BA1A1A] flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.squareFootage}</span>
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="turf-cultivar-select"
                  className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#64748B] mb-1.5"
                >
                  Primary Turf Cultivar
                </label>
                <select
                  id="turf-cultivar-select"
                  value={draftConfig.turfType}
                  onChange={(e) =>
                    onUpdateDraft({
                      ...draftConfig,
                      turfType: e.target.value as TurfCultivar,
                    })
                  }
                  className="estate-input w-full px-3.5 text-[15px]"
                >
                  {TURF_CULTIVARS.map((cultivar) => (
                    <option key={cultivar} value={cultivar}>
                      {cultivar}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="service-frequency-select"
                  className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#64748B] mb-1.5"
                >
                  Service Frequency
                </label>
                <select
                  id="service-frequency-select"
                  value={draftConfig.frequency}
                  onChange={(e) =>
                    onUpdateDraft({
                      ...draftConfig,
                      frequency: e.target.value as ServiceFrequency,
                    })
                  }
                  className="estate-input w-full px-3.5 text-[15px]"
                >
                  {FREQUENCIES.map((freq) => (
                    <option key={freq} value={freq}>
                      {freq}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Service Options (20px Square Checkboxes) */}
          <fieldset className="pt-6 border-t border-[#0F172A]/8">
            <legend className="text-[18px] font-semibold text-[#0F172A]">
              03. Included Service Options
            </legend>
            <p className="mt-1 text-[14px] text-[#404941]">
              Select every exterior discipline you want evaluated during your walkthrough.
            </p>

            <div className="mt-4 space-y-2.5">
              {ADD_ON_SERVICE_OPTIONS.map((option) => {
                const isChecked = draftConfig.selectedAddOns.includes(option.id);
                return (
                  <label
                    key={option.id}
                    className={`flex items-start gap-3.5 p-4 rounded-[8px] border cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-[#F0FDF4] border-[#14532D]'
                        : 'bg-white border-[#CBD5E1] hover:border-[#14532D]/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleAddOn(option.id)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 w-5 h-5 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-[#14532D] border-[#14532D] text-white'
                          : 'bg-white border-[#94A3B8]'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[15px] font-semibold text-[#0F172A]">
                          {option.label}
                        </span>
                        <span className="text-[13px] font-bold text-[#14532D] tabular-nums whitespace-nowrap">
                          {option.monthlyBase === 0
                            ? 'Included Base'
                            : `+${formatCurrency(option.monthlyBase)} / mo`}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[13px] text-[#404941]">{option.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>
            {errors.selectedAddOns && (
              <p role="alert" className="mt-2 text-[12px] font-medium text-[#BA1A1A] flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.selectedAddOns}</span>
              </p>
            )}
          </fieldset>

          {/* Step 4: Contact & Property Address Inputs (48px Estate Verve Inputs) */}
          <div className="pt-6 border-t border-[#0F172A]/8 space-y-4">
            <div>
              <h2 className="text-[18px] font-semibold text-[#0F172A]">
                04. Property &amp; Contact Information
              </h2>
              <p className="mt-1 text-[14px] text-[#404941]">
                Required to confirm your Middle Georgia site visit window.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="estimate-full-name"
                  className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#64748B] mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="estimate-full-name"
                  type="text"
                  value={contact.fullName}
                  onChange={(e) => {
                    setContact((prev) => ({ ...prev, fullName: e.target.value }));
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  placeholder="Margaret Holloway"
                  className={`estate-input w-full px-3.5 text-[15px] ${
                    errors.fullName ? 'estate-input-error' : ''
                  }`}
                />
                {errors.fullName && (
                  <p role="alert" className="mt-1.5 text-[12px] font-medium text-[#BA1A1A] flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="estimate-email"
                  className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#64748B] mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="estimate-email"
                  type="email"
                  value={contact.email}
                  onChange={(e) => {
                    setContact((prev) => ({ ...prev, email: e.target.value }));
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="margaret@hollowayestate.com"
                  className={`estate-input w-full px-3.5 text-[15px] ${
                    errors.email ? 'estate-input-error' : ''
                  }`}
                />
                {errors.email && (
                  <p role="alert" className="mt-1.5 text-[12px] font-medium text-[#BA1A1A] flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="estimate-phone"
                  className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#64748B] mb-1.5"
                >
                  Phone Number
                </label>
                <input
                  id="estimate-phone"
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => {
                    setContact((prev) => ({ ...prev, phone: e.target.value }));
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  placeholder="(478) 555-0182"
                  className={`estate-input w-full px-3.5 text-[15px] ${
                    errors.phone ? 'estate-input-error' : ''
                  }`}
                />
                {errors.phone && (
                  <p role="alert" className="mt-1.5 text-[12px] font-medium text-[#BA1A1A] flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="estimate-city-zip"
                  className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#64748B] mb-1.5"
                >
                  City &amp; ZIP Code
                </label>
                <input
                  id="estimate-city-zip"
                  type="text"
                  value={contact.cityZip}
                  onChange={(e) => {
                    setContact((prev) => ({ ...prev, cityZip: e.target.value }));
                    if (errors.cityZip) setErrors((prev) => ({ ...prev, cityZip: undefined }));
                  }}
                  placeholder="Macon, GA 31204"
                  className={`estate-input w-full px-3.5 text-[15px] ${
                    errors.cityZip ? 'estate-input-error' : ''
                  }`}
                />
                {errors.cityZip && (
                  <p role="alert" className="mt-1.5 text-[12px] font-medium text-[#BA1A1A] flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.cityZip}</span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="estimate-street-address"
                className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#64748B] mb-1.5"
              >
                Property Street Address
              </label>
              <input
                id="estimate-street-address"
                type="text"
                value={contact.streetAddress}
                onChange={(e) => {
                  setContact((prev) => ({ ...prev, streetAddress: e.target.value }));
                  if (errors.streetAddress) {
                    setErrors((prev) => ({ ...prev, streetAddress: undefined }));
                  }
                }}
                placeholder="412 Vineville Avenue"
                className={`estate-input w-full px-3.5 text-[15px] ${
                  errors.streetAddress ? 'estate-input-error' : ''
                }`}
              />
              {errors.streetAddress && (
                <p role="alert" className="mt-1.5 text-[12px] font-medium text-[#BA1A1A] flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.streetAddress}</span>
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="estimate-notes"
                className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-[#64748B] mb-1.5"
              >
                Gate Access, Pets, or Hardscape Notes (Optional)
              </label>
              <textarea
                id="estimate-notes"
                rows={3}
                value={contact.notes}
                onChange={(e) => setContact((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Share preferred walkthrough days, irrigation controller location, or drainage concerns."
                className="w-full px-3.5 py-2.5 bg-white border border-[#CBD5E1] text-[#0F172A] rounded-[8px] text-[15px] focus:outline-none focus:border-[#14532D] focus:ring-2 focus:ring-[#14532D]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="estate-btn-primary w-full sm:w-auto h-12 px-8 rounded-[8px] text-[14px] font-bold tracking-[0.02em] whitespace-nowrap cursor-pointer"
            >
              Submit Estimate Request
            </button>
          </div>
        </form>

        {/* Right Sticky Column: Live Property Measurement Summary + Saved Estimates Ledger */}
        <aside className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <PropertyMeasurementSummary
            title="Live Property Measurement Summary"
            subtitle="Preliminary scope based on your selected acreage and Middle Georgia turf profile."
            propertyTier={draftConfig.propertyTier}
            squareFootage={breakdown.squareFootage}
            turfType={draftConfig.turfType}
            frequency={draftConfig.frequency}
            irrigationZones={breakdown.recommendedIrrigationZones}
            crewHoursPerVisit={breakdown.crewHoursPerVisit}
            perVisitEstimate={breakdown.perVisitEstimate}
            monthlyEstimate={breakdown.monthlyEstimate}
            verifiedFlag={
              draftConfig.propertyTier === 'Commercial Campus'
                ? 'COMMERCIAL GRADE'
                : 'INSTANT ESTIMATE'
            }
          />

          {/* Scheduled Estimates Ledger */}
          <div className="estate-card rounded-[16px] p-6" data-testid="scheduled-estimates-list">
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#0F172A]/8">
              <h2 className="text-[16px] font-bold text-[#0F172A]">
                Scheduled Estimates ({savedEstimates.length})
              </h2>
              <span className="text-[12px] font-medium text-[#404941]">Saved on this device</span>
            </div>

            {savedEstimates.length === 0 ? (
              <p className="mt-4 text-[14px] leading-[22px] text-[#404941]">
                No estimate requests submitted yet. Complete the form to log your walkthrough
                appointment and keep a copy of your scope summary here.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {savedEstimates.map((item) => (
                  <li
                    key={item.referenceId}
                    className="p-4 rounded-[12px] bg-[#F8FAF8] border border-[#0F172A]/8 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#14532D]">
                          {item.referenceId} · {item.submittedAt}
                        </p>
                        <p className="text-[15px] font-bold text-[#0F172A]">
                          {item.contact.fullName}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onDeleteEstimate(item.referenceId)}
                        aria-label={`Remove estimate ${item.referenceId} for ${item.contact.fullName}`}
                        className="p-2 rounded-[6px] text-[#64748B] hover:text-[#BA1A1A] hover:bg-[#FFDAD6]/50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="text-[13px] text-[#404941]">
                      {item.contact.streetAddress}, {item.contact.cityZip}
                    </p>
                    <div className="pt-1 flex items-center justify-between gap-2 text-[13px] font-semibold">
                      <span className="text-[#404941] tabular-nums">
                        {formatSqFt(item.squareFootage)} · {item.turfType}
                      </span>
                      <span className="text-[#14532D] tabular-nums">
                        {formatCurrency(item.monthlyEstimate)} / mo
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
