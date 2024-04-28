import { parse } from 'node:path'
import { readFileSync } from 'fs-extra'
import { globby } from 'globby'

const main = async () => {
  const components = await globby(['../frameworks/*/src/components/*/*.{tsx,vue}'])

  const items = components
    .filter((file) => !file.endsWith('.stories.tsx'))
    .filter((file) => !file.endsWith('.stories.vue'))
    .filter((file) => !file.endsWith('.test.tsx'))
    .map((file) => {
      const content = readFileSync(file, 'utf-8')
      const match = content.match(/<ark.([A-Za-z]*)/)
      return {
        name: parse(file).name,
        node: match?.[1],
      }
    })

  groupItems(items)
}

interface Item {
  name: string
  node?: string
}

function groupItems(items: Item[]): void {
  const groupedItems = new Map<string, string[]>()

  for (const item of items) {
    if (!groupedItems.has(item.name)) {
      groupedItems.set(item.name, [])
    }
    if (item.node !== undefined) {
      groupedItems.get(item.name)?.push(item.node)
    }
  }

  const result = Array.from(groupedItems).filter(
    ([_, nodes]) => nodes.length > 1 && new Set(nodes).size > 1,
  )

  if (result.length > 0) {
    console.log('The following components have mixed nodes:')
    result.map(([name, nodes]) => {
      console.log(name, nodes)
    })
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
