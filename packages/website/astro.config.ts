import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import pandacss from '@pandacss/astro'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://ark-ui.com',
  integrations: [react(), pandacss(), mdx(), sitemap()],
  markdown: {
    syntaxHighlight: false,
  },
})
