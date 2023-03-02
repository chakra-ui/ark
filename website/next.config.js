const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    externalDir: true,
  },
  images: {
    domains: ['avatars2.githubusercontent.com', 'avatars.githubusercontent.com'],
  },
}

module.exports = withContentlayer(nextConfig)
