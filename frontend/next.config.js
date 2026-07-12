/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Turbopack handles Node.js built-in exclusion automatically,
    // no need for the old webpack fallback config
  },
};

module.exports = nextConfig;
