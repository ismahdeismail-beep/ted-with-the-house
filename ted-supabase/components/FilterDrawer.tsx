'use client';

import { useState } from 'react';
import { NAIROBI_AREAS, NAIROBI_AREA_NAMES, PROPERTY_TYPES, AMENITIES, PRICE_RANGES } from '@/lib/constants';
import type { FilterState } from '@/lib/types';

interface FilterDrawerProps {
  open:     boolean;
  onClose:  () => void;
  onApply:  (filters: Partial<FilterState>) => void;
}

const DEFAULT: FilterState = {
  area:         '',
  estate:       '',
  priceMin:     '',
  priceMax:     '',
  propertyType: '',
  amenities:    []
};

export default function FilterDrawer({ open, onClose, onApply }: FilterDrawerProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT);

  const estates = filters.area ? (NAIROBI_AREAS[filters.area] ?? []) : [];

  function toggleAmenity(value: string) {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(value)
        ? prev.amenities.filter(a => a !== value)
        : [...prev.amenities, value]
    }));
  }

  function handlePriceRange(min: number, max: number) {
    setFilters(prev => ({ ...prev, priceMin: String(min), priceMax: String(max) }));
  }

  function handleApply() {
    // Remove empty fields
    const clean: Partial<FilterState> = {};
    if (filters.area)          clean.area         = filters.area;
    if (filters.estate)        clean.estate        = filters.estate;
    if (filters.priceMin)      clean.priceMin      = filters.priceMin;
    if (filters.priceMax)      clean.priceMax      = filters.priceMax;
    if (filters.propertyType)  clean.propertyType  = filters.propertyType;
    if (filters.amenities.length) clean.amenities  = filters.amenities;
    onApply(clean);
  }

  function handleReset() {
    setFilters(DEFAULT);
    onApply({});
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-3xl bg-zinc-900 px-5 pt-4 pb-10 transition-transform duration-300 ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Handle */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-zinc-600" />

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Filter listings</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">✕</button>
        </div>

        <div className="space-y-6">

          {/* Location */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-zinc-300">Location</p>
            <select
              value={filters.area}
              onChange={e => setFilters(prev => ({ ...prev, area: e.target.value, estate: '' }))}
              className="w-full rounded-2xl bg-zinc-800 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="">All areas</option>
              {NAIROBI_AREA_NAMES.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
            {estates.length > 0 && (
              <select
                value={filters.estate}
                onChange={e => setFilters(prev => ({ ...prev, estate: e.target.value }))}
                className="w-full rounded-2xl bg-zinc-800 px-4 py-3 text-sm text-white outline-none"
              >
                <option value="">All estates in {filters.area}</option>
                {estates.map(estate => (
                  <option key={estate} value={estate}>{estate}</option>
                ))}
              </select>
            )}
          </div>

          {/* Price range */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-zinc-300">Price range</p>
            <div className="flex flex-wrap gap-2">
              {PRICE_RANGES.map(range => {
                const active = filters.priceMin === String(range.min) && filters.priceMax === String(range.max);
                return (
                  <button
                    key={range.label}
                    onClick={() => handlePriceRange(range.min, range.max)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                      active
                        ? 'bg-white text-black'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {range.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Property type */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-zinc-300">Property type</p>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.map(pt => {
                const active = filters.propertyType === pt.value;
                return (
                  <button
                    key={pt.value}
                    onClick={() => setFilters(prev => ({ ...prev, propertyType: active ? '' : pt.value }))}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                      active
                        ? 'bg-white text-black'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {pt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <p className="text-sm font-semibold text-zinc-300">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {AMENITIES.map(am => {
                const active = filters.amenities.includes(am.value);
                return (
                  <button
                    key={am.value}
                    onClick={() => toggleAmenity(am.value)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                      active
                        ? 'bg-white text-black'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {am.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 rounded-2xl border border-zinc-700 py-4 text-sm font-semibold text-zinc-300 hover:bg-zinc-800"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 rounded-2xl bg-white py-4 text-sm font-semibold text-black hover:bg-zinc-100"
          >
            Show listings
          </button>
        </div>
      </div>
    </>
  );
}
