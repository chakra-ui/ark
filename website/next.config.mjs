import { join } from 'node:path'
import { createMDX } from 'fumadocs-mdx/next'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  outputFileTracingRoot: join(import.meta.dirname, '..'),
  outputFileTracingIncludes: {
    '/**': ['../packages/*/src/**/examples/**/*', '../.storybook/modules/**/*', './src/content/**/*'],
  },
  experimental: {
    optimizePackageImports: ['@ark-ui/react'],
    turbopackRustReactCompiler: true,
  },
  turbopack: {
    ignoreIssue: [
      { path: '**/components/example.tsx', title: /matches \d+ files/ },
      { path: '**/lib/example-utils.ts', title: /matches \d+ files/ },
    ],
  },
  async redirects() {
    return [
      {
        source: '/examples/:path*',
        destination: '/docs/react/components/overview',
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
        source: '/docs/:framework(react|solid|svelte|vue|web)/:path*.:ext(md|mdx)',
        destination: '/llms.txt/:framework/:path*',
      },
      {
        source: '/docs/:path*.:ext(md|mdx)',
        destination: '/llms.txt/:path*',
      },
    ]
  },
}

const withMDX = createMDX()

export default withMDX(nextConfig)
