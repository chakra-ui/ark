import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@ark-ui/react'],
  },
  async redirects() {
    return [
      {
        source: '/examples',
        destination: '/examples/checkbox-group',
        permanent: false,
      },
      {
        source: '/:framework/docs/:slug*',
        destination: '/docs/:slug*',
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.txt/:path*.mdx',
      },
    ]
  },
}

export default withMDX(nextConfig)
