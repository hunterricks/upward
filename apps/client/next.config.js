/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@upward/ui"],
  env: {
    PORT: "3000",
  },
}

module.exports = nextConfig
