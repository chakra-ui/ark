import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { globbySync } from 'globby'

const root = resolve(dirname(new URL(import.meta.url).pathname), '../..')
const APPLY = process.argv.includes('--apply')

const stateGetters = new Map<string, Map<string, boolean>>()
function getters(pkg: string): Map<string, boolean> {
  const cached = stateGetters.get(pkg)
  if (cached) return cached
  const files = globbySync(`node_modules/.bun/@zag-js+${pkg}@*/node_modules/@zag-js/${pkg}/dist/*.d.ts`, {
    cwd: root,
    absolute: true,
    dot: true,
  })
  const found = new Map<string, boolean>()
  for (const f of files) {
    for (const m of readFileSync(f, 'utf8').matchAll(/\b(get[A-Z]\w*State)\s*:\s*\(([^)]*)\)/g)) {
      found.set(m[1], m[2].trim().length > 0)
    }
  }
  stateGetters.set(pkg, found)
  return found
}

const notMachine = new Set([
  'react',
  'solid',
  'vue',
  'svelte',
  'core',
  'types',
  'utils',
  'dom-query',
  'anatomy',
  'store',
  'collection',
  'i18n-utils',
])
const pkgByDir = new Map<string, string | null>()
function machinePkg(dir: string): string | null {
  const cached = pkgByDir.get(dir)
  if (cached !== undefined) return cached
  const counts = new Map<string, number>()
  for (const f of globbySync('*.{ts,svelte}', { cwd: dir, absolute: true })) {
    for (const m of readFileSync(f, 'utf8').matchAll(/from '@zag-js\/([\w-]+)'/g)) {
      if (notMachine.has(m[1])) continue
      counts.set(m[1], (counts.get(m[1]) ?? 0) + 1)
    }
  }
  const best = [...counts].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null
  pkgByDir.set(dir, best)
  return best
}

const files = globbySync('packages/svelte/src/lib/components/*/*.svelte', {
  cwd: root,
  absolute: true,
  ignore: ['**/examples/**', '**/tests/**'],
})

let written = 0
const skipped: Array<[string, string]> = []

for (const path of files) {
  const rel = path.replace(`${root}/packages/svelte/src/lib/components/`, '')
  let s = readFileSync(path, 'utf8')

  if (!s.includes('PolymorphicProps<')) {
    skipped.push([rel, 'not polymorphic'])
    continue
  }
  if (/PolymorphicProps<[^>]*,\s*\w+>/.test(s)) {
    skipped.push([rel, 'already typed'])
    continue
  }

  const call = s.match(/(\w+\(\))\.(get[A-Z]\w*Props)\(/)
  if (!call) {
    skipped.push([rel, 'no getXProps call'])
    continue
  }
  const [, api, propsGetter] = call
  const open = (call.index ?? 0) + call[0].length
  let depth = 1
  let close = open
  while (close < s.length && depth > 0) {
    if (s[close] === '(') depth++
    else if (s[close] === ')') depth--
    if (depth === 0) break
    close++
  }
  if (depth !== 0) {
    skipped.push([rel, 'unbalanced getXProps call'])
    continue
  }
  const rawArgs = s.slice(open, close)
  const stateGetter = propsGetter.replace(/Props$/, 'State')

  const pkg = machinePkg(dirname(path))
  if (!pkg) {
    skipped.push([rel, 'no machine package'])
    continue
  }
  if (!getters(pkg).has(stateGetter)) {
    skipped.push([rel, `${pkg} has no ${stateGetter}`])
    continue
  }

  const base = s.match(/export interface (\w+)BaseProps\s+extends[^{]*?PolymorphicProps<('[a-z0-9]+')>/)
  if (!base) {
    skipped.push([rel, 'unexpected BaseProps shape'])
    continue
  }
  const iface = `${base[1]}State`
  const zagState = stateGetter.replace(/^get/, '')
  const args = getters(pkg).get(stateGetter) ? rawArgs : ''

  s = s.replace(base[0], base[0].replace(`PolymorphicProps<${base[2]}>`, `PolymorphicProps<${base[2]}, ${iface}>`))
  s = s.replace(/(export interface \w+BaseProps\s+extends)/, `export interface ${iface} extends ${zagState} {}\n  $1`)

  const zagImport = new RegExp(`import type \\{([^}]*)\\} from '@zag-js/${pkg}'`)
  if (zagImport.test(s)) {
    s = s.replace(zagImport, (_m, names) => {
      const list = names
        .split(',')
        .map((n: string) => n.trim())
        .filter(Boolean)
      if (!list.includes(zagState)) list.push(zagState)
      return `import type { ${[...new Set(list)].sort().join(', ')} } from '@zag-js/${pkg}'`
    })
  } else {
    s = s.replace(
      /(<script (?:module lang="ts"|lang="ts" module)>\n)/,
      `$1  import type { ${zagState} } from '@zag-js/${pkg}'\n`,
    )
  }

  const ark = s.match(/<Ark\b[^>]*?\/>/)
  if (!ark) {
    skipped.push([rel, 'no Ark element'])
    continue
  }
  s = s.replace(ark[0], ark[0].replace(/\s*\/>$/, ` state={${api}.${stateGetter}(${args})} />`))

  if (APPLY) writeFileSync(path, s)
  written++
}

console.log(`${APPLY ? 'wrote' : 'would write'} ${written} files, skipped ${skipped.length}`)
const reasons = new Map<string, number>()
for (const [, r] of skipped)
  reasons.set(r.replace(/^\S+ has no/, 'has no'), (reasons.get(r.replace(/^\S+ has no/, 'has no')) ?? 0) + 1)
for (const [r, n] of [...reasons].sort((a, b) => b[1] - a[1]).slice(0, 8))
  console.log(`  ${String(n).padStart(4)}  ${r}`)
