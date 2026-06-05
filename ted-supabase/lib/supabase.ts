import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types';

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

/**
 * Single shared Supabase client for the entire app.
 * Typed against the generated Database interface from lib/types.ts
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnon);
