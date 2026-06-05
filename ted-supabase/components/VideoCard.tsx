'use client';

import Link from 'next/link';
import VideoPlayer from './VideoPlayer';
import TrustBadge from './TrustBadge';
import ActionButtons from './ActionButtons';
import { formatPrice, timeAgo } from '@/lib/utils';
import type { Property } from '@/lib/types';

interface VideoCardProps {
  property: Property;
  isActive: boolean;
}

export default function VideoCard({ property, isActive }: VideoCardProps) {
  const { location, amenities } = property;

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black snap-start snap-always">

      {/* ── Video / Image background ────────────────────────── */}
      <VideoPlayer
        videos={property.videos}
        images={property.images}
        title={property.title}
        isActive={isActive}
      />

      {/* ── Dark gradient overlays ───────────────────────────── */}
      {/* Top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* ── Right-side action buttons ────────────────────────── */}
      <div className="absolute bottom-40 right-3 z-20">
        <ActionButtons property={property} />
      </div>

      {/* ── Bottom property info ─────────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-16 z-20 px-4 pb-8 space-y-2">

        {/* Trust badge + time */}
        <div className="flex items-center gap-2">
          <TrustBadge status={property.verified_status} />
          <span className="text-xs text-white/60">{timeAgo(property.updated_at)}</span>
        </div>

        {/* Price */}
        <p className="text-3xl font-bold text-white drop-shadow-lg">
          {formatPrice(property.price)}
        </p>

        {/* Title */}
        <Link href={`/properties/${property.id}`}>
          <p className="text-base font-semibold text-white drop-shadow leading-snug">
            {property.title}
          </p>
        </Link>

        {/* Location */}
        <p className="flex items-center gap-1 text-sm text-white/80">
          <span>📍</span>
          <span>{location.area} · {location.estate}</span>
        </p>

        {/* Amenity tags */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {amenities.slice(0, 5).map(tag => (
              <span
                key={tag}
                className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
            {amenities.length > 5 && (
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs text-white/70 backdrop-blur-sm">
                +{amenities.length - 5} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
