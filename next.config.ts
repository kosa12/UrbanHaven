import { NextConfig } from "next";
import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV !== "production";

const withPWAConfig = withPWA({
  dest: "public", // Destination directory for the service worker
  register: true, // Automatically register the service worker
  skipWaiting: true, // Skip waiting for the service worker to activate
  disable: isDev, // Disable in development
  buildExcludes: [
    // Exclude specific files from the precache manifest
    /app-build-manifest\.json$/,
    /react-loadable-manifest\.json$/,
    /server\/.*/, // Exclude server-side files
  ],
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "hu", "ro"],
    defaultLocale: "en",
  },
};

export default withPWAConfig(nextConfig);
