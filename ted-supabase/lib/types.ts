export type PropertyType = 'apartment' | 'bedsitter' | 'studio' | 'house' | 'villa' | 'room';
export type OwnerType = 'owner' | 'agent';
export type VerifiedStatus = 'verified_owner' | 'verified_agent' | 'unverified';

export interface PropertyLocation {
  city:   string;
  area:   string;
  estate: string;
}

export interface PropertyRow {
  id:              string;
  title:           string;
  price:           number;
  location:        PropertyLocation;
  coordinates?:    { lat: number; lng: number } | null;
  property_type:   PropertyType;
  amenities:       string[];
  verified_status: VerifiedStatus;
  owner_type:      OwnerType;
  videos:          string[];
  images:          string[];
  whatsapp?:       string | null;
  phone?:          string | null;
  description?:    string | null;
  created_at:      string;
  updated_at:      string;
}

export type Property    = PropertyRow;
export type NewProperty = Omit<PropertyRow, 'id' | 'created_at' | 'updated_at'>;

export interface FilterState {
  area:          string;
  estate:        string;
  priceMin:      string;
  priceMax:      string;
  propertyType:  string;
  amenities:     string[];
}

export interface Database {
  public: {
    Tables: {
      properties: {
        Row:    PropertyRow;
        Insert: {
          id?:              string;
          title:            string;
          price:            number;
          location:         PropertyLocation;
          coordinates?:     { lat: number; lng: number } | null;
          property_type:    PropertyType;
          amenities?:       string[];
          verified_status?: VerifiedStatus;
          owner_type?:      OwnerType;
          videos?:          string[];
          images?:          string[];
          whatsapp?:        string | null;
          phone?:           string | null;
          description?:     string | null;
          created_at?:      string;
          updated_at?:      string;
        };
        Update: Partial<PropertyRow>;
      };
    };
    Views:     Record<string, never>;
    Functions: Record<string, never>;
    Enums:     Record<string, never>;
  };
}

export interface AuthUser {
  id:    string;
  email: string;
}
