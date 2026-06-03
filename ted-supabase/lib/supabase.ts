import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types';

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnon) {
  throw new Error(
    'Missing Supabase environment variables.\n' +
    'Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local'
  );
}

/**
 * Single shared Supabase client for the entire app.
 * Typed against the generated Database interface from lib/types.ts
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnon);
