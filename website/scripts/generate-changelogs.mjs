import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'src/content/changelogs')
const assetsDir = join(root, 'public/changelog')

mkdirSync(outDir, { recursive: true })

// Local image refs (e.g. `![alt](./v5.svg)`) are relative to the package that owns the
// CHANGELOG, so they 404 once the file is served from the website. Copy each referenced
// asset into public/ and rewrite the path to an absolute, served URL.
const localImage = /(!\[[^\]]*\]\()(\.\/[^)\s]+)(\))/g

for (const framework of ['react', 'solid', 'vue', 'svelte']) {
  const sourceDir = join(root, '..', 'packages', framework)
  const source = join(sourceDir, 'CHANGELOG.md')
  if (!existsSync(source)) continue

  const content = readFileSync(source, 'utf-8').replace(localImage, (match, open, path, close) => {
    const asset = basename(path)
    const from = join(sourceDir, path)
    if (!existsSync(from)) return match
    mkdirSync(join(assetsDir, framework), { recursive: true })
    copyFileSync(from, join(assetsDir, framework, asset))
    return `${open}/changelog/${framework}/${asset}${close}`
  })

  writeFileSync(join(outDir, `${framework}.md`), content)
}
