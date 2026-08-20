/**
 * Vercel rejects a prerendered response over 20MB (FALLBACK_BODY_TOO_LARGE).
 * llms-full.txt crossed it by 37KB once, and `next build` does not catch it.
 *
 * Rendering the routes here would mean building the site, so this bounds them
 * from their inputs instead. An llms-<framework> response is the page corpus
 * with that framework's examples and prop tables inlined, so
 * corpus + examples + types is an upper bound on the response.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const VERCEL_LIMIT_BYTES = 20_000_000
const BUDGET_BYTES = 12_000_000

const FRAMEWORKS = [
  { name: 'react', src: 'src' },
  { name: 'solid', src: 'src' },
  { name: 'vue', src: 'src' },
  { name: 'svelte', src: 'src/lib' },
] as const

const root = resolve('..')
const pagesPath = join(root, 'website/.velite/pages.json')

const dirBytes = (dir: string): number => {
  if (!existsSync(dir)) return 0
  return readdirSync(dir, { withFileTypes: true }).reduce((sum, entry) => {
    const path = join(dir, entry.name)
    return sum + (entry.isDirectory() ? dirBytes(path) : statSync(path).size)
  }, 0)
}

const exampleBytes = (framework: (typeof FRAMEWORKS)[number]) => {
  const componentsDir = join(root, 'packages', framework.name, framework.src, 'components')
  if (!existsSync(componentsDir)) return 0
  return readdirSync(componentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .reduce((sum, entry) => sum + dirBytes(join(componentsDir, entry.name, 'examples')), 0)
}

const main = () => {
  if (!existsSync(pagesPath)) {
    console.error(`No velite output at ${pagesPath}. Run \`bunx velite build\` in website/ first.`)
    process.exit(1)
  }

  const pages: { llm?: string }[] = JSON.parse(readFileSync(pagesPath, 'utf-8'))
  const corpus = pages.reduce((sum, page) => sum + Buffer.byteLength(page.llm ?? '', 'utf8'), 0)
  const mb = (bytes: number) => `${(bytes / 1e6).toFixed(2)}MB`

  const bounds = FRAMEWORKS.map((framework) => ({
    name: framework.name,
    bytes: corpus + exampleBytes(framework) + dirBytes(join(root, 'website/src/content/types', framework.name)),
  })).sort((a, b) => b.bytes - a.bytes)

  const worst = bounds[0]
  if (worst.bytes <= BUDGET_BYTES) {
    console.log(`llms responses bound at ${mb(worst.bytes)} (${worst.name}), budget ${mb(BUDGET_BYTES)}.`)
    return
  }

  console.error(`llms response bound is ${mb(worst.bytes)}, over the ${mb(BUDGET_BYTES)} budget.`)
  console.error(`Vercel rejects any prerendered response over ${mb(VERCEL_LIMIT_BYTES)}.`)
  for (const bound of bounds) console.error(`  llms-${bound.name}.txt <= ${mb(bound.bytes)}`)
  process.exit(1)
}

main()
