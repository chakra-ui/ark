import { createMDX } from 'fumadocs-mdx/next'

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
        // llms-full.txt duplicated every page across all four frameworks and
        // outgrew Vercel's 20MB prerender cap. The per-framework files carry
        // the same content, scoped.
        source: '/llms-full.txt',
        destination: '/llms.txt',
        permanent: false,
      },
      {
        source: '/:framework((?!api)[^/]+)/docs/:slug*',
        destination: '/docs/:framework/:slug*',
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

const withMDX = createMDX()

export default withMDX(nextConfig)
