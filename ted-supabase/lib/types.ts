// ─────────────────────────────────────────────────────────────
// Supabase database shape
// Run `npx supabase gen types typescript --linked` to regenerate
// ─────────────────────────────────────────────────────────────

export type PropertyType = 'rent' | 'sale';

/** Row returned from the `properties` table */
export interface PropertyRow {
  id:          string;
  title:       string;
  price:       number;
  location:    string;
  images:      string[];
  description: string;
  type:        PropertyType;
  created_at:  string; // ISO-8601 string from Postgres
}

/** Convenience alias used across the app */
export type Property = PropertyRow;

/** Shape used when inserting a new listing (no id / created_at) */
export type NewProperty = Omit<PropertyRow, 'id' | 'created_at'>;

// ─────────────────────────────────────────────────────────────
// Supabase Database type (minimal hand-written version)
// Replace with the generated type once your schema is stable
// ─────────────────────────────────────────────────────────────
export interface Database {
  public: {
    Tables: {
      properties: {
        Row:    PropertyRow;
        Insert: Partial<PropertyRow> & NewProperty;
        Update: Partial<PropertyRow>;
      };
    };
    Views:     Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      property_type: PropertyType;
    };
  };
}

// ─────────────────────────────────────────────────────────────
// Auth helpers
// ─────────────────────────────────────────────────────────────
export interface AuthUser {
  id:    string;
  email: string;
}
