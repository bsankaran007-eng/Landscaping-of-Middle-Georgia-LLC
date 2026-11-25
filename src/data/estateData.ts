export type ServiceCategory = 'All' | 'Residential' | 'Commercial' | 'Hardscaping';

export type PropertyTier = 'Residential Estate' | 'Commercial Campus' | 'HOA / Multi-Family';

export type TurfCultivar = 'Zeon Zoysia' | 'Tifway 419 Bermuda' | 'Centipede' | 'Tall Fescue';

export type ServiceFrequency = 'Weekly Precision' | 'Bi-Weekly Estate' | 'Seasonal Program';

export type AddOnServiceId =
  | 'turf-management'
  | 'bed-shrub-architecture'
  | 'hardscape-care'
  | 'irrigation-calibration'
  | 'arboriculture-monitoring';

export interface EstateService {
  id: string;
  code: string;
  title: string;
  category: Exclude<ServiceCategory, 'All'>;
  serviceBadgeLabel: string;
  propertyTypes: string;
  shortDescription: string;
  fullSpecification: string;
  cadence: string;
  startingRateLabel: string;
  image: string;
  imageAlt: string;
  deliverables: string[];
  linkedAddOnId: AddOnServiceId;
  recommendedSqFt: number;
  recommendedTier: PropertyTier;
}

export interface PortfolioProject {
  id: string;
  title: string;
  location: string;
  category: Exclude<ServiceCategory, 'All'>;
  completionQuarter: string;
  summary: string;
  outcomeMetric: string;
  image: string;
  imageAlt: string;
  beforeImage?: string;
  afterImage?: string;
  measurements: {
    squareFootage: number;
    turfType: TurfCultivar;
    frequency: ServiceFrequency;
    irrigationZones: number;
    crewHoursPerVisit: number;
  };
  scopeHighlights: string[];
  recommendedTier: PropertyTier;
  linkedAddOns: AddOnServiceId[];
}

export interface AgronomyPhase {
  season: string;
  months: string;
  focusTitle: string;
  soilTemp: string;
  protocols: string[];
}

export interface ClientTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  property: string;
  metricBadge: string;
}

export const ESTATE_IMAGES = {
  hero: '/src/assets/images/hero_estate_lawn_1795608974781.jpg',
  turfCare: '/src/assets/images/service_turf_care_1795608976999.jpg',
  hardscaping: '/src/assets/images/service_hardscaping_1795608975603.jpg',
  commercial: '/src/assets/images/service_commercial_grounds_1795608976167.jpg',
  arborIrrigation: '/src/assets/images/service_irrigation_arbor_1795608976505.jpg',
  transformBefore: '/src/assets/images/transform_before_1795608978937.jpg',
  transformAfter: '/src/assets/images/transform_after_1795608977566.jpg',
} as const;

export const ESTATE_SERVICES: EstateService[] = [
  {
    id: 'precision-turf',
    code: '01',
    title: 'Precision Turf Architecture',
    category: 'Residential',
    serviceBadgeLabel: 'Turf Care',
    propertyTypes: 'Private Estates · Lakefront Residences',
    shortDescription:
      'Calibrated reel and rotary mowing, directional striping, soil pH balancing, and seven-step Middle Georgia agronomy.',
    fullSpecification:
      'Engineered specifically for Middle Georgia clay soils and warm-season cultivars. Crews mow on strict weekly intervals with sharpened blades, alternating striping vectors to eliminate rutting while applying custom micronutrient and pre-emergent schedules.',
    cadence: '42 scheduled visits / year',
    startingRateLabel: 'From $340 / mo',
    image: ESTATE_IMAGES.turfCare,
    imageAlt: 'Precision-striped emerald green estate lawn beside curved stone garden edging',
    deliverables: [
      'Weekly directional striping calibrated to cultivar height (1.25"–2.5")',
      'Steel-blade bed edging and debris removal from all hardscapes',
      'Annual Georgia soil lab testing with tailored lime & fertilizer amendments',
      'Pre-emergent crabgrass and broadleaf barrier treatments',
    ],
    linkedAddOnId: 'turf-management',
    recommendedSqFt: 14000,
    recommendedTier: 'Residential Estate',
  },
  {
    id: 'architectural-hardscaping',
    code: '02',
    title: 'Stone Terraces & Outdoor Living',
    category: 'Hardscaping',
    serviceBadgeLabel: 'Hardscaping',
    propertyTypes: 'Estate Courtyards · Pool Decks · Retaining Walls',
    shortDescription:
      'Bluestone terraces, mortared fieldstone seating walls, architectural fire features, and sub-surface storm drainage.',
    fullSpecification:
      'Every masonry installation starts with laser-leveled grading, compacted aggregate base layers, and integrated French drainage so Georgia summer downpours never undermine walkways or patios.',
    cadence: 'Design-build turnkey delivery',
    startingRateLabel: 'From $18,500',
    image: ESTATE_IMAGES.hardscaping,
    imageAlt: 'Custom bluestone and limestone patio terrace with curved stacked fieldstone wall and fire feature',
    deliverables: [
      '3D elevation grading plan and stone quarry material sampling',
      '6-inch compacted crushed granite sub-base with geotextile stabilization',
      'Natural bluestone, travertine, or architectural limestone laying',
      'Low-voltage solid brass step and perimeter accent lighting',
    ],
    linkedAddOnId: 'hardscape-care',
    recommendedSqFt: 12000,
    recommendedTier: 'Residential Estate',
  },
  {
    id: 'commercial-grounds',
    code: '03',
    title: 'Commercial Campus Management',
    category: 'Commercial',
    serviceBadgeLabel: 'Commercial Grade',
    propertyTypes: 'Corporate Parks · Medical Plazas · Private Schools',
    shortDescription:
      'Uniformed morning crews, seasonal color rotations, irrigation audits, and documented monthly site walk reports.',
    fullSpecification:
      'Designed for asset managers and executive campuses across Macon and Warner Robins who demand predictable budgets, zero tenant disruption, and immaculate entrance presentation year-round.',
    cadence: '52-week SLA coverage',
    startingRateLabel: 'From $1,650 / mo',
    image: ESTATE_IMAGES.commercial,
    imageAlt: 'Manicured corporate office campus exterior with terraced lawns and symmetrical trimmed hedges',
    deliverables: [
      'Dedicated account agronomist with monthly photo-verified site audits',
      'Pre-business-hours mowing windows to keep visitor lots clear',
      'Biannual seasonal floral rotations at primary monument signage',
      '24/7 priority storm clearance for campus drive lanes',
    ],
    linkedAddOnId: 'turf-management',
    recommendedSqFt: 45000,
    recommendedTier: 'Commercial Campus',
  },
  {
    id: 'horticultural-beds',
    code: '04',
    title: 'Horticultural Pruning & Estate Beds',
    category: 'Residential',
    serviceBadgeLabel: 'Ornamental Care',
    propertyTypes: 'Historic Homes · Formal Gardens · HOA Entrances',
    shortDescription:
      'Hand-pruned boxwoods and hydrangeas, long-needle Georgia pine straw installation, and perennial bloom curation.',
    fullSpecification:
      'Preserving formal garden geometry without over-shearing. Our horticulturists selectively hand-prune specimen shrubs, manage fungal pressure in humid summers, and edge beds with crisp 3-inch trench lines.',
    cadence: 'Bi-weekly ornamental visits',
    startingRateLabel: 'From $280 / mo',
    image: ESTATE_IMAGES.arborIrrigation,
    imageAlt: 'Mature Southern live oak canopy over manicured boxwoods, white hydrangeas, and pine straw beds',
    deliverables: [
      'Selective hand-pruning timed to flowering cycles for hydrangeas & camellias',
      'Biannual long-needle Georgia pine straw or triple-shredded hardwood mulch',
      'Targeted systemic protection for boxwood blight and scale insects',
      'Hand-weeding and deep root organic compost top-dressing',
    ],
    linkedAddOnId: 'bed-shrub-architecture',
    recommendedSqFt: 10500,
    recommendedTier: 'Residential Estate',
  },
  {
    id: 'irrigation-drainage',
    code: '05',
    title: 'Smart Irrigation & Drainage Systems',
    category: 'Commercial',
    serviceBadgeLabel: 'Water Systems',
    propertyTypes: 'Commercial Campuses · Athletic Turf · Large Estates',
    shortDescription:
      'Weather-synced smart controllers, pressure-regulated rotors, backflow testing, and French drain grading.',
    fullSpecification:
      'Eliminate dry zones and wasted municipal water bills. We audit precipitation rates across every valve zone, upgrade aging heads to pressure-regulated nozzles, and connect rain/soil moisture sensors.',
    cadence: 'Quarterly system audits',
    startingRateLabel: 'Audits from $225 / visit',
    image: ESTATE_IMAGES.hero,
    imageAlt: 'Sunlit estate residence with healthy irrigated emerald lawn and sculpted garden border',
    deliverables: [
      'Zone-by-zone pressure and head-to-head coverage audit',
      'Evapotranspiration smart controller installation and seasonal programming',
      'Certified backflow preventer inspection and winterization blowout',
      'Sub-surface catch basins and dry creek bed erosion mitigation',
    ],
    linkedAddOnId: 'irrigation-calibration',
    recommendedSqFt: 24000,
    recommendedTier: 'Commercial Campus',
  },
  {
    id: 'arboriculture-storm',
    code: '06',
    title: 'Certified Arboriculture & Canopy Care',
    category: 'Hardscaping',
    serviceBadgeLabel: 'Tree & Storm Care',
    propertyTypes: 'Wooded Estates · Commercial Buffers · Historic Oaks',
    shortDescription:
      'ISA-guided structural canopy elevation, deadwood clearance, root-zone aeration, and rapid storm hazard dispatch.',
    fullSpecification:
      'Protecting mature Southern pines, magnolias, and live oaks while safeguarding roofs, terraces, and turf sunlight corridors. Includes 24-hour rapid dispatch during severe Middle Georgia wind events.',
    cadence: 'Annual inspection + on-call dispatch',
    startingRateLabel: 'Assessments from $295',
    image: ESTATE_IMAGES.arborIrrigation,
    imageAlt: 'Sculpted mature Southern live oak tree canopies framing an estate lawn',
    deliverables: [
      'Crown thinning and elevation to restore turf sunlight penetration',
      'Hazardous limb cabling, bracing, and deadwood removal',
      'Air-spade root collar excavation and deep vertical mulching',
      'Priority emergency fallen-tree clearing for enrolled estate clients',
    ],
    linkedAddOnId: 'arboriculture-monitoring',
    recommendedSqFt: 18000,
    recommendedTier: 'Residential Estate',
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'vineville-historic-estate',
    title: 'Vineville Historic Estate Revival',
    location: 'Macon, GA',
    category: 'Residential',
    completionQuarter: 'Completed Q3 2026',
    summary:
      'Complete backyard re-grading, 16,400 sq ft Zeon Zoysia sod conversion, limestone entertaining terrace, and boxwood parterre installation.',
    outcomeMetric: '98% turf density within 8 weeks · -34% irrigation water use',
    image: ESTATE_IMAGES.transformAfter,
    imageAlt: 'Renovated Southern estate backyard with striped Zoysia lawn and limestone patio terrace',
    beforeImage: ESTATE_IMAGES.transformBefore,
    afterImage: ESTATE_IMAGES.transformAfter,
    measurements: {
      squareFootage: 16400,
      turfType: 'Zeon Zoysia',
      frequency: 'Weekly Precision',
      irrigationZones: 8,
      crewHoursPerVisit: 3.5,
    },
    scopeHighlights: [
      'Removed 22 cubic yards of compacted clay and installed amended topsoil blend',
      'Built 920 sq ft honed limestone terrace with integrated boxwood perimeter',
      'Converted 8-zone irrigation to smart evapotranspiration controller',
    ],
    recommendedTier: 'Residential Estate',
    linkedAddOns: ['turf-management', 'bed-shrub-architecture', 'irrigation-calibration'],
  },
  {
    id: 'lake-oconee-terrace',
    title: 'Reynolds Point Bluestone Courtyard',
    location: 'Lake Oconee, GA',
    category: 'Hardscaping',
    completionQuarter: 'Completed Q2 2026',
    summary:
      'Curved stacked-fieldstone amphitheater seating wall, architectural gas fire table, and low-voltage brass lighting overlooking the lake.',
    outcomeMetric: '1,450 sq ft permeable hardscape · Zero runoff erosion',
    image: ESTATE_IMAGES.hardscaping,
    imageAlt: 'Curved stacked fieldstone seating wall and bluestone patio with minimalist fire table',
    beforeImage: ESTATE_IMAGES.transformBefore,
    afterImage: ESTATE_IMAGES.hardscaping,
    measurements: {
      squareFootage: 11800,
      turfType: 'Zeon Zoysia',
      frequency: 'Bi-Weekly Estate',
      irrigationZones: 6,
      crewHoursPerVisit: 2.5,
    },
    scopeHighlights: [
      'Thermal-finished Pennsylvania bluestone pavers over compacted granite base',
      'Custom 28-linear-foot dry-stacked Georgia fieldstone curved seating wall',
      'Ornamental fountain grass and dwarf yaupon holly buffer plantings',
    ],
    recommendedTier: 'Residential Estate',
    linkedAddOns: ['hardscape-care', 'bed-shrub-architecture'],
  },
  {
    id: 'river-crossing-campus',
    title: 'River Crossing Executive Campus',
    location: 'North Macon, GA',
    category: 'Commercial',
    completionQuarter: 'Ongoing 3-Year Contract',
    summary:
      'Multi-building Class-A commercial campus grounds management featuring terraced Bermuda lawns, geometric holly hedges, and seasonal entry color.',
    outcomeMetric: '100% SLA on-time score across 104 consecutive visits',
    image: ESTATE_IMAGES.commercial,
    imageAlt: 'Executive corporate campus with terraced green lawns and clean walkways',
    beforeImage: ESTATE_IMAGES.transformBefore,
    afterImage: ESTATE_IMAGES.commercial,
    measurements: {
      squareFootage: 54000,
      turfType: 'Tifway 419 Bermuda',
      frequency: 'Weekly Precision',
      irrigationZones: 18,
      crewHoursPerVisit: 7.5,
    },
    scopeHighlights: [
      'Early-morning 6:00 AM crew rotation completed before employee arrival',
      'Monthly digital inspection scorecard delivered to facility leadership',
      'Automated leak detection saving 410,000 gallons annually',
    ],
    recommendedTier: 'Commercial Campus',
    linkedAddOns: ['turf-management', 'irrigation-calibration', 'arboriculture-monitoring'],
  },
  {
    id: 'warner-robins-oak-manor',
    title: 'Houston Lake Canopy & Garden Manor',
    location: 'Warner Robins, GA',
    category: 'Residential',
    completionQuarter: 'Completed Q1 2026',
    summary:
      'Mature live oak canopy elevation paired with formal hydrangea beds, cut-granite edging, and shade-tolerant turf rejuvenation.',
    outcomeMetric: '+45% turf sunlight penetration · 14 specimen oaks preserved',
    image: ESTATE_IMAGES.arborIrrigation,
    imageAlt: 'Live oak trees over blooming white hydrangeas and cleanly edged stone borders',
    measurements: {
      squareFootage: 22500,
      turfType: 'Zeon Zoysia',
      frequency: 'Weekly Precision',
      irrigationZones: 10,
      crewHoursPerVisit: 4.5,
    },
    scopeHighlights: [
      'Selective structural crown lifting across 14 mature Southern oaks',
      'Installed 180 linear feet of mortared granite bed curbing',
      'Deep-root organic feeding and annual long-needle pine straw refresh',
    ],
    recommendedTier: 'Residential Estate',
    linkedAddOns: ['bed-shrub-architecture', 'arboriculture-monitoring', 'turf-management'],
  },
];

export const AGRONOMY_CALENDAR: AgronomyPhase[] = [
  {
    season: 'Spring',
    months: 'March – May',
    focusTitle: 'Emergence & Pre-Emergent Barrier',
    soilTemp: '55°F–68°F Soil',
    protocols: [
      'Split pre-emergent application before soil reaches 55°F',
      'Scalp dormant Bermuda & verify rotary/reel cut height',
      'Spring irrigation startup & head pressure calibration',
    ],
  },
  {
    season: 'Summer',
    months: 'June – August',
    focusTitle: 'Peak Growth & Heat Resilience',
    soilTemp: '72°F–84°F Soil',
    protocols: [
      'Weekly directional striping with iron-rich slow-release feed',
      'Core aeration & sand top-dressing for Zoysia/Bermuda',
      'Preventative fungus & armyworm scouting during humidity spikes',
    ],
  },
  {
    season: 'Autumn',
    months: 'September – November',
    focusTitle: 'Root Fortification & Dormancy Prep',
    soilTemp: '65°F–50°F Soil',
    protocols: [
      'Potassium-weighted winterizer & fall pre-emergent barrier',
      'Fresh long-needle Georgia pine straw installation in all beds',
      'Aeration and Tall Fescue overseeding for shaded estates',
    ],
  },
  {
    season: 'Winter',
    months: 'December – February',
    focusTitle: 'Structural Arboriculture & Masonry',
    soilTemp: '42°F–52°F Soil',
    protocols: [
      'Dormant structural tree pruning and oak canopy elevation',
      'Soil pH testing and dolomitic lime soil correction',
      'Hardscape sealing, drainage grading, and patio builds',
    ],
  },
];

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'test-1',
    quote:
      'Before Estate Verve, our back lawn turned muddy after every Macon storm and two previous landscapers skipped visits without notice. Within one season they re-graded our drainage, laid Zeon Zoysia, and now our crew arrives every Tuesday at 8:00 AM with photo verification.',
    author: 'Margaret Holloway',
    role: 'Homeowner & Preservation Board Member',
    property: 'Vineville Historic District, Macon',
    metricBadge: '16,400 sq ft · Weekly Precision',
  },
  {
    id: 'test-2',
    quote:
      'Managing a three-building corporate campus means curb appeal directly reflects our tenants’ brand. Estate Verve cut our irrigation water spend by 29% in the first year while maintaining zero missed service windows across 52 weeks.',
    author: 'David Kendrick',
    role: 'Director of Facilities',
    property: 'River Crossing Executive Park, North Macon',
    metricBadge: '54,000 sq ft · Commercial SLA',
  },
];

export const ADD_ON_SERVICE_OPTIONS: {
  id: AddOnServiceId;
  label: string;
  description: string;
  monthlyBase: number;
}[] = [
  {
    id: 'turf-management',
    label: 'Precision Turf & Agronomy',
    description: 'Directional mowing, steel edging, blowing, and 7-step fertilization.',
    monthlyBase: 0,
  },
  {
    id: 'bed-shrub-architecture',
    label: 'Ornamental Bed & Shrub Pruning',
    description: 'Hand-pruning, seasonal pine straw/mulch refresh, and bed weed control.',
    monthlyBase: 145,
  },
  {
    id: 'hardscape-care',
    label: 'Stone Terrace & Hardscape Care',
    description: 'Polymeric joint inspection, gentle washdown, and perimeter weed sealing.',
    monthlyBase: 110,
  },
  {
    id: 'irrigation-calibration',
    label: 'Smart Irrigation Auditing',
    description: 'Quarterly valve audit, rain-sensor sync, and winterization service.',
    monthlyBase: 95,
  },
  {
    id: 'arboriculture-monitoring',
    label: 'Canopy & Storm Priority Plan',
    description: 'Annual structural tree inspection plus 24-hour emergency storm dispatch.',
    monthlyBase: 120,
  },
];
