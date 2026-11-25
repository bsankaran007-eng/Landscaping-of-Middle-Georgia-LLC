import type {
  AddOnServiceId,
  PropertyTier,
  ServiceCategory,
  ServiceFrequency,
  TurfCultivar,
} from '../data/estateData';
import { ADD_ON_SERVICE_OPTIONS } from '../data/estateData';

export interface EstimateInput {
  propertyTier: PropertyTier;
  squareFootage: number;
  turfType: TurfCultivar;
  frequency: ServiceFrequency;
  selectedAddOns: AddOnServiceId[];
}

export interface EstimateBreakdown {
  squareFootage: number;
  visitsPerMonth: number;
  perVisitEstimate: number;
  monthlyEstimate: number;
  crewHoursPerVisit: number;
  recommendedIrrigationZones: number;
  tierLabel: PropertyTier;
}

export interface EstimateContactForm {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  cityZip: string;
  notes: string;
}

export interface ValidationResult<T extends string> {
  isValid: boolean;
  errors: Partial<Record<T, string>>;
}

export interface EmergencyDispatchForm {
  callerName: string;
  phone: string;
  propertyAddress: string;
  hazardType: 'Fallen Tree on Structure' | 'Blocked Driveway / Access' | 'Hanging Storm Limb' | 'Root Heave / Leaning Pine';
  details: string;
}

const TIER_MULTIPLIER: Record<PropertyTier, number> = {
  'Residential Estate': 1.0,
  'Commercial Campus': 1.15,
  'HOA / Multi-Family': 1.1,
};

const TURF_MULTIPLIER: Record<TurfCultivar, number> = {
  'Zeon Zoysia': 1.12,
  'Tifway 419 Bermuda': 1.06,
  Centipede: 0.96,
  'Tall Fescue': 1.08,
};

const FREQUENCY_CONFIG: Record<
  ServiceFrequency,
  { visitsPerMonth: number; rateMultiplier: number }
> = {
  'Weekly Precision': { visitsPerMonth: 4, rateMultiplier: 1.0 },
  'Bi-Weekly Estate': { visitsPerMonth: 2, rateMultiplier: 1.12 },
  'Seasonal Program': { visitsPerMonth: 1, rateMultiplier: 1.35 },
};

export function clampSquareFootage(sqFt: number): number {
  if (!Number.isFinite(sqFt)) return 10000;
  return Math.min(80000, Math.max(2500, Math.round(sqFt)));
}

export function calculateEstateEstimate(input: EstimateInput): EstimateBreakdown {
  const safeSqFt = clampSquareFootage(input.squareFootage);
  const tierFactor = TIER_MULTIPLIER[input.propertyTier];
  const turfFactor = TURF_MULTIPLIER[input.turfType];
  const freq = FREQUENCY_CONFIG[input.frequency];

  // Base per-visit calculation: $65 base mobilization + $4.20 per 1,000 sq ft scaled by tier & cultivar
  const baseVisit = (65 + (safeSqFt / 1000) * 4.2) * tierFactor * turfFactor * freq.rateMultiplier;
  const perVisitEstimate = Math.round(baseVisit / 5) * 5;

  const addOnMonthlyTotal = input.selectedAddOns.reduce((sum, id) => {
    const match = ADD_ON_SERVICE_OPTIONS.find((opt) => opt.id === id);
    if (!match) return sum;
    // Scale add-on modestly for large properties above 15,000 sq ft
    const areaScale = safeSqFt > 15000 ? 1 + (safeSqFt - 15000) / 50000 : 1;
    return sum + match.monthlyBase * areaScale;
  }, 0);

  const monthlyEstimate = Math.round((perVisitEstimate * freq.visitsPerMonth + addOnMonthlyTotal) / 5) * 5;
  const crewHoursPerVisit = Number(
    Math.max(1.0, (safeSqFt / 5200) * (input.selectedAddOns.length > 2 ? 1.25 : 1.0)).toFixed(1)
  );
  const recommendedIrrigationZones = Math.max(4, Math.min(28, Math.round(safeSqFt / 2200)));

  return {
    squareFootage: safeSqFt,
    visitsPerMonth: freq.visitsPerMonth,
    perVisitEstimate,
    monthlyEstimate,
    crewHoursPerVisit,
    recommendedIrrigationZones,
    tierLabel: input.propertyTier,
  };
}

export function filterItemsByCategory<T extends { category: Exclude<ServiceCategory, 'All'> }>(
  items: T[],
  category: ServiceCategory
): T[] {
  if (category === 'All') return items;
  return items.filter((item) => item.category === category);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function countDigits(value: string): number {
  return value.replace(/\D/g, '').length;
}

export function validateEstimateForm(
  form: EstimateContactForm,
  selectedAddOns: AddOnServiceId[],
  squareFootage: number
): ValidationResult<keyof EstimateContactForm | 'selectedAddOns' | 'squareFootage'> {
  const errors: Partial<
    Record<keyof EstimateContactForm | 'selectedAddOns' | 'squareFootage', string>
  > = {};

  if (form.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address (e.g., name@domain.com).';
  }

  if (countDigits(form.phone) < 10) {
    errors.phone = 'Please enter a valid 10-digit phone number.';
  }

  if (form.streetAddress.trim().length < 5) {
    errors.streetAddress = 'Please enter the property street address.';
  }

  if (form.cityZip.trim().length < 3) {
    errors.cityZip = 'Please enter city or ZIP code (e.g., Macon, GA 31204).';
  }

  if (selectedAddOns.length === 0) {
    errors.selectedAddOns = 'Select at least one service option for your property.';
  }

  if (!Number.isFinite(squareFootage) || squareFootage < 2500 || squareFootage > 80000) {
    errors.squareFootage = 'Enter a turf area between 2,500 and 80,000 sq ft.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateEmergencyForm(
  form: EmergencyDispatchForm
): ValidationResult<keyof EmergencyDispatchForm> {
  const errors: Partial<Record<keyof EmergencyDispatchForm, string>> = {};

  if (form.callerName.trim().length < 2) {
    errors.callerName = 'Enter a contact name for the dispatch crew.';
  }

  if (countDigits(form.phone) < 10) {
    errors.phone = 'Enter a 10-digit mobile number for crew arrival updates.';
  }

  if (form.propertyAddress.trim().length < 5) {
    errors.propertyAddress = 'Enter the property address needing storm dispatch.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatSqFt(sqFt: number): string {
  return `${new Intl.NumberFormat('en-US').format(Math.round(sqFt))} sq ft`;
}
