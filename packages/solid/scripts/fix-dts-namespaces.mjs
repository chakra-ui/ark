import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

// rollup-plugin-dts cannot tell whether a binding imported from another package
// is a type, so `export type { X } from '@zag-js/x'` inside an `export * as NS`
// namespace is emitted as a value: `declare const ns_X: typeof X`. That fails
// with TS2693 under `skipLibCheck: false` and makes `NS.X` unusable as a type.
// The source namespace file decides: members it exports with `export type` are
// re-exported from the namespace's `export type { ... }` list, value exports are
// left alone, and any member that cannot be matched to the source fails the build.
const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const srcRoot = path.join(packageRoot, 'src')
const distRoot = path.join(packageRoot, 'dist')

const FAKE_CONST_RE = /^declare const ([\w$]+): typeof ([\w$]+);\n/gm
const NAMESPACE_RE = /^declare namespace ([\w$]+) \{\n([\s\S]*?)^\}/gm
const EXPORT_RE = /^( {2}export )(type )?\{ ([^}]*) \};$/gm
const TOP_LEVEL_EXPORT_RE = /^export \{ ([^}]*) \};$/gm

const splitSpecifiers = (list) =>
  list
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

const parseSpecifier = (spec) => {
  const [local, exported = local] = spec.split(/\s+as\s+/)
  return { local, exported }
}

const listFiles = async (dir, test) =>
  (await readdir(dir, { recursive: true, withFileTypes: true }))
    .filter((entry) => entry.isFile() && test(entry.name))
    .map((entry) => path.join(entry.parentPath, entry.name))

const parse = async (file) => ts.createSourceFile(file, await readFile(file, 'utf8'), ts.ScriptTarget.Latest)

// Public namespace name -> Map(member name -> exported with `export type`)
const readSourceNamespaces = async () => {
  const namespaces = new Map()
  for (const entry of await listFiles(srcRoot, (name) => /^index\.tsx?$/.test(name))) {
    for (const statement of (await parse(entry)).statements) {
      if (!ts.isExportDeclaration(statement) || !statement.exportClause) continue
      if (!ts.isNamespaceExport(statement.exportClause)) continue
      const target = path.resolve(path.dirname(entry), statement.moduleSpecifier.text)
      const members = new Map()
      for (const member of (await parse(target)).statements) {
        if (!ts.isExportDeclaration(member) || !member.exportClause || !ts.isNamedExports(member.exportClause)) continue
        for (const element of member.exportClause.elements) {
          members.set(element.name.text, member.isTypeOnly || element.isTypeOnly)
        }
      }
      namespaces.set(statement.exportClause.name.text, members)
    }
  }
  return namespaces
}

const publicNames = (code) => {
  const names = new Map()
  for (const [, list] of code.matchAll(TOP_LEVEL_EXPORT_RE)) {
    for (const spec of splitSpecifiers(list)) {
      const { local, exported } = parseSpecifier(spec)
      names.set(local, exported)
    }
  }
  return names
}

const fixNamespace = (body, typeAliases) => {
  const moved = []
  let hasTypeExport = false

  let next = body.replace(EXPORT_RE, (line, prefix, type, list) => {
    if (type) {
      hasTypeExport = true
      return line
    }
    const kept = []
    for (const spec of splitSpecifiers(list)) {
      const { local, exported } = parseSpecifier(spec)
      if (typeAliases.has(local)) moved.push(`${typeAliases.get(local)} as ${exported}`)
      else kept.push(spec)
    }
    return kept.length > 0 ? `${prefix}{ ${kept.join(', ')} };` : ''
  })

  if (moved.length === 0) return body

  if (hasTypeExport) {
    next = next.replace(/^( {2}export type \{ )([^}]*)( \};)$/m, (_m, open, list, close) => {
      return `${open}${[...moved, ...splitSpecifiers(list)].join(', ')}${close}`
    })
  } else {
    next = `${next}  export type { ${moved.join(', ')} };\n`
  }

  return next.replace(/^\n/gm, '')
}

const fixFile = (code, sourceNamespaces, problems) => {
  const fakeConsts = new Map([...code.matchAll(FAKE_CONST_RE)].map(([, alias, original]) => [alias, original]))
  if (fakeConsts.size === 0) return code

  const publicName = publicNames(code)
  const typeAliases = new Map()

  for (const [, namespace, body] of code.matchAll(NAMESPACE_RE)) {
    const members = sourceNamespaces.get(publicName.get(namespace))
    for (const [, , , list] of body.matchAll(EXPORT_RE)) {
      for (const spec of splitSpecifiers(list)) {
        const { local, exported } = parseSpecifier(spec)
        if (!fakeConsts.has(local)) continue
        const typeOnly = members?.get(exported)
        if (typeOnly === undefined) problems.push(`${publicName.get(namespace) ?? namespace}.${exported}`)
        else if (typeOnly) typeAliases.set(local, fakeConsts.get(local))
      }
    }
  }

  if (typeAliases.size === 0) return code

  return code
    .replace(FAKE_CONST_RE, (line, alias) => (typeAliases.has(alias) ? '' : line))
    .replace(NAMESPACE_RE, (block, _name, body) => block.replace(body, fixNamespace(body, typeAliases)))
}

const sourceNamespaces = await readSourceNamespaces()
const files = await listFiles(distRoot, (name) => name.endsWith('.d.ts'))
const problems = []

const results = await Promise.all(
  files.map(async (file) => {
    const code = await readFile(file, 'utf8')
    return { file, code, next: fixFile(code, sourceNamespaces, problems) }
  }),
)

if (problems.length > 0) {
  console.error(`fix-dts-namespaces: no source export found for:\n  ${problems.join('\n  ')}`)
  process.exit(1)
}

const changed = results.filter(({ code, next }) => next !== code)
await Promise.all(changed.map(({ file, next }) => writeFile(file, next)))

console.log(`fix-dts-namespaces: rewrote ${changed.length} of ${files.length} declaration files`)
