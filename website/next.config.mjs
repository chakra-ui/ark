import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@ark-ui/react'],
  },
  // Don't transpile @ark-ui/react - use built dist instead to avoid node: protocol issues
  webpack(config, { isServer }) {
    // Resolve 'styles' alias for CSS modules (used by package examples)
    config.resolve.alias.styles = path.resolve(__dirname, '../.storybook/modules')

    // Resolve '@examples' alias for loading example components
    config.resolve.alias['@examples'] = path.resolve(__dirname, '../packages/react/src/components')

    // Add packages/react/src to the module resolution
    config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, '../packages/react/src')]

    // Handle node: protocol URLs for client bundles
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        module: false,
      }

      // Map node: protocol imports to their fallbacks
      config.resolve.alias = {
        ...config.resolve.alias,
        'node:fs': false,
        'node:path': false,
        'node:module': false,
        'node:url': false,
        'node:buffer': false,
        'node:process': false,
      }
    }

    // Ignore node: protocol for server-side files being analyzed
    config.module = {
      ...config.module,
      exprContextCritical: false,
    }

    return config
  },
  async redirects() {
    return [
      {
        source: '/examples',
        destination: '/examples/checkbox-group',
        permanent: false,
      },
      {
        source: '/docs',
        destination: '/docs/overview/getting-started',
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

const isDev = process.argv.indexOf('dev') !== -1
const isBuild = process.argv.indexOf('build') !== -1
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1'
  const { build } = await import('velite')
  await build({ watch: isDev, clean: !isDev })
}

export default nextConfig
