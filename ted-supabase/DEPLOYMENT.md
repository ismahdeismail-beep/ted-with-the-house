# Deployment Guide — TED WITH THE HOUSE

## Stack
- **Framework** — Next.js 15 (App Router)
- **Database + Auth** — Supabase (PostgreSQL + GoTrue)
- **Storage** — Supabase Storage
- **Hosting** — Vercel

---

## 1  Set up Supabase

### 1.1 Create a project
1. Go to <https://supabase.com> and sign in.
2. Click **New project**, choose a name and region, set a strong database password.
3. Wait ~2 minutes for provisioning.

### 1.2 Create the `properties` table
Open the **SQL Editor** and run:

```sql
-- Properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT        NOT NULL,
  price       NUMERIC     NOT NULL,
  location    TEXT        NOT NULL,
  images      TEXT[]      DEFAULT '{}',
  description TEXT        NOT NULL,
  type        TEXT        NOT NULL CHECK (type IN ('rent', 'sale')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Anyone can read listings
CREATE POLICY "Public can read properties"
  ON public.properties FOR SELECT USING (true);

-- Only authenticated admins can insert
CREATE POLICY "Authenticated users can insert"
  ON public.properties FOR INSERT TO authenticated
  WITH CHECK (true);
```

### 1.3 Create the Storage bucket
1. Go to **Storage → New bucket**.
2. Name it exactly **`property-images`**.
3. Toggle **Public bucket** ON (so uploaded images are publicly accessible).
4. Click **Save**.

Then add a storage policy so authenticated users can upload:
```sql
CREATE POLICY "Auth users can upload images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'property-images');
```

### 1.4 Copy your API keys
Go to **Project Settings → API** and copy:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon / public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 2  Local development

```bash
# Clone / download the project
cp .env.example .env.local
# Paste your Supabase URL and anon key into .env.local

npm install
npm run dev
# → http://localhost:3000
```

---

## 3  Deploy to Vercel

### 3.1 Push to GitHub
```bash
git init
git add .
git commit -m "chore: initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ted-with-the-house.git
git push -u origin main
```

### 3.2 Import to Vercel
1. Go to <https://vercel.com/new> and import your GitHub repo.
2. Keep the default **Next.js** preset.
3. Add environment variables under **Settings → Environment Variables**:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your_anon_key` |

4. Click **Deploy**. Vercel will build and publish automatically.

---

## 4  Create an admin user

1. In Supabase Dashboard go to **Authentication → Users → Invite user**.
2. Enter the admin email and click **Send invite**.
3. The user clicks the email link to set a password.
4. Use those credentials to log into `/login` and access `/dashboard`.

---

## 5  Useful scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npx supabase gen types typescript --linked > lib/database.types.ts` | Regenerate DB types |

---

## 6  Common gotchas

| Issue | Fix |
|---|---|
| Images not loading | Check `next.config.mjs` → `remotePatterns` includes your Supabase hostname |
| Auth redirects to `/login` immediately | Supabase email confirmation may be on — disable it in **Auth → Settings → Email** |
| Storage upload 403 | Ensure the `property-images` bucket is **public** and the storage policy allows authenticated inserts |
| `Missing environment variables` error | Make sure `.env.local` exists and both vars are set |
