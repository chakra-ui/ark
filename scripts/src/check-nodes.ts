import { parse } from 'node:path'
import { readFileSync } from 'fs-extra'
import { globby } from 'globby'

interface Adapter {
  name: string
  dir: string
  extension: string
  elementOf: (content: string) => string | undefined
  // the element types a part declares, so a part can't render one element and type another
  typesOf: (content: string) => string[]
  typeFits: (element: string, type: string) => boolean
}

const rootElement = (pattern: RegExp) => (content: string) => content.match(pattern)?.[1]

const matchesOf = (content: string, ...patterns: RegExp[]) =>
  patterns.flatMap((pattern) => Array.from(content.matchAll(pattern), (match) => match[1]))

const domInterfaces: Record<string, string> = {
  a: 'HTMLAnchorElement',
  button: 'HTMLButtonElement',
  div: 'HTMLDivElement',
  fieldset: 'HTMLFieldSetElement',
  form: 'HTMLFormElement',
  h1: 'HTMLHeadingElement',
  h2: 'HTMLHeadingElement',
  h3: 'HTMLHeadingElement',
  h4: 'HTMLHeadingElement',
  h5: 'HTMLHeadingElement',
  h6: 'HTMLHeadingElement',
  hr: 'HTMLHRElement',
  iframe: 'HTMLIFrameElement',
  img: 'HTMLImageElement',
  input: 'HTMLInputElement',
  label: 'HTMLLabelElement',
  legend: 'HTMLLegendElement',
  li: 'HTMLLIElement',
  ol: 'HTMLOListElement',
  option: 'HTMLOptionElement',
  output: 'HTMLOutputElement',
  p: 'HTMLParagraphElement',
  select: 'HTMLSelectElement',
  span: 'HTMLSpanElement',
  table: 'HTMLTableElement',
  tbody: 'HTMLTableSectionElement',
  td: 'HTMLTableCellElement',
  textarea: 'HTMLTextAreaElement',
  th: 'HTMLTableCellElement',
  thead: 'HTMLTableSectionElement',
  tr: 'HTMLTableRowElement',
  ul: 'HTMLUListElement',
}

const vueAttributes: Record<string, string> = {
  a: 'Anchor',
  button: 'Button',
  fieldset: 'Fieldset',
  form: 'Form',
  iframe: 'Iframe',
  img: 'Img',
  input: 'Input',
  label: 'Label',
  li: 'Li',
  ol: 'Ol',
  option: 'Option',
  output: 'Output',
  select: 'Select',
  table: 'Table',
  td: 'Td',
  textarea: 'Textarea',
  th: 'Th',
}

const propsTypes = /HTML(?:Ark)?Props<'([A-Za-z0-9]+)'/g
const polymorphicTypes = /PolymorphicProps<\s*'([A-Za-z0-9]+)'/g

const fitsTag = (element: string, type: string) => type === element

const fitsReact = (element: string, type: string) => {
  if (!/^HTML[A-Za-z]*Element$/.test(type)) return fitsTag(element, type)
  return type === 'HTMLElement' ? !(element in domInterfaces) : domInterfaces[element] === type
}

const fitsVue = (element: string, type: string) => type === `${vueAttributes[element] ?? ''}HTMLAttributes`

const adapters: Adapter[] = [
  {
    name: 'react',
    dir: '../packages/react/src/components',
    extension: 'tsx',
    elementOf: rootElement(/<ark\.([A-Za-z0-9]+)/),
    typesOf: (content) => matchesOf(content, propsTypes, /forwardRef<\s*(HTML[A-Za-z]*Element)/g),
    typeFits: fitsReact,
  },
  {
    name: 'solid',
    dir: '../packages/solid/src/components',
    extension: 'tsx',
    elementOf: rootElement(/<ark\.([A-Za-z0-9]+)/),
    typesOf: (content) => matchesOf(content, propsTypes, polymorphicTypes),
    typeFits: fitsTag,
  },
  {
    name: 'vue',
    dir: '../packages/vue/src/components',
    extension: 'vue',
    elementOf: rootElement(/<ark\.([A-Za-z0-9]+)/),
    typesOf: (content) => matchesOf(content, /\b([A-Za-z]*HTMLAttributes)\b/g),
    typeFits: fitsVue,
  },
  {
    name: 'svelte',
    dir: '../packages/svelte/src/lib/components',
    extension: 'svelte',
    elementOf: rootElement(/<Ark\b[^>]*?\bas="([A-Za-z0-9]+)"/),
    typesOf: (content) => matchesOf(content, propsTypes, polymorphicTypes),
    typeFits: fitsTag,
  },
]

// Parts that render a native element rather than an ark node on some adapters, so there is no
// element to compare. The list is shrink-only: an entry that no longer applies fails the check.
const knownUnreadableRoots = new Set(['frame/frame', 'highlight/highlight', 'json-tree-view/json-tree-view-key-node'])

const readParts = async (adapter: Adapter) => {
  const files = await globby([
    `${adapter.dir}/*/*.${adapter.extension}`,
    `!${adapter.dir}/*/examples/**`,
    `!${adapter.dir}/*/tests/**`,
    `!${adapter.dir}/**/*.stories.${adapter.extension}`,
    `!${adapter.dir}/**/*.test.${adapter.extension}`,
  ])

  return files.map((file) => {
    const [component] = file.slice(`${adapter.dir}/`.length).split('/')
    const content = readFileSync(file, 'utf-8')
    const element = adapter.elementOf(content)
    const rendersOneElement =
      new Set(matchesOf(content, /<ark\.([A-Za-z0-9]+)/g, /<Ark\b[^>]*?\bas="([A-Za-z0-9]+)"/g)).size === 1
    const mistyped =
      element && rendersOneElement
        ? Array.from(new Set(adapter.typesOf(content).filter((type) => !adapter.typeFits(element, type))))
        : []

    return { part: `${component}/${parse(file).name}`, element, mistyped }
  })
}

const main = async () => {
  const parts = new Map<string, Map<string, string | undefined>>()
  const mistypedParts = new Map<string, string[]>()

  for (const adapter of adapters) {
    for (const { part, element, mistyped } of await readParts(adapter)) {
      if (!parts.has(part)) parts.set(part, new Map())
      parts.get(part)?.set(adapter.name, element)
      if (mistyped.length > 0) {
        mistypedParts.set(part, [
          ...(mistypedParts.get(part) ?? []),
          `${adapter.name}: renders ${element}, typed ${mistyped.join(' / ')}`,
        ])
      }
    }
  }

  const comparable = Array.from(parts).filter(([, byAdapter]) =>
    Array.from(byAdapter.values()).some((element) => element !== undefined),
  )

  const describe = (part: string) => {
    const byAdapter = parts.get(part) ?? new Map<string, string | undefined>()
    return Array.from(byAdapter, ([adapter, element]) => `${adapter}: ${element ?? 'not an ark node'}`).join(', ')
  }

  const elementsOf = (byAdapter: Map<string, string | undefined>) =>
    Array.from(byAdapter.values()).filter((element): element is string => element !== undefined)

  const divergent = comparable
    .filter(([, byAdapter]) => elementsOf(byAdapter).length > 1)
    .filter(([, byAdapter]) => new Set(elementsOf(byAdapter)).size > 1)
    .map(([part]) => part)
    .sort()

  const unreadable = comparable
    .filter(([, byAdapter]) => Array.from(byAdapter.values()).some((element) => element === undefined))
    .map(([part]) => part)
    .sort()

  const report = (heading: string, found: string[], known: Set<string>): { failed: boolean; tracked: string[] } => {
    const unexpected = found.filter((part) => !known.has(part))
    const stale = Array.from(known)
      .filter((part) => !found.includes(part))
      .sort()

    if (unexpected.length > 0) {
      console.log(`${heading}:`)
      for (const part of unexpected) {
        console.log(`  ${part} — ${describe(part)}`)
      }
      console.log()
    }

    if (stale.length > 0) {
      console.log(`The following parts no longer apply. Delete them from the list in check-nodes.ts:`)
      for (const part of stale) {
        console.log(`  ${part}`)
      }
      console.log()
    }

    return { failed: unexpected.length > 0 || stale.length > 0, tracked: found.filter((part) => known.has(part)) }
  }

  if (divergent.length > 0) {
    console.log(
      "The following parts render a different element across adapters, and a part's element is part of its contract:",
    )
    for (const part of divergent) {
      console.log(`  ${part} — ${describe(part)}`)
    }
    console.log()
  }

  const roots = report(
    'The following parts no longer render an ark node on every adapter, so their element cannot be compared',
    unreadable,
    knownUnreadableRoots,
  )

  if (mistypedParts.size > 0) {
    console.log('The following parts type a different element than the one they render:')
    for (const [part, details] of Array.from(mistypedParts).sort(([a], [b]) => a.localeCompare(b))) {
      console.log(`  ${part} — ${details.join('; ')}`)
    }
    console.log()
  }

  if (divergent.length > 0 || roots.failed || mistypedParts.size > 0) {
    process.exit(1)
  }

  console.log(`Checked ${comparable.length} parts across ${adapters.map((adapter) => adapter.name).join(', ')}.`)
  console.log(`${roots.tracked.length} parts not read through the factory:`)
  for (const part of roots.tracked) {
    console.log(`  ${part} — ${describe(part)}`)
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
