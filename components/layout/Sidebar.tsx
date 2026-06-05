"use client";

import Link from "next/link";

export default function Sidebar() {
  // TEMP MOCK LOGIN STATE (we will replace later with Supabase)
  const isLoggedIn = true;

  return (
    <aside className="w-64 bg-white border-r p-4 hidden md:block">

      <h1 className="font-bold text-lg mb-6">
        TED WITH THE HOUSE
      </h1>

      <nav className="flex flex-col gap-3 text-sm">

        <Link href="/feed">Feed</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/upload">Upload</Link>
        <Link href="/saved">Saved</Link>

        {/* AUTH SECTION */}
        {!isLoggedIn ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        ) : (
          <button className="text-left text-red-500">
            Logout
          </button>
        )}

      </nav>

    </aside>
  );
}
