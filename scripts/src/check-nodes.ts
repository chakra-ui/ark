import { parse } from 'node:path'
import { readFileSync } from 'fs-extra'
import { globby } from 'globby'

interface Adapter {
  name: string
  dir: string
  extension: string
  elementOf: (content: string) => string | undefined
}

const rootElement = (pattern: RegExp) => (content: string) => content.match(pattern)?.[1]

const adapters: Adapter[] = [
  {
    name: 'react',
    dir: '../packages/react/src/components',
    extension: 'tsx',
    elementOf: rootElement(/<ark\.([A-Za-z0-9]+)/),
  },
  {
    name: 'solid',
    dir: '../packages/solid/src/components',
    extension: 'tsx',
    elementOf: rootElement(/<ark\.([A-Za-z0-9]+)/),
  },
  {
    name: 'vue',
    dir: '../packages/vue/src/components',
    extension: 'vue',
    elementOf: rootElement(/<ark\.([A-Za-z0-9]+)/),
  },
  {
    name: 'svelte',
    dir: '../packages/svelte/src/lib/components',
    extension: 'svelte',
    elementOf: rootElement(/<Ark\b[^>]*?\bas="([A-Za-z0-9]+)"/),
  },
]

// Both lists are shrink-only: an entry that no longer applies fails the check, so a fix has to
// delete its line. Tracked in https://github.com/chakra-ui/ark/discussions/4047
const knownDivergences = new Set([
  'angle-slider/angle-slider-marker',
  'angle-slider/angle-slider-value-text',
  'listbox/listbox-item-text',
  'number-input/number-input-scrubber',
  'popover/popover-title',
  'toggle/toggle-indicator',
])

// Parts that render a native element rather than an ark node on some adapters, so there is no
// element to compare.
const knownUnreadableRoots = new Set([
  'frame/frame',
  'highlight/highlight',
  'json-tree-view/json-tree-view-key-node',
  'toast/toast-root',
])

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
    return {
      part: `${component}/${parse(file).name}`,
      element: adapter.elementOf(readFileSync(file, 'utf-8')),
    }
  })
}

const main = async () => {
  const parts = new Map<string, Map<string, string | undefined>>()

  for (const adapter of adapters) {
    for (const { part, element } of await readParts(adapter)) {
      if (!parts.has(part)) parts.set(part, new Map())
      parts.get(part)?.set(adapter.name, element)
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

  const elements = report(
    "The following parts render a different element across adapters, and a part's element is part of its contract",
    divergent,
    knownDivergences,
  )
  const roots = report(
    'The following parts no longer render an ark node on every adapter, so their element cannot be compared',
    unreadable,
    knownUnreadableRoots,
  )

  if (elements.failed || roots.failed) {
    process.exit(1)
  }

  console.log(`Checked ${comparable.length} parts across ${adapters.map((adapter) => adapter.name).join(', ')}.`)
  console.log(
    `${elements.tracked.length} known divergences, ${roots.tracked.length} parts not read through the factory:`,
  )
  for (const part of [...elements.tracked, ...roots.tracked].sort()) {
    console.log(`  ${part} — ${describe(part)}`)
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
