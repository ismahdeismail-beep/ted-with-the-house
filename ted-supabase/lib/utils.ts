/**
 * Format a number as a USD price string.
 *
 * @example formatPrice(2500) → "$2,500"
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style:    'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Format a Postgres ISO-8601 timestamp (or any date-like value) as a
 * human-readable string.
 *
 * @example formatDate("2024-03-01T12:00:00Z") → "March 1, 2024"
 */
export function formatDate(value: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric'
  }).format(new Date(value));
}

/**
 * Truncate a string to `maxLength` characters, appending "…" if cut.
 */
export function truncate(text: string, maxLength = 120): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

/**
 * Return a CSS class string, filtering out falsy values.
 *
 * @example cn('rounded', isActive && 'bg-sky-500') → "rounded bg-sky-500"
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Return a fallback image URL when a property has no uploaded images.
 */
export const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80';
