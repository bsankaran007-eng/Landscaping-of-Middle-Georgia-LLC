import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEstateEstimate,
  clampSquareFootage,
  filterItemsByCategory,
  formatCurrency,
  formatSqFt,
  validateEmergencyForm,
  validateEstimateForm,
} from './estimateCalculator';
import { ESTATE_SERVICES } from '../data/estateData';

test('calculateEstateEstimate scales monotonically with square footage and commercial tier', () => {
  const smallResidential = calculateEstateEstimate({
    propertyTier: 'Residential Estate',
    squareFootage: 8000,
    turfType: 'Centipede',
    frequency: 'Weekly Precision',
    selectedAddOns: ['turf-management'],
  });

  const largeCommercial = calculateEstateEstimate({
    propertyTier: 'Commercial Campus',
    squareFootage: 40000,
    turfType: 'Zeon Zoysia',
    frequency: 'Weekly Precision',
    selectedAddOns: ['turf-management', 'irrigation-calibration', 'arboriculture-monitoring'],
  });

  assert.equal(smallResidential.visitsPerMonth, 4);
  assert.ok(largeCommercial.perVisitEstimate > smallResidential.perVisitEstimate);
  assert.ok(largeCommercial.monthlyEstimate > smallResidential.monthlyEstimate);
  assert.ok(largeCommercial.crewHoursPerVisit > smallResidential.crewHoursPerVisit);
  assert.ok(largeCommercial.recommendedIrrigationZones > smallResidential.recommendedIrrigationZones);
});

test('clampSquareFootage enforces valid bounds', () => {
  assert.equal(clampSquareFootage(500), 2500);
  assert.equal(clampSquareFootage(150000), 80000);
  assert.equal(clampSquareFootage(14500), 14500);
});

test('filterItemsByCategory returns all items or exact category subset', () => {
  const all = filterItemsByCategory(ESTATE_SERVICES, 'All');
  const hardscaping = filterItemsByCategory(ESTATE_SERVICES, 'Hardscaping');
  assert.equal(all.length, ESTATE_SERVICES.length);
  assert.ok(hardscaping.length > 0);
  assert.ok(hardscaping.every((item) => item.category === 'Hardscaping'));
});

test('validateEstimateForm catches empty and invalid contact fields without bypassing', () => {
  const invalid = validateEstimateForm(
    {
      fullName: '',
      email: 'not-an-email',
      phone: '478-555',
      streetAddress: '12',
      cityZip: '',
      notes: '',
    },
    [],
    1000
  );

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.streetAddress);
  assert.ok(invalid.errors.cityZip);
  assert.ok(invalid.errors.selectedAddOns);
  assert.ok(invalid.errors.squareFootage);

  const valid = validateEstimateForm(
    {
      fullName: 'Clara Reynolds',
      email: 'clara@reynoldsestate.com',
      phone: '(478) 555-0194',
      streetAddress: '412 Vineville Avenue',
      cityZip: 'Macon, GA 31204',
      notes: 'Gate code available upon confirmation.',
    },
    ['turf-management', 'bed-shrub-architecture'],
    16500
  );

  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});

test('validateEmergencyForm enforces caller name, 10-digit phone, and address', () => {
  const invalid = validateEmergencyForm({
    callerName: 'A',
    phone: '12345',
    propertyAddress: '',
    hazardType: 'Fallen Tree on Structure',
    details: '',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.callerName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.propertyAddress);

  const valid = validateEmergencyForm({
    callerName: 'Marcus Vance',
    phone: '478-555-0148',
    propertyAddress: '890 Wesleyan Drive, Macon',
    hazardType: 'Blocked Driveway / Access',
    details: 'Large loblolly pine across front entry drive.',
  });
  assert.equal(valid.isValid, true);
});

test('formatting helpers format currency and square footage cleanly', () => {
  assert.equal(formatCurrency(1450), '$1,450');
  assert.equal(formatSqFt(16400), '16,400 sq ft');
});
