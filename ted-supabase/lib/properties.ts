import { supabase } from '@/lib/supabase';
import { TABLES, STORAGE_BUCKETS } from '@/lib/constants';
import type { Property, NewProperty, FilterState, Database } from '@/lib/types';

// ─── Read ─────────────────────────────────────────────────────

export async function getProperties(filters?: Partial<FilterState>): Promise<Property[]> {
  let query = supabase
    .from(TABLES.PROPERTIES)
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.area)         query = query.filter('location->>area',  'eq', filters.area);
  if (filters?.estate)       query = query.filter('location->>estate','eq', filters.estate);
  if (filters?.propertyType) query = query.eq('property_type', filters.propertyType);
  if (filters?.priceMin)     query = query.gte('price', Number(filters.priceMin));
  if (filters?.priceMax)     query = query.lte('price', Number(filters.priceMax));
  if (filters?.amenities?.length) {
    query = query.overlaps('amenities', filters.amenities);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from(TABLES.PROPERTIES)
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data;
}

// ─── Storage ──────────────────────────────────────────────────

async function uploadFiles(
  files: FileList,
  bucket: string
): Promise<string[]> {
  const urls: string[] = [];

  for (const file of Array.from(files)) {
    const ext      = file.name.split('.').pop() ?? 'bin';
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { upsert: false });

    if (uploadError) throw new Error(uploadError.message);

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(uploadData.path);

    urls.push(urlData.publicUrl);
  }

  return urls;
}

// ─── Write ────────────────────────────────────────────────────

export async function addProperty(
  property: NewProperty,
  videoFiles: FileList | null,
  imageFiles: FileList | null
): Promise<void> {
  const videoUrls = videoFiles?.length
    ? await uploadFiles(videoFiles, STORAGE_BUCKETS.PROPERTY_VIDEOS)
    : [];

  const imageUrls = imageFiles?.length
    ? await uploadFiles(imageFiles, STORAGE_BUCKETS.PROPERTY_IMAGES)
    : [];

  const result = await supabase
    .from(TABLES.PROPERTIES)
    .insert({
      title:           property.title,
      price:           property.price,
      location:        property.location,
      property_type:   property.property_type,
      amenities:       property.amenities,
      verified_status: property.verified_status,
      owner_type:      property.owner_type,
      whatsapp:        property.whatsapp,
      phone:           property.phone,
      description:     property.description,
      videos:          videoUrls,
      images:          imageUrls
    } as any);
  
  const { error } = result;

  if (error) throw new Error(error.message);
}
