/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GITHUB_RATE_LIMIT_TOKEN: process.env.GITHUB_RATE_LIMIT_TOKEN
  }
};

module.exports = nextConfig;
