import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { runTransform } from '../src/run.ts'
import { findTransform } from '../src/transforms.ts'

let dir: string

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'ark-codemod-run-'))
})

afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

function run(name: string) {
  const transform = findTransform(name)
  if (!transform) throw new Error(`missing transform ${name}`)
  return runTransform(transform, {
    cwd: dir,
    include: ['**/*'],
    exclude: [],
    dry: false,
    concurrency: 1,
    printDiff: false,
    crossFile: false,
  })
}

describe('runTransform', () => {
  it('runs prop renames on files that never mention asChild', async () => {
    const file = join(dir, 'app.tsx')
    writeFileSync(
      file,
      `import { Carousel } from '@ark-ui/react/carousel'\nexport const A = () => <Carousel.Root slideCount={3} />\n`,
    )

    const summary = await run('react/carousel-props')

    expect(summary.sites).toBe(1)
    expect(readFileSync(file, 'utf8')).toContain('<Carousel.Root count={3} />')
  })

  it('skips files that never mention the renamed component', async () => {
    const file = join(dir, 'app.tsx')
    const source = `import { Menu } from '@ark-ui/react/menu'\nexport const A = () => <Menu.Root />\n`
    writeFileSync(file, source)

    const summary = await run('react/carousel-props')

    expect(summary.sites).toBe(0)
    expect(readFileSync(file, 'utf8')).toBe(source)
  })

  it('runs the css transform on stylesheets', async () => {
    const file = join(dir, 'app.css')
    writeFileSync(file, `[data-scope="dialog"][data-part="trigger"] { color: red; }\n`)

    const summary = await run('css/data-attributes')

    expect(summary.sites).toBe(1)
    expect(readFileSync(file, 'utf8')).toContain('[data-dialog-trigger] {')
  })

  it('still runs as-child-to-render', async () => {
    const file = join(dir, 'app.tsx')
    writeFileSync(
      file,
      `import { Menu } from '@ark-ui/react/menu'\nexport const A = () => <Menu.Item asChild><a href="#">x</a></Menu.Item>\n`,
    )

    const summary = await run('react/as-child-to-render')

    expect(summary.sites).toBe(1)
    expect(readFileSync(file, 'utf8')).toContain('<Menu.Item render={<a href="#">x</a>} />')
  })
})
