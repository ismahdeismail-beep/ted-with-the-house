export function formatPrice(price: number): string {
  return `KES ${new Intl.NumberFormat('en-KE').format(price)}/mo`;
}

export function formatDate(value: string | Date): string {
  return new Intl.DateTimeFormat('en-KE', {
    year: 'numeric', month: 'long', day: 'numeric'
  }).format(new Date(value));
}

export function timeAgo(value: string | Date): string {
  const diff  = Date.now() - new Date(value).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (days  > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (mins  > 0) return `${mins}m ago`;
  return 'Just now';
}

export function truncate(text: string, max = 100): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function buildWhatsAppLink(phone: string, title: string, price: number): string {
  const clean = phone.replace(/\D/g, '');
  const msg   = encodeURIComponent(
    `Hi! I'm interested in your listing: *${title}* at KES ${price.toLocaleString()}/mo. Is it still available?`
  );
  return `https://wa.me/${clean}?text=${msg}`;
}
