import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'src/content/changelogs')

mkdirSync(outDir, { recursive: true })

for (const framework of ['react', 'solid', 'vue', 'svelte']) {
  const source = join(root, '..', 'packages', framework, 'CHANGELOG.md')
  if (existsSync(source)) copyFileSync(source, join(outDir, `${framework}.md`))
}
