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
    '/docs/react/overview/[doc]': '/docs/overview/[doc]',
    '/docs/react/components/[component]': '/docs/components/[component]',
    '/docs/solid/overview/[doc]': '/docs/overview/[doc]',
    '/docs/solid/components/[component]': '/docs/components/[component]',
    '/docs/vue/overview/[doc]': '/docs/overview/[doc]',
    '/docs/vue/components/[component]': '/docs/components/[component]',
  },
})
