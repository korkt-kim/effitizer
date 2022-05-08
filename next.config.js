/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { loader: 'custom' },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
