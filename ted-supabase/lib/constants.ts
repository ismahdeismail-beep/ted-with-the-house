export const APP_NAME        = 'TED WITH THE HOUSE';
export const APP_DESCRIPTION = 'Discover Nairobi rentals through short property videos.';

export const ROUTES = {
  HOME:       '/',
  PROPERTIES: '/properties',
  PROPERTY:   (id: string) => `/properties/${id}`,
  DASHBOARD:  '/dashboard',
  LOGIN:      '/login',
  REGISTER:   '/register'
} as const;

export const TABLES = {
  PROPERTIES: 'properties'
} as const;

export const STORAGE_BUCKETS = {
  PROPERTY_IMAGES: 'property-images',
  PROPERTY_VIDEOS: 'property-videos'
} as const;

// ─── Nairobi Location Hierarchy ──────────────────────────────
export const NAIROBI_AREAS: Record<string, string[]> = {
  'Kasarani':     ['Roysambu', 'Safari Park', 'Zimmerman', 'Mirema', 'Githurai 44', 'Githurai 45'],
  'Westlands':    ['Parklands', 'Mountain View', 'Kangemi', 'Kinoo', 'Loresho'],
  'Kilimani':     ['Kileleshwa', 'Hurlingham', 'Upper Hill', 'Adams Arcade', 'Lavington'],
  'Ngong Road':   ['Karen', 'Dagoretti', 'Ngong', 'Rongai', 'Kiserian'],
  'South B / C':  ['South B', 'South C', 'Nyayo Estate'],
  'Embakasi':     ['Donholm', 'Umoja', 'Komarock', 'Kayole', 'Pipeline', 'Tassia'],
  'Ruaka':        ['Two Rivers', 'Banana', 'Limuru Road', 'Ndenderu'],
  'Langata':      ['Hardy', 'Otiende', 'Karen Hardy', 'Mugumoini'],
  'Thika Road':   ['Roasters', 'Kahawa West', 'Kahawa Sukari', 'Clay City', 'Muthaiga North'],
  'Eastlands':    ['Buruburu', 'Jogoo Road', 'Makadara', 'Maringo', 'Jerusalem'],
  'CBD / Nairobi West': ['Nairobi West', 'Milimani', 'Upper Hill', 'Community', 'Woodley'],
};

export const NAIROBI_AREA_NAMES = Object.keys(NAIROBI_AREAS);

// ─── Property Types ───────────────────────────────────────────
export const PROPERTY_TYPES = [
  { label: 'Apartment',  value: 'apartment'  },
  { label: 'Bedsitter',  value: 'bedsitter'  },
  { label: 'Studio',     value: 'studio'     },
  { label: 'House',      value: 'house'      },
  { label: 'Villa',      value: 'villa'      },
  { label: 'Single Room',value: 'room'       },
] as const;

// ─── Amenities ────────────────────────────────────────────────
export const AMENITIES = [
  { label: '📶 WiFi',         value: 'WiFi'        },
  { label: '🔒 Security',     value: 'Security'    },
  { label: '🛋️ Furnished',    value: 'Furnished'   },
  { label: '🚗 Parking',      value: 'Parking'     },
  { label: '⚡ Generator',    value: 'Generator'   },
  { label: '💧 Borehole',     value: 'Borehole'    },
  { label: '📹 CCTV',         value: 'CCTV'        },
  { label: '🏋️ Gym',          value: 'Gym'         },
  { label: '🏊 Swimming Pool',value: 'Pool'        },
  { label: '🛗 Elevator',     value: 'Elevator'    },
  { label: '♨️ Backup Water', value: 'Backup Water'},
  { label: '🌿 Garden',       value: 'Garden'      },
] as const;

export const AMENITY_VALUES = AMENITIES.map(a => a.value);

// ─── Price Ranges (KES) ───────────────────────────────────────
export const PRICE_RANGES = [
  { label: 'Under 10K',    min: 0,      max: 10000  },
  { label: '10K – 20K',    min: 10000,  max: 20000  },
  { label: '20K – 40K',    min: 20000,  max: 40000  },
  { label: '40K – 80K',    min: 40000,  max: 80000  },
  { label: 'Above 80K',    min: 80000,  max: 999999 },
] as const;

// ─── Trust / Verification ─────────────────────────────────────
export const VERIFIED_LABELS = {
  verified_owner: '✓ Verified Owner',
  verified_agent: '✓ Verified Agent',
  unverified:     'Unverified',
} as const;

export const VERIFIED_COLORS = {
  verified_owner: 'bg-green-500',
  verified_agent: 'bg-sky-500',
  unverified:     'bg-zinc-500',
} as const;

// ─── Media ────────────────────────────────────────────────────
export const ACCEPTED_IMAGE_TYPES = 'image/jpeg,image/png,image/webp,image/avif';
export const ACCEPTED_VIDEO_TYPES = 'video/mp4,video/webm,video/quicktime';
export const MAX_VIDEOS           = 3;
export const MAX_IMAGES           = 5;
export const MAX_FILE_SIZE_MB     = 50;

export const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1080&q=80';
