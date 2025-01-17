import withBundleAnalyzer from '@next/bundle-analyzer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
export const dynamic = "force-dynamic"; // Add this at the top of /seats/page.js

// Polyfill __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Your existing config
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', // Enable bundle analyzer based on environment
});

export default bundleAnalyzer({
  ...nextConfig, // Spread your existing nextConfig here
  webpack: (config, { isServer }) => {
    // Enable filesystem caching for faster builds
    config.cache = {
      type: "filesystem",
      buildDependencies: {
        config: [__filename], // Tracks changes in this file
      },
    };

    return config;
  },
});
