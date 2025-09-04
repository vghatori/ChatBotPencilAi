/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Suppress Ant Design React 19 compatibility warning
  webpack: (config, { isServer }) => {
    // Suppress specific warnings
    config.infrastructureLogging = {
      level: "error",
    };

    // Add fallbacks for Node.js modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
  // Suppress console warnings in production
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;
