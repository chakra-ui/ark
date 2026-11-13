import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { reactAsChildToRender } from '../src/transforms/as-child-to-render/react.ts'
import { solidAsChildToRender } from '../src/transforms/as-child-to-render/solid.ts'
import { renameRun } from '../src/transforms/rename-props/configs.ts'

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

  it('resolves a namespace re-export whose module wraps a differently named component (react)', () => {
    write(
      'drawer.tsx',
      `import { Dialog } from '@ark-ui/react/dialog'\nexport const Trigger = Dialog.Trigger\nexport const CloseTrigger = Dialog.CloseTrigger\n`,
    )
    write('ui.ts', `export * as Drawer from './drawer'\n`)
    const consumer = write('app.tsx', 'x')
    const source = `import { Drawer } from './ui'\nconst A = () => <Drawer.Trigger asChild><button>open</button></Drawer.Trigger>\n`

    const on = reactAsChildToRender(source, consumer, { crossFile: true })
    expect(on.count).toBe(1)
    expect(on.code).toContain('<Drawer.Trigger render={<button>open</button>} />')
  })

  it('resolves a namespace import of a local module that wraps ark (react)', () => {
    write('checkbox.tsx', `import { Checkbox } from '@ark-ui/react/checkbox'\nexport const Label = Checkbox.Label\n`)
    const consumer = write('app.tsx', 'x')
    const source = `import * as StyledCheckbox from './checkbox'\nconst A = () => <StyledCheckbox.Label asChild><span>x</span></StyledCheckbox.Label>\n`

    const on = reactAsChildToRender(source, consumer, { crossFile: true })
    expect(on.count).toBe(1)
    expect(on.code).toContain('<StyledCheckbox.Label render={<span>x</span>} />')
  })

  it('leaves a namespace re-export of a non-ark module alone (react)', () => {
    write('tooltip.tsx', `import { Tooltip } from '@radix-ui/react-tooltip'\nexport const Trigger = Tooltip.Trigger\n`)
    write('ui.ts', `export * as Tip from './tooltip'\n`)
    const consumer = write('app.tsx', 'x')
    const source = `import { Tip } from './ui'\nconst A = () => <Tip.Trigger asChild><a href="#">x</a></Tip.Trigger>\n`

    const on = reactAsChildToRender(source, consumer, { crossFile: true })
    expect(on.code).toBeNull()
  })

  it('renames props on an aliased component imported through a barrel (react)', () => {
    write('pin-input.tsx', `import { PinInput } from '@ark-ui/react/pin-input'\nexport const Root = PinInput.Root\n`)
    write('ui.ts', `export * as PinInput from './pin-input'\n`)
    const consumer = write('app.tsx', 'x')
    const source = `import { PinInput as StyledPinInput } from './ui'\nconst A = () => <StyledPinInput.Root length={4} />\n`

    const on = renameRun('pin-input-count')(source, consumer, { crossFile: true })
    expect(on.count).toBe(1)
    expect(on.code).toContain('<StyledPinInput.Root count={4} />')
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

  it('resolves a default-exported wrapper across files (react)', () => {
    write(
      'prim.tsx',
      `import { ark } from '@ark-ui/react/factory'\nimport { styled } from 'styled-system/jsx'\nexport default styled(ark.button, {})\n`,
    )
    const consumer = write('app.tsx', 'x')
    const source = `import Button from './prim'\nconst A = () => <Button asChild><a href="#">x</a></Button>\n`

    const off = reactAsChildToRender(source, consumer)
    expect(off.code).toBeNull()

    const on = reactAsChildToRender(source, consumer, { crossFile: true })
    expect(on.count).toBe(1)
    expect(on.code).toContain('<Button render={<a href="#">x</a>} />')
  })

  it('leaves a helper that only takes ark as a later argument alone (react)', () => {
    write(
      'prim.tsx',
      `import { ark } from '@ark-ui/react/factory'\nconst wrap = (_config: unknown, _base: unknown) => (props: any) => <div {...props} />\nexport const Box = wrap({}, ark.button)\n`,
    )
    const consumer = write('app.tsx', 'x')
    const source = `import { Box } from './prim'\nconst A = () => <Box asChild><a href="#">x</a></Box>\n`

    const on = reactAsChildToRender(source, consumer, { crossFile: true })
    expect(on.code).toBeNull()
  })

  it('leaves a wrapper that does not bottom out at ark alone (react)', () => {
    write('prim.tsx', `import { styled } from 'styled-system/jsx'\nexport const Box = styled('div', {})\n`)
    const consumer = write('app.tsx', 'x')
    const source = `import { Box } from './prim'\nconst A = () => <Box asChild><a href="#">x</a></Box>\n`

    const on = reactAsChildToRender(source, consumer, { crossFile: true })
    expect(on.code).toBeNull()
  })

  it('resolves a namespace re-export whose module wraps a differently named component (solid)', () => {
    write('drawer.tsx', `import { Dialog } from '@ark-ui/solid/dialog'\nexport const Trigger = Dialog.Trigger\n`)
    write('ui.ts', `export * as Drawer from './drawer'\n`)
    const consumer = write('app.tsx', 'x')
    const source = `import { Drawer } from './ui'\nconst A = () => <Drawer.Trigger asChild={(props) => <button {...props()} />} />\n`

    const on = solidAsChildToRender(source, consumer, { crossFile: true })
    expect(on.count).toBe(1)
    expect(on.code).toContain('render={(props) => <button {...props()} />}')
  })

  it('resolves a namespace import of a local module that wraps ark (solid)', () => {
    write('checkbox.tsx', `import { Checkbox } from '@ark-ui/solid/checkbox'\nexport const Label = Checkbox.Label\n`)
    const consumer = write('app.tsx', 'x')
    const source = `import * as StyledCheckbox from './checkbox'\nconst A = () => <StyledCheckbox.Label asChild={(props) => <span {...props()} />} />\n`

    const on = solidAsChildToRender(source, consumer, { crossFile: true })
    expect(on.count).toBe(1)
    expect(on.code).toContain('render={(props) => <span {...props()} />}')
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
