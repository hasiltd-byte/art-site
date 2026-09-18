import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 768, 1200, 1600],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/daxsu6sv1/image/upload/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: [],
  },
};

export default nextConfig;
