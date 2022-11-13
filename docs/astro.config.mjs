import { defineConfig } from 'astro/config'
import pandacss from 'css-panda/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [pandacss()],
})
