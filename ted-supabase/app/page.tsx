'use client';

import { useEffect, useMemo, useState } from 'react';
import PropertyGrid from '@/components/PropertyGrid';
import { getProperties } from '@/lib/properties';
import type { Property, PropertyLocation } from '@/types/property';

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'House', value: 'house' },
  { label: 'Studio', value: 'studio' },
  { label: 'Bedsitter', value: 'bedsitter' },
  { label: 'Room', value: 'room' },
  { label: 'Villa', value: 'villa' }
];

function locationToString(loc: PropertyLocation): string {
  return `${loc.city} ${loc.area} ${loc.estate}`.toLowerCase();
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [location, setLocation] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const items = await getProperties();
      setProperties(items);
      setLoading(false);
    }
    load();
  }, []);

  const filteredProperties = useMemo(() => {
    const searchLoc = location.toLowerCase().trim();
    return properties
      .filter((property) =>
        searchLoc
          ? locationToString(property.location).includes(searchLoc)
          : true
      )
      .filter((property) =>
        typeFilter === 'all' ? true : property.property_type === typeFilter
      )
      .filter((property) => {
        if (priceFilter === 'under-2000') return property.price < 2000;
        if (priceFilter === '2000-5000') return property.price >= 2000 && property.price <= 5000;
        if (priceFilter === 'above-5000') return property.price > 5000;
        return true;
      });
  }, [properties, location, priceFilter, typeFilter]);

  return (
    <section className="container py-10">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <div className="mb-8 space-y-4 sm:flex sm:items-end sm:justify-between sm:space-y-0">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-500">Property marketplace</p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-900">Find your next home or investment</h1>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Search location"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400"
            />
            <select
              value={priceFilter}
              onChange={(event) => setPriceFilter(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
            >
              <option value="all">All Prices</option>
              <option value="under-2000">Under $2,000</option>
              <option value="2000-5000">$2,000–$5,000</option>
              <option value="above-5000">Above $5,000</option>
            </select>
            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
            >
              {filters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {loading ? (
          <div className="py-20 text-center text-slate-500">Loading listings...</div>
        ) : filteredProperties.length ? (
          <PropertyGrid properties={filteredProperties} />
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 p-16 text-center text-slate-500">
            No listings match your filters. Try another search.
          </div>
        )}
      </div>
    </section>
  );
}
