'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="container flex items-center justify-between py-5">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          TED WITH THE HOUSE
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-700 sm:gap-6">
          <Link href="/properties" className="transition hover:text-slate-900">
            Listings
          </Link>
          <Link href="/dashboard" className="transition hover:text-slate-900">
            Dashboard
          </Link>
          <Link href="/login" className="rounded-full border border-slate-200 px-4 py-2 transition hover:border-slate-900 hover:text-slate-900">
            Login
          </Link>
          <Link href="/register" className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
