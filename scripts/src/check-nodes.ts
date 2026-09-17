import { parse } from 'node:path'
import { readFileSync } from 'fs-extra'
import { globby } from 'globby'

interface Adapter {
  name: string
  dir: string
  extension: string
  elementOf: (content: string) => string | undefined
}

// A part's element is the root ark node it renders. Nested ark nodes are children, not the contract.
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
    elementOf: rootElement(/<Ark\s+as="([A-Za-z0-9]+)"/),
  },
]

// Parts whose element still differs across adapters, tracked in
// https://github.com/chakra-ui/ark/discussions/4047. The list is shrink-only: a part that no longer
// diverges has to be deleted from it, and a divergence that is not listed fails the check.
const knownDivergences = new Set([
  'angle-slider/angle-slider-marker',
  'angle-slider/angle-slider-value-text',
  'date-picker/date-picker-table-cell-trigger',
  'file-upload/file-upload-item-group',
  'listbox/listbox-item-text',
  'menu/menu-separator',
  'number-input/number-input-scrubber',
  'popover/popover-title',
  'slider/slider-value-text',
  'steps/steps-list',
  'toggle/toggle-indicator',
  'tree-view/tree-view-branch-trigger',
  'tree-view/tree-view-item',
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
  const parts = new Map<string, Map<string, string>>()

  for (const adapter of adapters) {
    for (const { part, element } of await readParts(adapter)) {
      // A file that renders no ark node (context providers, hidden inputs) has no element to compare.
      if (!element) continue
      if (!parts.has(part)) parts.set(part, new Map())
      parts.get(part)?.set(adapter.name, element)
    }
  }

  const describe = (part: string) => {
    const byAdapter = parts.get(part) ?? new Map<string, string>()
    return Array.from(byAdapter, ([adapter, element]) => `${adapter}: ${element}`).join(', ')
  }

  const divergent = Array.from(parts)
    .filter(([, byAdapter]) => byAdapter.size > 1 && new Set(byAdapter.values()).size > 1)
    .map(([part]) => part)
    .sort()

  const unexpected = divergent.filter((part) => !knownDivergences.has(part))
  const stale = Array.from(knownDivergences)
    .filter((part) => !divergent.includes(part))
    .sort()

  if (unexpected.length > 0) {
    console.log('The following parts render a different element across adapters:')
    for (const part of unexpected) {
      console.log(`  ${part} — ${describe(part)}`)
    }
    console.log("\nA part's element is part of its contract. Align the adapters before merging.")
  }

  if (stale.length > 0) {
    console.log('\nThe following parts no longer diverge. Delete them from knownDivergences:')
    for (const part of stale) {
      console.log(`  ${part}`)
    }
  }

  if (unexpected.length > 0 || stale.length > 0) {
    process.exit(1)
  }

  console.log(`Checked ${parts.size} parts across ${adapters.map((adapter) => adapter.name).join(', ')}.`)
  console.log(`${divergent.length} known divergences:`)
  for (const part of divergent) {
    console.log(`  ${part} — ${describe(part)}`)
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
