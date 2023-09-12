import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import pandacss from '@pandacss/astro'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://ark-ui.com',
  integrations: [react(), pandacss(), mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
    },
  },
  redirects: {
    '/docs/[...framework]/overview/[doc]': '/docs/overview/[doc]',
    '/docs/[...framework]/components/[...component]': '/docs/components/[component]',
  },
})
