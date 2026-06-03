'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import PropertyGrid from '@/components/PropertyGrid';
import { getProperties } from '@/lib/properties';
import type { Property } from '@/types/property';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const items = await getProperties();
      setProperties(items);
      setLoading(false);
    }

    load();
  }, []);

  const featuredProperties = useMemo(
    () => properties.filter((property) => property.type === 'rent').slice(0, 6),
    [properties]
  );

  const filtered = useMemo(
    () =>
      featuredProperties.filter((property) =>
        property.location.toLowerCase().includes(query.toLowerCase()) ||
        property.title.toLowerCase().includes(query.toLowerCase())
      ),
    [featuredProperties, query]
  );

  return (
    <section className="container py-10">
      <Hero query={query} setQuery={setQuery} />
      <div className="mt-12 rounded-3xl bg-white p-8 shadow-soft">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-500">Featured Collection</p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight text-slate-900">Premium stays and modern homes</h2>
          </div>
          <Link href="/properties" className="inline-flex items-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
            Browse all listings
          </Link>
        </div>
        {loading ? (
          <div className="py-20 text-center text-slate-500">Loading featured properties...</div>
        ) : (
          <PropertyGrid properties={filtered.length ? filtered : featuredProperties} />
        )}
      </div>
    </section>
  );
}
