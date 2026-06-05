'use client';

import { useState } from 'react';
import { buildWhatsAppLink } from '@/lib/utils';
import type { Property } from '@/lib/types';

interface ActionButtonsProps {
  property: Property;
}

export default function ActionButtons({ property }: ActionButtonsProps) {
  const [saved, setSaved] = useState(false);

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
      }
    } catch { /* user cancelled share – ignore */ }
  }

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Save */}
      <button onClick={() => setSaved(v => !v)} className="flex flex-col items-center gap-1">
        <span className={`flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-2xl backdrop-blur-sm transition-colors ${saved ? 'text-red-500' : 'text-white'}`}>
          {saved ? '❤️' : '🤍'}
        </span>
        <span className="text-[10px] font-medium text-white drop-shadow">{saved ? 'Saved' : 'Save'}</span>
      </button>

      {/* WhatsApp */}
      {waLink && (
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-2xl shadow-lg">
            💬
          </span>
          <span className="text-[10px] font-medium text-white drop-shadow">WhatsApp</span>
        </a>
      )}

      {/* Call */}
      {property.phone && (
        <a href={`tel:${property.phone}`} className="flex flex-col items-center gap-1">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-2xl backdrop-blur-sm">
            📞
          </span>
          <span className="text-[10px] font-medium text-white drop-shadow">Call</span>
        </a>
      )}

      {/* Share */}
      <button onClick={handleShare} className="flex flex-col items-center gap-1">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-2xl backdrop-blur-sm">
          🔗
        </span>
        <span className="text-[10px] font-medium text-white drop-shadow">Share</span>
      </button>
    </div>
  );
}
