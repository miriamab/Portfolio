import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  basePath: isProd ? "/Portfolio" : "",
  assetPrefix: isProd ? "/Portfolio/" : "",
  output: "export",
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
