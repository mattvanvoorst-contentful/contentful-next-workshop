/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    deviceSizes: [320, 420, 768, 1024, 1200, 1600],
    iconSizes: [],
    domains: ['images.ctfassets.net'],
    path: '/_next/image',
    loader: 'default',
  },
};

module.exports = nextConfig;
