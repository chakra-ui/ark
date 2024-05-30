import { build } from 'velite'

/** @type {import('next').NextConfig} */
export default {
  // othor next config here...
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin())
    return config
  },
  async redirects() {
    return [
      {
        source: '/:framework/examples',
        destination: '/:framework/examples/combobox-with-tags-input',
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

class VeliteWebpackPlugin {
  static started = false
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    // executed three times in nextjs
    // twice for the server (nodejs / edge runtime) and once for the client
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return
      VeliteWebpackPlugin.started = true
      const dev = compiler.options.mode === 'development'
      await build({ watch: dev, clean: !dev })
    })
  }
}
