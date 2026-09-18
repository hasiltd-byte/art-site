import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 768, 1200, 1600],
  },
  experimental: {
    optimizePackageImports: [],
  },
};

export default nextConfig;
