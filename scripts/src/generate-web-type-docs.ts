import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import prettier from 'prettier'
import ts from 'typescript'

interface Doc {
  type: string
  isRequired: boolean
  defaultValue?: string
  description?: string
}

interface Declaration {
  tagName: string
  attributes: { name: string; description?: string }[]
  events: { name: string }[]
  members: { kind: 'field' | 'method'; name: string; description?: string }[]
}

const rootDir = path.resolve(import.meta.dirname, '../..')
const webDir = path.join(rootDir, 'packages/web')
const componentsDir = path.join(webDir, 'src/components')
const typesDir = path.join(rootDir, 'website/src/content/types')
const manifestPath = path.join(webDir, 'dist/custom-elements.json')

if (!existsSync(manifestPath)) throw new Error('Run `bun run build` in packages/web first')

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as { modules: { declarations: Declaration[] }[] }

const sharedAttributes: Record<string, Doc> = {
  'as-child': { type: 'boolean', isRequired: false },
  for: { type: 'string', isRequired: false },
  debug: { type: 'boolean', isRequired: false },
  placement: {
    type: 'Placement',
    isRequired: false,
    defaultValue: '"bottom"',
    description: 'The placement of the floating element relative to its anchor.',
  },
  gutter: {
    type: 'number',
    isRequired: false,
    defaultValue: '8',
    description: 'The gap between the floating element and its anchor.',
  },
  'same-width': {
    type: 'boolean',
    isRequired: false,
    description: 'Whether the floating element matches the width of its anchor.',
  },
  'fit-viewport': {
    type: 'boolean',
    isRequired: false,
    description: 'Whether the floating element fits within the viewport.',
  },
}

const indexFiles = readdirSync(componentsDir)
  .filter((dir) => existsSync(path.join(componentsDir, dir, 'index.ts')))
  .map((dir) => ({ dir, source: readFileSync(path.join(componentsDir, dir, 'index.ts'), 'utf8') }))

const componentOf = (tag: string) =>
  indexFiles.find(({ source }) => source.includes(`'${tag}'`))?.dir ??
  indexFiles
    .map(({ dir }) => dir)
    .sort((a, b) => b.length - a.length)
    .find((dir) => tag === `ark-${dir}` || tag.startsWith(`ark-${dir}-`))

const pascal = (value: string) => value.replace(/(^|-)([a-z])/g, (_, __, char: string) => char.toUpperCase())
const camel = (value: string) => value.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase())

const partName = (tag: string, component: string) => {
  if (tag === `ark-${component}`) return 'Root'
  return pascal(tag.startsWith(`ark-${component}-`) ? tag.slice(`ark-${component}-`.length) : tag.slice(4))
}

const virtualFile = path.join(webDir, '__type_docs__.ts')
const config = ts.getParsedCommandLineOfConfigFile(
  path.join(webDir, 'tsconfig.json'),
  {},
  {
    ...ts.sys,
    onUnRecoverableConfigFileDiagnostic: () => {},
  },
)!
const host = ts.createCompilerHost(config.options)
const virtualSource = `import './src/index.js'
export type { HotkeysCommand, HotkeysOptions, HotkeyOptions, HotkeyStoreOptions, HotkeyRecorderOptions } from '@ark-ui/web/hotkeys'
export type Tags = HTMLElementTagNameMap
`
const readFile = host.readFile
host.readFile = (file) => (file === virtualFile ? virtualSource : readFile(file))
const fileExists = host.fileExists
host.fileExists = (file) => file === virtualFile || fileExists(file)
const getSourceFile = host.getSourceFile
host.getSourceFile = (file, language, ...rest) =>
  file === virtualFile ? ts.createSourceFile(file, virtualSource, language) : getSourceFile(file, language, ...rest)

const program = ts.createProgram([virtualFile], config.options, host)
const checker = program.getTypeChecker()
const sourceFile = program.getSourceFile(virtualFile)!
const moduleSymbol = checker.getSymbolAtLocation(sourceFile)!
const exported = (name: string) =>
  checker.getDeclaredTypeOfSymbol(checker.getExportsOfModule(moduleSymbol).find((symbol) => symbol.name === name)!)
const tags = exported('Tags')

const typeText = (type: ts.Type) =>
  checker.typeToString(
    type,
    sourceFile,
    ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope,
  )

const docOf = (symbol: ts.Symbol, type = checker.getTypeOfSymbolAtLocation(symbol, sourceFile)): Doc => {
  const nonNullable = type.getNonNullableType()
  const defaultValue = symbol.getJsDocTags(checker).find((tag) => tag.name === 'default')?.text?.[0]?.text
  const description = ts.displayPartsToString(symbol.getDocumentationComment(checker)) || undefined
  return { type: typeText(nonNullable), isRequired: false, defaultValue, description }
}

const propertiesOf = (type: ts.Type) =>
  Object.fromEntries(type.getProperties().map((symbol) => [symbol.name, docOf(symbol)]))

const eventsTypeOf = (element: ts.Type) => {
  const listen = element.getProperty('addEventListener')
  const [signature] = listen ? checker.getSignaturesOfType(checker.getTypeOfSymbol(listen), ts.SignatureKind.Call) : []
  const listener = signature?.parameters[1]
  if (!listener) return
  const [call] = checker.getSignaturesOfType(checker.getTypeOfSymbol(listener), ts.SignatureKind.Call)
  const event = call?.parameters[0] && checker.getTypeOfSymbol(call.parameters[0])
  return event && event.flags & ts.TypeFlags.IndexedAccess ? (event as ts.IndexedAccessType).objectType : undefined
}

const attributeTypes = (component: string) => {
  const sources = [path.join(componentsDir, component), path.join(webDir, 'src/utils')].flatMap((dir) =>
    readdirSync(dir)
      .filter((file) => file.endsWith('.ts') && !file.includes('.stories.'))
      .map((file) => readFileSync(path.join(dir, file), 'utf8')),
  )
  const source = sources.join('\n')
  const patterns: [RegExp, string][] = [
    [/\b(?:list|listOf)\(\w+, '([\w-]+)'/g, 'string[]'],
    [/\bnumbers\(\w+, '([\w-]+)'/g, 'number[]'],
    [/\b(?:num|number)\(\w+, '([\w-]+)'/g, 'number'],
    [/\b(?:controlled|bool)\(\w+, '([\w-]+)'/g, 'boolean'],
    [/\b(?:str\(\w+, |getAttribute\()'([\w-]+)'/g, 'string'],
    [/\bhasAttribute\('([\w-]+)'/g, 'boolean'],
  ]
  const types: Record<string, string> = {}
  for (const [pattern, type] of patterns) {
    for (const [, name] of source.matchAll(pattern)) types[name] ??= type
  }
  return types
}

const reactTypes = (component: string) => {
  const file = path.join(typesDir, 'react', `${component}.types.json`)
  return existsSync(file)
    ? (JSON.parse(readFileSync(file, 'utf8')) as Record<string, { props: Record<string, Doc> }>)
    : {}
}

const elementDocs = (declaration: Declaration, component: string) => {
  const tag = declaration.tagName
  const element = checker.getTypeOfSymbol(tags.getProperty(tag)!)
  const react = reactTypes(component)[partName(tag, component)]?.props ?? {}
  const events = eventsTypeOf(element)
  const types = attributeTypes(component)

  const member = (name: string, description?: string): Doc => {
    const symbol = element.getProperty(name)
    const doc = symbol ? docOf(symbol) : { type: 'unknown', isRequired: false }
    return { ...doc, description: doc.description ?? description ?? react[name]?.description }
  }

  const attribute = ({ name, description }: Declaration['attributes'][number]): Doc => {
    const prop = camel(name)
    const known = react[prop] ?? sharedAttributes[name]
    if (known) return { ...known, isRequired: false, description: description ?? known.description }
    const symbol = element.getProperty(prop)
    return symbol
      ? { ...docOf(symbol), description }
      : { type: types[name] ?? 'string', isRequired: false, description }
  }

  const event = ({ name }: Declaration['events'][number]): Doc => {
    const symbol = events?.getProperty(name)
    const type = symbol ? typeText(checker.getTypeOfSymbol(symbol)) : 'CustomEvent'
    const callback = Object.entries(react).find(([key]) => key.toLowerCase() === `on${name}`)?.[1]
    const description = callback?.description?.replace(
      /^(?:Function (?:called|to call|invoked)|(?:The )?[Cc]allback (?:fired|invoked|to be called|called)) when/,
      'Fired when',
    )
    return { type, isRequired: false, description }
  }

  const fields = declaration.members.filter((item) => item.kind === 'field')
  const methods = declaration.members.filter((item) => item.kind === 'method')
  if (fields.some((item) => item.name === 'ready')) {
    fields.push({
      kind: 'field',
      name: 'api',
      description: 'The Zag API of the component. `undefined` until it connects.',
    })
  }

  return {
    tag,
    props: Object.fromEntries(declaration.attributes.map((item) => [item.name, attribute(item)])),
    emits: declaration.events.length
      ? Object.fromEntries(declaration.events.map((item) => [item.name, event(item)]))
      : undefined,
    properties: Object.fromEntries(
      fields
        .map((item): [string, Doc] => [item.name, member(item.name, item.description)])
        .filter(([, doc]) => doc.type !== 'never'),
    ),
    methods: methods.length
      ? Object.fromEntries(methods.map((item) => [item.name, member(item.name, item.description)]))
      : undefined,
  }
}

const components = new Map<string, Record<string, { props: Record<string, Doc> }>>()

for (const declaration of manifest.modules.flatMap((module) => module.declarations)) {
  const component = componentOf(declaration.tagName)
  if (!component) continue
  const parts = components.get(component) ?? {}
  parts[partName(declaration.tagName, component)] = elementDocs(declaration, component)
  components.set(component, parts)
}

components.set(
  'hotkeys',
  Object.fromEntries(
    ['HotkeysCommand', 'HotkeysOptions', 'HotkeyOptions', 'HotkeyStoreOptions', 'HotkeyRecorderOptions'].map((name) => [
      name,
      { props: propertiesOf(exported(name)) },
    ]),
  ),
)

const outDir = path.join(typesDir, 'web')
mkdirSync(outDir, { recursive: true })
const prettierConfig = await prettier.resolveConfig(rootDir)

for (const [component, parts] of components) {
  const json = await prettier.format(JSON.stringify(parts), { ...prettierConfig, parser: 'json' })
  writeFileSync(path.join(outDir, `${component}.types.json`), json)
}

console.log(`Generated ${components.size} web type docs in ${path.relative(rootDir, outDir)}`)
