import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import solidJs from '@astrojs/solid-js'
import { defineConfig } from 'astro/config'
import pandacss from 'css-panda/astro'

// https://astro.build/config
export default defineConfig({
  site: 'https://ark-docs.vercel.app',
  integrations: [pandacss(), mdx(), sitemap(), solidJs()],
})
