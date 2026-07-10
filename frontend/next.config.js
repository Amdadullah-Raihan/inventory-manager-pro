/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  turbopack: {
    // Turbopack handles Node.js built-in exclusion automatically,
    // no need for the old webpack fallback config
  },
};

module.exports = nextConfig;
