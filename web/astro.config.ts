import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import pandacss from '@pandacss/astro'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), pandacss(), mdx()],
  experimental: {
    viewTransitions: true,
  },
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
    },
  },
  redirects: {
    '/docs/[framework]/components/[component]': '/docs/[framework]/components/[component]/usage',
  },
})
