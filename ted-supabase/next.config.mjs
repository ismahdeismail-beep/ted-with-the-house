/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Images ────────────────────────────────────────────────
  images: {
    remotePatterns: [
      {
        // Supabase Storage public URLs
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**'
      },
      {
        // Unsplash placeholder images
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  },

  // ── Build ─────────────────────────────────────────────────
  // Surface all TypeScript / ESLint errors during `next build`
  typescript:  { ignoreBuildErrors: false },
  eslint:      { ignoreDuringBuilds: false },

  // ── Logging ───────────────────────────────────────────────
  logging: {
    fetches: { fullUrl: false }
  }
};

export default nextConfig;
