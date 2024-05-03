/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "maps.googleapis.com", protocol: "https" },
      { hostname: "localhost", protocol: "http" },
      { hostname: "glocal-vis.vercel.app", protocol: "https" },
    ],
  },
};

module.exports = nextConfig;
