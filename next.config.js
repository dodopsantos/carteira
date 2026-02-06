/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify is enabled by default in newer Next.js versions, but keeping it doesn't hurt.
  swcMinify: true,
  eslint: {
    // Avoid failing production builds due to lint errors on Vercel.
    // You can still run `npm run lint` locally/CI.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
