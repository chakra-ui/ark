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

const isDev = process.argv.indexOf('dev') !== -1
const isBuild = process.argv.indexOf('build') !== -1
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1'
  const { build } = await import('velite')
  await build({ watch: isDev, clean: !isDev })
}

export default nextConfig
