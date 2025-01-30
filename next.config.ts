import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en", "hu", "ro"],
    defaultLocale: "en",
  },
};

export default nextConfig;
