import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'src/content/changelogs')
const assetsDir = join(root, 'public/changelog')

mkdirSync(outDir, { recursive: true })

const localImage = /(!\[[^\]]*\]\(\s*)(<[^>]+>|[^)\s]+)(\s*(?:"[^"]*"|'[^']*'|\([^)]*\))?\s*\))/g

const isInside = (parent, child) => child === parent || child.startsWith(parent + sep)

for (const framework of ['react', 'solid', 'vue', 'svelte']) {
  const sourceDir = join(root, '..', 'packages', framework)
  const source = join(sourceDir, 'CHANGELOG.md')
  if (!existsSync(source)) continue

  const content = readFileSync(source, 'utf-8').replace(localImage, (match, open, dest, close) => {
    const target = dest.startsWith('<') ? dest.slice(1, -1) : dest
    if (!target.startsWith('.')) return match

    const from = resolve(sourceDir, target)
    if (!isInside(sourceDir, from) || !existsSync(from)) return match

    const rel = relative(sourceDir, from)
    const to = join(assetsDir, framework, rel)
    if (!isInside(join(assetsDir, framework), to)) return match

    mkdirSync(dirname(to), { recursive: true })
    copyFileSync(from, to)
    return `${open}/changelog/${framework}/${rel.split(sep).join('/')}${close}`
  })

  writeFileSync(join(outDir, `${framework}.md`), content)
}
