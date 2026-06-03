// ─────────────────────────────────────────────────────────────
// App identity
// ─────────────────────────────────────────────────────────────
export const APP_NAME        = 'TED WITH THE HOUSE';
export const APP_DESCRIPTION = 'Modern real estate marketplace for rentals and sales.';

// ─────────────────────────────────────────────────────────────
// Navigation routes
// ─────────────────────────────────────────────────────────────
export const ROUTES = {
  HOME:       '/',
  PROPERTIES: '/properties',
  PROPERTY:   (id: string) => `/properties/${id}`,
  DASHBOARD:  '/dashboard',
  LOGIN:      '/login',
  REGISTER:   '/register'
} as const;

// ─────────────────────────────────────────────────────────────
// Supabase table / bucket names — single source of truth
// ─────────────────────────────────────────────────────────────
export const TABLES = {
  PROPERTIES: 'properties'
} as const;

export const STORAGE_BUCKETS = {
  PROPERTY_IMAGES: 'property-images'
} as const;

// ─────────────────────────────────────────────────────────────
// Property listing constants
// ─────────────────────────────────────────────────────────────
export const PROPERTY_TYPES = [
  { label: 'All',  value: 'all'  },
  { label: 'Rent', value: 'rent' },
  { label: 'Sale', value: 'sale' }
] as const;

export const PRICE_RANGES = [
  { label: 'All Prices',      value: 'all'         },
  { label: 'Under $2,000',    value: 'under-2000'  },
  { label: '$2,000 – $5,000', value: '2000-5000'   },
  { label: 'Above $5,000',    value: 'above-5000'  }
] as const;

export type PriceRange = (typeof PRICE_RANGES)[number]['value'];

// ─────────────────────────────────────────────────────────────
// Pagination
// ─────────────────────────────────────────────────────────────
export const PROPERTIES_PER_PAGE   = 12;
export const FEATURED_COUNT        = 6;

// ─────────────────────────────────────────────────────────────
// Accepted image MIME types for the dashboard upload
// ─────────────────────────────────────────────────────────────
export const ACCEPTED_IMAGE_TYPES = 'image/jpeg,image/png,image/webp,image/avif';
export const MAX_IMAGE_SIZE_MB    = 5;
