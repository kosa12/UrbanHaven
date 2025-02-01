import { NextConfig } from "next";
import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV !== "production";

const withPWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: isDev,
  buildExcludes: [
    /app-build-manifest\.json$/,
    /react-loadable-manifest\.json$/,
    /server\/.*/,
  ],
  sw: "/custom-sw.js",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "hu", "ro"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        protocol: "http",
      },
    ],
  },
};

export default withPWAConfig(nextConfig);
