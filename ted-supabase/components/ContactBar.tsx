'use client';

import { buildWhatsAppLink } from '@/lib/utils';
import type { Property } from '@/lib/types';

interface ContactBarProps {
  property: Property;
}

export default function ContactBar({ property }: ContactBarProps) {
  const waLink = property.whatsapp
    ? buildWhatsAppLink(property.whatsapp, property.title, property.price)
    : null;

  async function handleShare() {
    const url = `${window.location.origin}/properties/${property.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: property.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied!');
      }
    } catch { /* cancelled */ }
  }

  return (
    <div className="flex gap-3">
      {waLink ? (
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-4 text-sm font-semibold text-white transition active:opacity-80"
        >
          💬 WhatsApp
        </a>
      ) : null}

      {property.phone ? (
        <a
          href={`tel:${property.phone}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-zinc-700 py-4 text-sm font-semibold text-white transition hover:bg-zinc-600 active:opacity-80"
        >
          📞 Call
        </a>
      ) : null}

      {!waLink && !property.phone ? (
        <button
          onClick={handleShare}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-zinc-700 py-4 text-sm font-semibold text-white"
        >
          🔗 Share listing
        </button>
      ) : (
        <button
          onClick={handleShare}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-800 text-xl transition hover:bg-zinc-700"
        >
          🔗
        </button>
      )}
    </div>
  );
}
