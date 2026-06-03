# TED WITH THE HOUSE

Modern real estate marketplace built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

## Features

- Browse and search property listings
- Filter by type (rent / sale) and price range
- Property detail pages with image galleries
- Email / password authentication via Supabase Auth
- Admin dashboard with multi-image upload to Supabase Storage
- Listings stored in Supabase PostgreSQL (Row Level Security enabled)

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Hosting | Vercel |

## Quick start

```bash
# 1 — Install dependencies
npm install

# 2 — Configure environment
cp .env.example .env.local
# Edit .env.local and add your Supabase URL + anon key

# 3 — Run the dev server
npm run dev
# → http://localhost:3000
```

## Project structure

```
app/
  page.tsx                  ← Home / featured listings
  properties/
    page.tsx                ← Full listings with filters
    [id]/page.tsx           ← Property detail
  dashboard/page.tsx        ← Admin upload form (auth-protected)
  login/page.tsx
  register/page.tsx

components/
  Navbar.tsx
  Hero.tsx
  PropertyGrid.tsx
  PropertyCard.tsx
  Footer.tsx

lib/
  supabase.ts               ← Supabase client singleton
  auth.ts                   ← Auth helpers (signIn, signUp, signOut, listener)
  properties.ts             ← DB + Storage CRUD
  types.ts                  ← TypeScript interfaces & Database type
  utils.ts                  ← formatPrice, formatDate, cn, etc.
  constants.ts              ← Routes, table names, filter options

types/
  property.ts               ← Re-exports Property from lib/types.ts
```

## Supabase schema

```sql
CREATE TABLE public.properties (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT        NOT NULL,
  price       NUMERIC     NOT NULL,
  location    TEXT        NOT NULL,
  images      TEXT[]      DEFAULT '{}',
  description TEXT        NOT NULL,
  type        TEXT        NOT NULL CHECK (type IN ('rent', 'sale')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full setup guide including RLS policies and Storage bucket configuration.

## Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous public key |
