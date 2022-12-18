import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_VERCEL_URL
    ? `https://${process.env.PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000',
  integrations: [mdx(), sitemap(), react()],
})
