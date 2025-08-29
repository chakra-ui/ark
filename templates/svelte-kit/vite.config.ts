import { sveltekit } from '@sveltejs/kit/vite'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    sveltekit(),
    {
      name: 'ark-lib-resolver',
      resolveId: {
        order: 'pre',
        handler(id, importer) {
          if (id.startsWith('$lib/') && importer?.includes('packages/svelte/')) {
            const libPath = id.replace('$lib/', '')
            const basePath = resolve('../../packages/svelte/src/lib', libPath)

            // Try different extensions
            const extensions = ['/index.ts', '/index.js', '.ts', '.js', '.svelte', '']

            for (const ext of extensions) {
              const fullPath = basePath + ext
              if (existsSync(fullPath)) {
                return fullPath
              }
            }

            return basePath
          }
        },
      },
    },
  ],
})
