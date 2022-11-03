import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  outExtension(ctx) {
    return { js: `.${ctx.format}.js` }
  },
})
