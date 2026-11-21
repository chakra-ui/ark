import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'
import { build } from 'vite'

const root = fileURLToPath(new URL('..', import.meta.url))
const outDir = join(root, 'dist/cdn')
const src = (path) => join(root, 'src', path)

const components = readdirSync(src('components'))

const entries = {
  locale: src('utils/locale.ts'),
  'async-list': src('utils/async-list.ts'),
  ...Object.fromEntries(components.map((name) => [name, src(`components/${name}/index.ts`)])),
}

const shared = {
  configFile: false,
  logLevel: 'warn',
  root,
}

await build({
  ...shared,
  build: {
    outDir,
    emptyOutDir: true,
    minify: true,
    target: 'es2022',
    lib: { entry: entries, formats: ['es'] },
    rolldownOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        codeSplitting: { groups: [{ name: 'shared', minShareCount: 2 }] },
      },
    },
  },
})

await build({
  ...shared,
  build: {
    outDir,
    emptyOutDir: false,
    minify: true,
    target: 'es2022',
    lib: { entry: { 'ark-web': src('index.ts') }, formats: ['es'] },
    rolldownOptions: { output: { entryFileNames: '[name].js', codeSplitting: false } },
  },
})

const kb = (file) => {
  const bytes = readFileSync(join(outDir, file))
  return `${(statSync(join(outDir, file)).size / 1024).toFixed(1)} kB (${(gzipSync(bytes).length / 1024).toFixed(1)} kB gzip)`
}

const chunks = readdirSync(join(outDir, 'chunks'))
console.log(`cdn: ark-web.js ${kb('ark-web.js')}; ${Object.keys(entries).length} entries, ${chunks.length} chunks`)
for (const chunk of chunks) console.log(`  chunks/${chunk} ${kb(`chunks/${chunk}`)}`)
console.log(`  select.js ${kb('select.js')}, toggle.js ${kb('toggle.js')}`)
