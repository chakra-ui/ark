import { readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { globbySync } from 'globby'
import { Node, Project, SyntaxKind } from 'ts-morph'

const root = resolve(dirname(new URL(import.meta.url).pathname), '../..')

const APPLY = process.argv.includes('--apply')

// which state getters each zag package actually exposes
// getter name -> whether it accepts an argument
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
  for (const f of globbySync('*.{ts,tsx}', { cwd: dir, absolute: true })) {
    for (const m of readFileSync(f, 'utf8').matchAll(/from '@zag-js\/([\w-]+)'/g)) {
      if (notMachine.has(m[1])) continue
      counts.set(m[1], (counts.get(m[1]) ?? 0) + 1)
    }
  }
  const best = [...counts].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null
  pkgByDir.set(dir, best)
  return best
}

const project = new Project({
  tsConfigFilePath: join(root, 'packages/react/tsconfig.json'),
  skipAddingFilesFromTsConfig: true,
})
const partFiles = globbySync('packages/react/src/components/*/*.tsx', {
  cwd: root,
  absolute: true,
  ignore: ['**/examples/**', '**/tests/**', '**/*.stories.tsx', '**/*.test.tsx'],
})

interface Plan {
  sf: import('ts-morph').SourceFile
  file: string
  pkg: string
  stateGetter: string
  args: string
  api: string
  iface: string
  zagState: string
}

const plans: Plan[] = []
const skipped: Array<[string, string]> = []

for (const path of partFiles) {
  const sf = project.addSourceFileAtPath(path)
  const text = sf.getFullText()
  if (!text.includes('PolymorphicProps')) {
    skipped.push([path, 'not polymorphic'])
    continue
  }
  if (/PolymorphicProps</.test(text)) {
    skipped.push([path, 'already typed'])
    continue
  }

  // the api call that produces the part props, e.g. accordion.getItemProps(itemProps)
  const call = sf.getDescendantsOfKind(SyntaxKind.CallExpression).find((c) => {
    const e = c.getExpression()
    return Node.isPropertyAccessExpression(e) && /^get[A-Z]\w*Props$/.test(e.getName())
  })
  if (!call) {
    skipped.push([path, 'no getXProps call'])
    continue
  }

  const access = call.getExpression() as import('ts-morph').PropertyAccessExpression
  const propsGetter = access.getName()
  const stateGetter = propsGetter.replace(/Props$/, 'State')
  const api = access.getExpression().getText()

  const pkg = machinePkg(dirname(path))
  if (!pkg) {
    skipped.push([path, 'no machine package for this component'])
    continue
  }
  if (!getters(pkg).has(stateGetter)) {
    skipped.push([path, `${pkg} has no ${stateGetter}`])
    continue
  }

  const iface = sf
    .getInterfaces()
    .find(
      (i) => /BaseProps$/.test(i.getName()) && i.getExtends().some((e) => e.getText().startsWith('PolymorphicProps')),
    )
  if (!iface) {
    skipped.push([path, 'no BaseProps interface'])
    continue
  }

  plans.push({
    sf,
    file: path,
    pkg,
    stateGetter,
    args: getters(pkg).get(stateGetter)
      ? call
          .getArguments()
          .map((a) => a.getText())
          .join(', ')
      : '',
    api,
    iface: iface.getName().replace(/BaseProps$/, 'State'),
    zagState: stateGetter.replace(/^get/, ''),
  })
}

console.log(`plans: ${plans.length}   skipped: ${skipped.length}\n`)
for (const p of plans) {
  console.log(`  ${p.file.replace(`${root}/packages/react/src/components/`, '')}`)
  console.log(
    `      state={${p.api}.${p.stateGetter}(${p.args})}   ${p.iface} extends ${p.zagState} from @zag-js/${p.pkg}`,
  )
}
console.log('\nskip reasons:')
const reasons = new Map<string, number>()
for (const [, r] of skipped)
  reasons.set(r.replace(/^\S+ has no/, 'has no'), (reasons.get(r.replace(/^\S+ has no/, 'has no')) ?? 0) + 1)
for (const [r, n] of [...reasons].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(4)}  ${r}`)
if (!APPLY) console.log('\n(discovery only — pass --apply to write)')

if (APPLY) {
  let written = 0
  const failed: Array<[string, string]> = []
  for (const p of plans) {
    try {
      const sf = p.sf

      // the element that receives the part's props is the one spreading them
      const spread = sf.getFirstDescendantByKind(SyntaxKind.JsxSpreadAttribute)
      if (!spread) {
        failed.push([p.file, 'no element spreading props'])
        continue
      }

      const attrs =
        spread.getFirstAncestorByKind(SyntaxKind.JsxOpeningElement) ??
        spread.getFirstAncestorByKind(SyntaxKind.JsxSelfClosingElement)
      if (!attrs) {
        failed.push([p.file, 'no enclosing jsx element'])
        continue
      }
      attrs.addAttribute({ name: 'state', initializer: `{${p.api}.${p.stateGetter}(${p.args})}` })

      // pull in the zag state type
      const named = sf.getImportDeclaration(
        (d) => d.getModuleSpecifierValue() === `@zag-js/${p.pkg}` && !d.getNamespaceImport(),
      )
      if (named) {
        if (!named.getNamedImports().some((n) => n.getName() === p.zagState)) named.addNamedImport(p.zagState)
      } else {
        sf.addImportDeclaration({ moduleSpecifier: `@zag-js/${p.pkg}`, namedImports: [p.zagState], isTypeOnly: true })
      }

      const base = sf.getInterfaceOrThrow(`${p.iface.replace(/State$/, '')}BaseProps`)
      base.getExtends().forEach((e) => {
        if (e.getText() === 'PolymorphicProps') e.replaceWithText(`PolymorphicProps<${p.iface}>`)
      })
      sf.insertInterface(base.getChildIndex(), {
        name: p.iface,
        isExported: true,
        extends: [p.zagState],
      })

      sf.saveSync()
      written++
    } catch (e) {
      failed.push([p.file, (e as Error).message.split('\n')[0]])
    }
  }
  console.log(`\nwrote ${written} files, ${failed.length} failed`)
  for (const [f, r] of failed) console.log(`  ${r}: ${f}`)
}
