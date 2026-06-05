'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TrustBadge from '@/components/TrustBadge';
import ContactBar from '@/components/ContactBar';
import { getPropertyById } from '@/lib/properties';
import { formatPrice, timeAgo } from '@/lib/utils';
import type { Property } from '@/lib/types';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1080&q=80';

type MediaItem = { type: 'video' | 'image'; src: string };
const FALLBACK_MEDIA: MediaItem = { type: 'image', src: PLACEHOLDER };

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [mediaIdx, setMediaIdx] = useState(0);
  const router = useRouter();

  useEffect(() => {
    getPropertyById(id).then(data => {
      if (!data) { router.replace('/'); return; }
      setProperty(data);
      setLoading(false);
    });
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-600 border-t-white" />
      </div>
    );
  }

  if (!property) return null;

  // Build unified media list: videos first, then images
  const media: MediaItem[] = [
    ...property.videos.map((src): MediaItem => ({ type: 'video', src })),
    ...property.images.map((src): MediaItem => ({ type: 'image', src })),
  ];

  // Always guaranteed to have one item
  const current: MediaItem = media[mediaIdx] ?? media[0] ?? FALLBACK_MEDIA;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-white">

      {/* Back button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => router.back()}
          className="rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-black/80"
        >
          ← Back
        </button>
      </div>

      {/* Media viewer */}
      <div className="relative h-[55dvh] flex-shrink-0 bg-black">
        {current.type === 'video' ? (
          <video
            key={current.src}
            src={current.src}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls
          />
        ) : (
          <img
            src={current.src}
            alt={property.title}
            className="h-full w-full object-cover"
          />
        )}

        {/* Dot indicators */}
        {media.length > 1 && (
          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5">
            {media.map((_, i) => (
              <button
                key={i}
                onClick={() => setMediaIdx(i)}
                className={`rounded-full transition-all ${
                  i === mediaIdx ? 'h-1.5 w-5 bg-white' : 'h-1.5 w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info panel */}
      <div className="flex-1 overflow-y-auto px-5 py-6 pb-32 space-y-5">

        {/* Price + badge */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-3xl font-bold">{formatPrice(property.price)}</p>
            <h1 className="mt-1 text-lg font-semibold leading-snug text-zinc-100">
              {property.title}
            </h1>
          </div>
          <div className="shrink-0 pt-1">
            <TrustBadge status={property.verified_status} />
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>📍</span>
          <span>
            {property.location.city} › {property.location.area} › {property.location.estate}
          </span>
        </div>

        {/* Meta pills */}
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs capitalize text-zinc-200">
            {property.property_type}
          </span>
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs capitalize text-zinc-200">
            {property.owner_type}
          </span>
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
            Updated {timeAgo(property.updated_at)}
          </span>
        </div>

        {/* Amenities */}
        {property.amenities.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Amenities
            </p>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map(tag => (
                <span key={tag} className="rounded-full bg-zinc-800 px-3 py-1.5 text-xs text-white">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {property.description && (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              About this property
            </p>
            <p className="text-sm leading-7 text-zinc-300">{property.description}</p>
          </div>
        )}
      </div>

      {/* Fixed contact bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-800 bg-zinc-900/95 px-5 py-4 backdrop-blur-sm">
        <ContactBar property={property} />
      </div>
    </div>
  );
}
