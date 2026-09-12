import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { reactAsChildToRender } from '../src/transforms/as-child-to-render/react.ts'
import { solidAsChildToRender } from '../src/transforms/as-child-to-render/solid.ts'

let dir: string

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'ark-codemod-'))
})

afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

function write(name: string, content: string): string {
  const path = join(dir, name)
  writeFileSync(path, content)
  return path
}

describe('cross-file barrel resolution', () => {
  it('resolves a component re-exported through a local barrel (react)', () => {
    write('ui.ts', `export { Menu } from '@ark-ui/react/menu'\n`)
    const consumer = write(
      'app.tsx',
      `import { Menu } from './ui'\nconst A = () => <Menu.Item asChild><a href="#">x</a></Menu.Item>\n`,
    )
    const source = `import { Menu } from './ui'\nconst A = () => <Menu.Item asChild><a href="#">x</a></Menu.Item>\n`

    const off = reactAsChildToRender(source, consumer)
    expect(off.code).toBeNull()

    const on = reactAsChildToRender(source, consumer, { crossFile: true })
    expect(on.count).toBe(1)
    expect(on.code).toContain('<Menu.Item render={<a href="#">x</a>} />')
  })

  it('follows a transitive barrel and an aliased re-export (react)', () => {
    write('vendor.ts', `export { Menu as ArkMenu } from '@ark-ui/react/menu'\n`)
    write('ui.ts', `export { ArkMenu } from './vendor'\n`)
    const consumer = write('app.tsx', 'x')
    const source = `import { ArkMenu } from './ui'\nconst A = () => <ArkMenu.Item asChild><a href="#">x</a></ArkMenu.Item>\n`

    const on = reactAsChildToRender(source, consumer, { crossFile: true })
    expect(on.count).toBe(1)
    expect(on.code).toContain('<ArkMenu.Item render={<a href="#">x</a>} />')
  })

  it('resolves an export-star barrel (react)', () => {
    write('ui.ts', `export * from '@ark-ui/react/menu'\n`)
    const consumer = write('app.tsx', 'x')
    const source = `import { Menu } from './ui'\nconst A = () => <Menu.Item asChild><a href="#">x</a></Menu.Item>\n`

    const on = reactAsChildToRender(source, consumer, { crossFile: true })
    expect(on.count).toBe(1)
  })

  it('resolves an import-then-reexport barrel (react)', () => {
    write('ui.ts', `import { Menu } from '@ark-ui/react/menu'\nexport { Menu }\n`)
    const consumer = write('app.tsx', 'x')
    const source = `import { Menu } from './ui'\nconst A = () => <Menu.Item asChild><a href="#">x</a></Menu.Item>\n`

    const on = reactAsChildToRender(source, consumer, { crossFile: true })
    expect(on.count).toBe(1)
  })

  it('leaves a non-ark barrel component alone (react)', () => {
    write('ui.ts', `export { Tooltip } from '@radix-ui/react-tooltip'\n`)
    const consumer = write('app.tsx', 'x')
    const source = `import { Tooltip } from './ui'\nconst A = () => <Tooltip.Trigger asChild><a href="#">x</a></Tooltip.Trigger>\n`

    const on = reactAsChildToRender(source, consumer, { crossFile: true })
    expect(on.code).toBeNull()
  })

  it('resolves a styled(ark.x) wrapper across files (react)', () => {
    write(
      'prim.tsx',
      `import { ark } from '@ark-ui/react/factory'\nimport { styled } from 'styled-system/jsx'\nexport const Btn = styled(ark.button, {})\n`,
    )
    const consumer = write('app.tsx', 'x')
    const source = `import { Btn } from './prim'\nconst A = () => <Btn asChild><a href="#">x</a></Btn>\n`

    const off = reactAsChildToRender(source, consumer)
    expect(off.code).toBeNull()

    const on = reactAsChildToRender(source, consumer, { crossFile: true })
    expect(on.count).toBe(1)
    expect(on.code).toContain('<Btn render={<a href="#">x</a>} />')
  })

  it('resolves a forwardRef wrapper chain across files (react)', () => {
    write(
      'prim.tsx',
      `import { ark } from '@ark-ui/react/factory'\nimport { styled } from 'styled-system/jsx'\nexport const Button = styled(ark.button, {})\n`,
    )
    write(
      'button.tsx',
      `import { forwardRef } from 'react'\nimport { Button as Styled } from './prim'\nexport const Button = forwardRef((props, ref) => <Styled {...props} ref={ref} />)\n`,
    )
    const consumer = write('app.tsx', 'x')
    const source = `import { Button } from './button'\nconst A = () => <Button asChild><a href="#">x</a></Button>\n`

    const on = reactAsChildToRender(source, consumer, { crossFile: true })
    expect(on.count).toBe(1)
    expect(on.code).toContain('<Button render={<a href="#">x</a>} />')
  })

  it('leaves a wrapper that does not bottom out at ark alone (react)', () => {
    write('prim.tsx', `import { styled } from 'styled-system/jsx'\nexport const Box = styled('div', {})\n`)
    const consumer = write('app.tsx', 'x')
    const source = `import { Box } from './prim'\nconst A = () => <Box asChild><a href="#">x</a></Box>\n`

    const on = reactAsChildToRender(source, consumer, { crossFile: true })
    expect(on.code).toBeNull()
  })

  it('resolves a barrel component and keeps the props call (solid)', () => {
    write('ui.ts', `export { Menu } from '@ark-ui/solid/menu'\n`)
    const consumer = write('app.tsx', 'x')
    const source = `import { Menu } from './ui'\nconst A = () => <Menu.Item asChild={(props) => <a {...props()} />} />\n`

    const off = solidAsChildToRender(source, consumer)
    expect(off.code).toBeNull()

    const on = solidAsChildToRender(source, consumer, { crossFile: true })
    expect(on.count).toBe(1)
    expect(on.code).toContain('render={(props) => <a {...props()} />}')
  })
})
