/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@ark-ui/react'],
  },
  async redirects() {
    return [
      {
        source: '/:framework/examples',
        destination: '/:framework/examples/checkbox-group',
        permanent: false,
      },
      {
        source: '/docs/:framework/:slug*',
        destination: '/:framework/docs/:slug*',
        permanent: true,
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
