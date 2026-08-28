import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// svelte-package does not rewrite import specifiers, so .ts / .svelte.ts
// extensions added in source leak into dist. Map them to emitted files:
//   ./x.ts        -> ./x.js
//   ./x.svelte.ts -> ./x.svelte.js
//   ./x.svelte    -> unchanged (component shipped as-is)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distRoot = path.resolve(__dirname, '../dist')

const RE = /(\bfrom\s*['"]|\bimport\s*\(\s*['"]|\bimport\s*['"])(\.\.?\/[^'"]*?)(\.svelte)?\.tsx?(['"])/g

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true })
  const out = []
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(full)))
    else if (/\.(js|svelte|d\.ts)$/.test(e.name)) out.push(full)
  }
  return out
}

const files = await walk(distRoot)
let changed = 0
for (const file of files) {
  const code = await readFile(file, 'utf8')
  const next = code.replace(RE, (_m, pre, spec, svelte, post) => `${pre}${spec}${svelte ?? ''}.js${post}`)
  if (next !== code) {
    await writeFile(file, next)
    changed++
  }
}
console.log(`fix-dist-extensions: rewrote ${changed}/${files.length} files`)
