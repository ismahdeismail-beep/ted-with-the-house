import Link from 'next/link';
import type { Property } from '@/types/property';

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/properties/${property.id}`} className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-72 overflow-hidden">
        <img
          src={
            property.images[0] ??
            'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
          }
          alt={property.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-6">
        <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1">{property.type}</span>
          <span className="font-semibold text-slate-900">${property.price.toLocaleString()}</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-900">{property.title}</h3>
        <p className="text-sm leading-6 text-slate-600">{property.location}</p>
      </div>
    </Link>
  );
}
