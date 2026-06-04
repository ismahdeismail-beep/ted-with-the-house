export type PropertyType = 'rent' | 'sale';

export interface PropertyRow {
  id:          string;
  title:       string;
  price:       number;
  location:    string;
  images:      string[];
  description: string;
  type:        PropertyType;
  created_at:  string;
}

export type Property = PropertyRow;
export type NewProperty = Omit<PropertyRow, 'id' | 'created_at'>;

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: PropertyRow;
        Insert: {
          id?:         string;
          title:       string;
          price:       number;
          location:    string;
          images?:     string[];
          description: string;
          type:        PropertyType;
          created_at?: string;
        };
        Update: Partial<PropertyRow>;
      };
    };
    Views:     Record<string, never>;
    Functions: Record<string, never>;
    Enums:     { property_type: PropertyType };
  };
}

export interface AuthUser {
  id:    string;
  email: string;
}
