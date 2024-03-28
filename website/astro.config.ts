import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://ark-ui.com',
  integrations: [react(), mdx(), sitemap()],
  markdown: {
    syntaxHighlight: false,
  },
})
