import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// svelte-package copies import specifiers verbatim, but node16 / nodenext need
// fully specified relative imports. Rewrite each one to the file it resolves to:
//   ./x.ts, ./x.svelte.ts -> ./x.js, ./x.svelte.js
//   ./x                   -> ./x.js or ./x/index.js
//   ./x.svelte            -> unchanged in .js / .svelte (the consumer compiles it),
//                            ./x.svelte.js in .d.ts so it maps to x.svelte.d.ts
//                            instead of Svelte's ambient `*.svelte` module
const distRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist')

const SPECIFIER_RE = /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s*)(['"])(\.{1,2}\/[^'"]*)\2/g
const REWRITE_RE = /\.(js|svelte|d\.ts)$/
const ASSET_RE = /\.(json|css)$/

const files = new Set(
  (await readdir(distRoot, { recursive: true, withFileTypes: true }))
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(entry.parentPath, entry.name)),
)

const hasModule = (base) => files.has(`${base}.js`) || files.has(`${base}.d.ts`)

const resolveSpecifier = (file, spec) => {
  const base = path.resolve(path.dirname(file), spec)

  if (spec.endsWith('.svelte')) {
    if (!files.has(base)) return null
    return file.endsWith('.d.ts') ? `${spec}.js` : spec
  }
  if (ASSET_RE.test(spec)) return files.has(base) ? spec : null

  const stem = spec.replace(/\.(js|tsx?)$/, '')
  const stemBase = path.resolve(path.dirname(file), stem)
  if (hasModule(stemBase)) return `${stem}.js`
  if (stem === spec && hasModule(path.join(stemBase, 'index'))) return `${stem.replace(/\/$/, '')}/index.js`
  return null
}

const unresolved = []
let changed = 0

await Promise.all(
  [...files]
    .filter((file) => REWRITE_RE.test(file))
    .map(async (file) => {
      const code = await readFile(file, 'utf8')
      const next = code.replace(SPECIFIER_RE, (match, prefix, quote, spec) => {
        const resolved = resolveSpecifier(file, spec)
        if (resolved === null) {
          unresolved.push(`${path.relative(distRoot, file)}: ${spec}`)
          return match
        }
        return `${prefix}${quote}${resolved}${quote}`
      })
      if (next !== code) {
        await writeFile(file, next)
        changed++
      }
    }),
)

console.log(`fix-dist-extensions: rewrote ${changed} of ${files.size} files`)

if (unresolved.length > 0) {
  console.error(`fix-dist-extensions: ${unresolved.length} unresolved relative imports:\n  ${unresolved.join('\n  ')}`)
  process.exitCode = 1
}
