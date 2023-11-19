const config = require("./src/config/config.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  output: "standalone",
  experimental: {
    serverActions: true,
  },

  images: {
    domains: ["cdn.shopify.com"],
  },
};

module.exports = nextConfig;
