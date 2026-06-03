'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPropertyById } from '@/lib/properties';
import { formatPrice } from '@/lib/utils';
import { PLACEHOLDER_IMAGE } from '@/lib/utils';
import type { Property } from '@/types/property';

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyDetailPage({ params }: PropertyPageProps) {
  const { id } = use(params);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading,  setLoading]  = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const item = await getPropertyById(id);
      if (!item) {
        router.replace('/properties');
        return;
      }
      setProperty(item);
      setLoading(false);
    }

    load();
  }, [id, router]);

  if (loading) {
    return (
      <div className="container py-20 text-center text-slate-500">
        Loading property…
      </div>
    );
  }

  if (!property) return null;

  return (
    <section className="container py-10">
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6 rounded-3xl bg-white p-8 shadow-soft">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
                {property.type}
              </span>
              <span className="text-sm text-slate-500">{property.location}</span>
            </div>
            <h1 className="text-4xl font-semibold text-slate-900">{property.title}</h1>
            <p className="text-3xl font-semibold text-slate-900">{formatPrice(property.price)}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {(property.images.length ? property.images : [PLACEHOLDER_IMAGE]).map((src) => (
              <img
                key={src}
                src={src}
                alt={property.title}
                className="h-52 w-full rounded-3xl object-cover shadow-xl"
              />
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Property details</h2>
            <p className="leading-7 text-slate-600">{property.description}</p>
          </div>
        </div>

        <aside className="space-y-6 rounded-3xl bg-white p-8 shadow-soft">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">Ready to book?</h2>
            <p className="text-slate-600">
              Contact the owner and schedule a viewing for this listing.
            </p>
          </div>
          <button className="w-full rounded-2xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-700">
            Contact host
          </button>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Location</p>
            <p>{property.location}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
