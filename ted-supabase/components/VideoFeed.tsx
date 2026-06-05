'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import VideoCard from './VideoCard';
import SkeletonCard from './SkeletonCard';
import FilterDrawer from './FilterDrawer';
import { getProperties } from '@/lib/properties';
import type { Property, FilterState } from '@/lib/types';

export default function VideoFeed() {
  const [properties,  setProperties]  = useState<Property[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [filterOpen,  setFilterOpen]  = useState(false);
  const [hasFilters,  setHasFilters]  = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);

  const loadProperties = useCallback(async (filters?: Partial<FilterState>) => {
    setLoading(true);
    try {
      const data = await getProperties(filters);
      setProperties(data);
      setActiveIndex(0);
      if (feedRef.current) feedRef.current.scrollTop = 0;
    } catch (err) {
      console.error('Failed to load properties:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadProperties(); }, [loadProperties]);

  // Track active card index from scroll position
  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;

    function onScroll() {
      if (!feed) return;
      const idx = Math.round(feed.scrollTop / feed.clientHeight);
      setActiveIndex(prev => prev === idx ? prev : idx);
    }

    feed.addEventListener('scroll', onScroll, { passive: true });
    return () => feed.removeEventListener('scroll', onScroll);
  }, []);

  function handleApplyFilters(filters: Partial<FilterState>) {
    setFilterOpen(false);
    const active = Object.keys(filters).some(k => {
      const v = filters[k as keyof FilterState];
      return Array.isArray(v) ? v.length > 0 : Boolean(v);
    });
    setHasFilters(active);
    loadProperties(filters);
  }

  function handleClearFilters() {
    setHasFilters(false);
    loadProperties();
  }

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black">

      {/* ── Top bar ─────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-20 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-4 pt-safe-top pt-4">
        <p className="text-base font-bold tracking-tight text-white drop-shadow-lg">
          🏠 TED WITH THE HOUSE
        </p>
        <button
          onClick={() => setFilterOpen(true)}
          className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition ${
            hasFilters
              ? 'border-white bg-white/20'
              : 'border-white/30 bg-black/40'
          }`}
        >
          ⚙️ {hasFilters ? 'Filtered' : 'Filter'}
        </button>
      </div>

      {/* ── Scroll feed ─────────────────────────────────────── */}
      <div
        ref={feedRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      >
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : properties.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="text-6xl">🏘️</span>
            <h2 className="text-xl font-bold text-white">
              {hasFilters ? 'No listings match your filters' : 'No listings yet'}
            </h2>
            <p className="text-sm text-zinc-400">
              {hasFilters ? 'Try adjusting or clearing your filters' : 'Check back soon — listings are on the way'}
            </p>
            {hasFilters && (
              <button
                onClick={handleClearFilters}
                className="mt-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-100"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          properties.map((property, index) => (
            <VideoCard
              key={property.id}
              property={property}
              isActive={activeIndex === index}
            />
          ))
        )}
      </div>

      {/* ── Scroll hint ─────────────────────────────────────── */}
      {!loading && properties.length > 1 && activeIndex === 0 && (
        <div className="pointer-events-none absolute bottom-20 inset-x-0 z-30 flex justify-center animate-bounce">
          <span className="text-white/40 text-xl">↕</span>
        </div>
      )}

      {/* ── Filter drawer ───────────────────────────────────── */}
      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
}
