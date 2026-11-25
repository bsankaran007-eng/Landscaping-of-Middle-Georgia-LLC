---
name: Estate Verve
colors:
  surface: '#f8faf8'
  surface-dim: '#d8dad9'
  surface-bright: '#f8faf8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f2'
  surface-container: '#eceeec'
  surface-container-high: '#e6e9e7'
  surface-container-highest: '#e1e3e1'
  on-surface: '#191c1b'
  on-surface-variant: '#404941'
  inverse-surface: '#2e3130'
  inverse-on-surface: '#eff1ef'
  outline: '#717970'
  outline-variant: '#c0c9be'
  surface-tint: '#2e6a41'
  primary: '#003b1b'
  on-primary: '#ffffff'
  primary-container: '#14532d'
  on-primary-container: '#87c695'
  inverse-primary: '#96d5a3'
  secondary: '#006e2f'
  on-secondary: '#ffffff'
  secondary-container: '#6bff8f'
  on-secondary-container: '#007432'
  tertiary: '#2a3146'
  on-tertiary: '#ffffff'
  tertiary-container: '#40485d'
  on-tertiary-container: '#afb7d0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b1f2be'
  primary-fixed-dim: '#96d5a3'
  on-primary-fixed: '#00210d'
  on-primary-fixed-variant: '#12512c'
  secondary-fixed: '#6bff8f'
  secondary-fixed-dim: '#4ae176'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005321'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f8faf8'
  on-background: '#191c1b'
  surface-variant: '#e1e3e1'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 34px
    fontWeight: '800'
    lineHeight: 42px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses a high-end, reliable, and meticulously managed exterior living aesthetic for residential and commercial property owners across Middle Georgia. Combining **Modern Corporate** reliability with **Tactile/Clean Organic Minimalism**, the identity communicates craftsmanship, horticultural expertise, and unwavering attention to detail.

The visual tone replaces blue-collar informality with estate-grade professionalism. Interface surfaces feel crisp, structured, and luminous, prioritizing pristine natural greens, architectural slate, and polished card containers. Layouts mirror formal garden architecture: intentional, cleanly aligned, and deliberate in negative space.

## Colors

The palette establishes authoritative stability through deep forest undertones, energetic fresh growth accents, and architectural foundation darks.

- **Primary (`#14532D`)**: Deep Georgia Pine/Rich Emerald. Conveys estate stability, deep roots, and longevity. Used for major brand anchors, primary button fills, prominent header bars, and structural emphasis.
- **Secondary (`#22C55E`)**: Vibrant Fresh Lawn Accent. Delivers striking contrast for conversion badges, progress state markers, hover fills, and active notifications.
- **Tertiary (`#0F172A`)**: Deep Slate Charcoal. Grounds typographic hierarchies, high-contrast footers, and technical specification data. Never use pure black (`#000000`).
- **Neutral Base (`#F8FAF8`)**: Clean Alabaster Cream. Provides organic softness over clinical grey, preventing glare on outdoor mobile screens while retaining high perceived value.

Contrast rules require pure `#FFFFFF` for primary cards and elevated containers against the `#F8FAF8` canvas, bordered with subtle slate tints (`#0F172A`, 8% opacity).

## Typography

Plus Jakarta Sans is utilized holistically to present an open, modern, and sculpted architectural feel across all touchpoints.

- **Headlines & Display:** Tighter letter-spacing (`-0.01em` to `-0.02em`) creates an authoritative editorial feel suited for premium residential and commercial contracts.
- **Body:** Standard spacing paired with generous line-height ensure readability in bright sunlight for clients reviewing estimates or schedules on mobile devices.
- **Labels & Badges:** Uppercase treatments must be reserved solely for `label-sm` metadata flags (e.g., "COMMERCIAL GRADE", "SERVICE VERIFIED"), paired with `0.05em` letter tracking for instant visual categorization.

## Layout & Spacing

The layout is built upon a responsive 12-column fluid grid system bounded by a maximum container width of `1280px` for desktop screens.

- **Desktop (1024px+):** 12 columns, 1.5rem (`24px`) gutters, and 3rem (`48px`) outer margins. Content spreads with generous horizontal breathing room.
- **Tablet (768px - 1023px):** 8 columns, 1.5rem (`24px`) gutters, and 2rem (`32px`) margins. Two-column service and estimate cards scale to maintain balanced proportions.
- **Mobile (< 768px):** 4 columns, 1rem (`16px`) gutters, and 1.25rem (`20px`) margins. Grid tiles collapse to single-column cascades, locking call-to-actions to the lower safe area.

Component padding relies strictly on the `space-*` scale to maintain rhythm across quote forms, service cards, and property specifications.

## Elevation & Depth

Visual hierarchy uses **tonal layers** supported by **soft ambient tinted shadows** that reflect natural outdoor illumination rather than stark artificial drops.

- **Base Layer (Level 0):** Neutral Canvas (`#F8FAF8`).
- **Surface Elevation (Level 1):** Main Cards, Service Grids, and Quote Modules utilize pure `#FFFFFF` background, a 1px perimeter border in `#0F172A` at 6% opacity, and an ambient tinted shadow: `0 4px 20px -2px rgba(15, 23, 42, 0.05)`.
- **Interactive Hover & Modal (Level 2):** Elevated interactive components, property inspection sheets, and sticky consultation menus elevate with: `0 12px 32px -4px rgba(20, 83, 45, 0.12)`. The deep emerald tint in the shadow reinforces the horticultural aesthetic.
- **Overlays & Dialogs (Level 3):** Booking drawers and full gallery views use backdrop blurs (`backdrop-filter: blur(8px)`) tinted with `#0F172A` at 40% opacity.

## Shapes

The design uses geometric rounded corners (`roundedness: 2`, base `0.5rem` / `8px`) balancing organic landscape contours with structural estate boundaries.

- **Inputs, Service Badges, & Smaller Buttons:** `0.5rem` (`8px`) corner radius.
- **Service Cards, Media Panels, & Quote Modules:** `1rem` (`16px`, `rounded-lg`) corner radius.
- **Hero Highlights, Lead Conversion Modules, & Modal Sheets:** `1.5rem` (`24px`, `rounded-xl`) corner radius.
- **Filter Tags & Micro Status Indicators:** Fully rounded capsule styling (`9999px`) to distinguish categorical selectors from actionable cards.

## Components

### Buttons
- **Primary ("Schedule Estimate"):** Background `#14532D`, text `#FFFFFF`, font `label-lg`, height `48px`, padding `0 24px`. On hover: `#166534` with an ambient glow (`0 4px 14px rgba(20, 83, 45, 0.3)`).
- **Secondary ("Explore Portfolio"):** Background `#FFFFFF`, border `1.5px solid #14532D`, text `#14532D`, font `label-lg`. On hover: Background `#F0FDF4`.
- **Accent Urgent CTA ("Call Now / Emergency Tree Service"):** Background `#22C55E`, text `#0F172A`, font `label-lg`. Provides instantaneous mobile visibility.

### Service Badges & Chips
- **Service Type Badges:** Pill-shaped, background `#F0FDF4`, border `1px solid #DCFCE7`, text `#14532D`, font `label-md`. Includes an inline micro icon (e.g., leaf, shears, tractor).
- **Filter Chips (Residential / Commercial / Hardscaping):** Default `#FFFFFF` with `#E2E8F0` border. Selected state swaps to `#14532D` fill with white text.

### Cards
- **Landscape Service Cards:** Pure `#FFFFFF` background, `1rem` radius, subtle `1px solid rgba(15, 23, 42, 0.06)` border. Imagery sits edge-to-edge across the top with a subtle 3:2 ratio, followed by a `1.5rem` padding block containing service title, property types served, and an inline link with a trailing arrow.

### Forms & Input Fields
- **Estimate Request Inputs:** Height `48px`, `#FFFFFF` background, border `1px solid #CBD5E1`, text `#0F172A`, `0.5rem` corner radius. Focus state activates a `2px solid #14532D` ring with zero chromatic aberration. Floating labels use `label-sm` in `#64748B`.

### Checkboxes & Radio Selectors
- **Service Options:** Square (`20px`) for checkboxes, circular (`20px`) for radios. Unchecked: `#FFFFFF` with `#94A3B8` border. Checked: `#14532D` fill with `#FFFFFF` checkmark indicator.

### Additional Specialized Components
- **Property Measurement Summary:** Split-data rows for square footage, turf type, and weekly service frequency, with a slate background `#F1F5F9` and contrasting deep emerald readouts.
- **Before / After Split Sliders:** Framed in `rounded-lg` with a high-contrast `#FFFFFF` central drag pill accented by an emerald dividing rule.