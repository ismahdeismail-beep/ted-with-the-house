import Link from 'next/link';

interface HeroProps {
  query: string;
  setQuery: (value: string) => void;
}

export default function Hero({ query, setQuery }: HeroProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-14 text-white shadow-soft sm:px-12">
      <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Find your dream home</p>
          <h1 className="max-w-xl text-5xl font-semibold leading-tight">A modern real estate marketplace for rentals and sales.</h1>
          <p className="max-w-xl text-lg leading-8 text-slate-200">
            Discover premium listings with dynamic search, property details, and a secure dashboard for managing your inventory.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/properties" className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
              Explore listings
            </Link>
            <Link href="/dashboard" className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Admin dashboard
            </Link>
          </div>
        </div>
        <div className="space-y-6 rounded-3xl bg-white/10 p-8 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Search the marketplace</p>
          <div className="space-y-4">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by city, neighborhood, or property"
              className="w-full rounded-3xl border border-white/20 bg-white/15 px-5 py-4 text-slate-900 outline-none transition focus:border-cyan-300 focus:bg-white"
            />
            <div className="rounded-3xl bg-white/10 p-4 text-sm text-slate-100">
              <p className="font-semibold">Featured categories</p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-cyan-200">
                <span className="rounded-full bg-white/10 px-3 py-2">Apartments</span>
                <span className="rounded-full bg-white/10 px-3 py-2">Villas</span>
                <span className="rounded-full bg-white/10 px-3 py-2">Luxury</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
