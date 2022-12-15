import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'
import pandacss from 'css-panda/astro'

// https://astro.build/config
export default defineConfig({
  site: 'https://ark-docs.vercel.app',
  integrations: [pandacss(), mdx(), sitemap(), react()], // TODO incorrect types
})
