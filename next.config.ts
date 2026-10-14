import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Matikan seluruh indikator dev Next.js
  devIndicators: false,
  images: {
    remotePatterns: [
      // Supabase Storage
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      // Unsplash (untuk fallback / gambar placeholder)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;