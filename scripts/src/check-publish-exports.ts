import { readFileSync } from 'node:fs'

const read = (path: string) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'))

const publishedKeys = (framework: string): string[] => {
  if (framework === 'svelte') {
    const pkg = read('../../packages/svelte/package.json')
    const replace: Record<string, unknown> = pkg['clean-package'].replace
    const subpaths = new Set<string>()
    for (const key of Object.keys(replace)) {
      const match = key.match(/^exports\.\\(\.[^.]*|\.\/[^.]+)\.(?:svelte|types|default)$/)
      if (match) subpaths.add(match[1] === '.' ? '.' : match[1])
    }
    return [...subpaths]
  }
  const config = read(`../../packages/${framework}/clean-package.config.json`)
  return Object.keys(config.replace.exports)
}

const main = () => {
  const frameworks = ['react', 'solid', 'vue', 'svelte']
  const problems: string[] = []

  for (const framework of frameworks) {
    const pkg = read(`../../packages/${framework}/package.json`)
    const source = Object.keys(pkg.exports ?? {})
    const published = publishedKeys(framework)
    const missing = source.filter((key) => !published.includes(key))
    if (missing.length > 0) {
      problems.push(`${framework}: source exports missing from publish config: ${missing.join(', ')}`)
    }
  }

  if (problems.length > 0) {
    console.log('Published `exports` dropped source entrypoints:')
    for (const problem of problems) console.log(`  - ${problem}`)
    console.log('\nAdd the missing keys to the framework package clean-package config.')
    process.exit(1)
  }
}

main()
