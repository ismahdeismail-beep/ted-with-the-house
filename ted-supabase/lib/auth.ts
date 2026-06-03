import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

/**
 * Sign in an existing user with email + password.
 * Throws an error on failure so call sites can catch and show messages.
 */
export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

/**
 * Register a new user with email + password.
 * Supabase sends a confirmation email if email confirmations are enabled.
 */
export async function registerWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

/**
 * Sign the current user out.
 */
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Subscribe to auth-state changes (replaces Firebase onAuthStateChanged).
 * Returns an unsubscribe function — use as the return value of useEffect.
 *
 * @example
 *   useEffect(() => onAuthStateChangedListener(setUser), []);
 */
export function onAuthStateChangedListener(callback: (user: User | null) => void) {
  // Fire once immediately with the current session
  supabase.auth.getSession().then(({ data }) => {
    callback(data.session?.user ?? null);
  });

  const {
    data: { subscription }
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}

/**
 * Returns the currently authenticated user, or null.
 */
export async function getCurrentUser(): Promise<User | null> {
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}
