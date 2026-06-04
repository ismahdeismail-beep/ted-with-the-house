import { supabase } from '@/lib/supabase';
import { TABLES, STORAGE_BUCKETS } from '@/lib/constants';
import type { Property, NewProperty } from '@/lib/types';

export async function getProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from(TABLES.PROPERTIES)
    .select('*')
    .order('created_at', { ascending: false });
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

async function uploadPropertyImages(files: FileList): Promise<string[]> {
  const urls: string[] = [];
  for (const file of Array.from(files)) {
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '-')}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKETS.PROPERTY_IMAGES)
      .upload(fileName, file, { upsert: false });
    if (uploadError) throw new Error(uploadError.message);
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKETS.PROPERTY_IMAGES)
      .getPublicUrl(uploadData.path);
    urls.push(urlData.publicUrl);
  }
  return urls;
}

export async function addProperty(
  property: NewProperty,
  images: FileList
): Promise<void> {
  const imageUrls = await uploadPropertyImages(images);
  const { error } = await supabase.from(TABLES.PROPERTIES).insert({
    title:       property.title,
    price:       property.price,
    location:    property.location,
    description: property.description,
    type:        property.type,
    images:      imageUrls
  });
  if (error) throw new Error(error.message);
}
