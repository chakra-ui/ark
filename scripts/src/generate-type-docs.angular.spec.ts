import { describe, expect, it } from 'bun:test'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { findUpSync } from 'find-up'
import { generateAngularTypeDoc, listAngularComponents } from './generate-type-docs.angular'

// biome-ignore lint/style/noNonNullAssertion: bun.lock is always present at repo root
const rootDir = dirname(findUpSync('bun.lock')!)

const committedAvatarPath = join(rootDir, 'website', 'src', 'content', 'types', 'angular', 'avatar.types.json')
const committedProgressPath = join(rootDir, 'website', 'src', 'content', 'types', 'angular', 'progress.types.json')
const committedTogglePath = join(rootDir, 'website', 'src', 'content', 'types', 'angular', 'toggle.types.json')
const committedDialogPath = join(rootDir, 'website', 'src', 'content', 'types', 'angular', 'dialog.types.json')
const committedMenuPath = join(rootDir, 'website', 'src', 'content', 'types', 'angular', 'menu.types.json')

const createAngularTypeDocFixture = () => {
  const fixtureRoot = mkdtempSync(join(tmpdir(), 'ng-ark-angular-type-doc-'))
  symlinkSync(join(rootDir, 'node_modules'), join(fixtureRoot, 'node_modules'), 'dir')
  const componentDir = join(fixtureRoot, 'packages', 'angular', 'src', 'alias-fixture')
  mkdirSync(componentDir, { recursive: true })
  writeFileSync(join(fixtureRoot, 'package.json'), '{}\n')
  writeFileSync(
    join(fixtureRoot, 'packages', 'angular', 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        target: 'ES2022',
        module: 'ESNext',
        moduleResolution: 'Bundler',
        experimentalDecorators: true,
        strict: true,
        skipLibCheck: true,
        types: [],
      },
      include: ['src/**/*.ts'],
    }),
  )
  writeFileSync(join(componentDir, 'public-api.ts'), "export { ArkAliasFixtureRoot } from './alias-fixture'\n")
  writeFileSync(
    join(componentDir, 'alias-fixture.ts'),
    `
      import { Directive, input, output, type InputSignal, type OutputEmitterRef } from '@angular/core'

      @Directive({ selector: '[arkAliasFixture]', standalone: true, exportAs: 'arkAliasFixture' })
      export class ArkAliasFixtureRoot {
        readonly internalRequired: InputSignal<string> = input.required<string>({ alias: 'requiredAlias' })
        readonly internalOutput: OutputEmitterRef<number> = output<number>({ alias: 'outputAlias' })
        readonly nullableBoolean: InputSignal<true | false | null> = input<true | false | null>(null)
      }
    `,
  )
  return fixtureRoot
}

const createAngularDiscoveryFixture = () => {
  const fixtureRoot = mkdtempSync(join(tmpdir(), 'ng-ark-angular-discovery-'))

  const legacyDir = join(fixtureRoot, 'packages', 'angular', 'legacy-fixture')
  const nestedDir = join(fixtureRoot, 'packages', 'angular', 'src', 'nested-fixture')
  const utilityDir = join(fixtureRoot, 'packages', 'angular', 'src', 'internal')

  mkdirSync(legacyDir, { recursive: true })
  mkdirSync(nestedDir, { recursive: true })
  mkdirSync(utilityDir, { recursive: true })

  writeFileSync(join(legacyDir, 'public-api.ts'), "export { ArkLegacyFixtureRoot } from './legacy-fixture-root'\n")
  writeFileSync(join(legacyDir, 'legacy-fixture-root.ts'), 'export class ArkLegacyFixtureRoot {}\n')
  writeFileSync(join(nestedDir, 'public-api.ts'), "export { ArkNestedFixtureRoot } from './nested-fixture-root'\n")
  writeFileSync(join(nestedDir, 'nested-fixture-root.ts'), 'export class ArkNestedFixtureRoot {}\n')
  writeFileSync(join(utilityDir, 'public-api.ts'), 'export const internal = true\n')

  return fixtureRoot
}

const createAngularCollisionFixture = () => {
  const fixtureRoot = mkdtempSync(join(tmpdir(), 'ng-ark-angular-collision-'))
  const legacyDir = join(fixtureRoot, 'packages', 'angular', 'collision-fixture')
  const nestedDir = join(fixtureRoot, 'packages', 'angular', 'src', 'collision-fixture')

  mkdirSync(legacyDir, { recursive: true })
  mkdirSync(nestedDir, { recursive: true })
  writeFileSync(join(legacyDir, 'public-api.ts'), 'export const legacy = true\n')
  writeFileSync(join(nestedDir, 'public-api.ts'), 'export const nested = true\n')

  return fixtureRoot
}

describe('Angular type-doc generator discovery', () => {
  it('merges legacy and src component layouts', async () => {
    const fixtureRoot = createAngularDiscoveryFixture()
    try {
      await expect(listAngularComponents(fixtureRoot)).resolves.toEqual(['legacy-fixture', 'nested-fixture'])
    } finally {
      rmSync(fixtureRoot, { recursive: true, force: true })
    }
  })

  it('throws when a component exists in both layouts', async () => {
    const fixtureRoot = createAngularCollisionFixture()
    try {
      await expect(generateAngularTypeDoc('collision-fixture', fixtureRoot)).rejects.toThrow(
        'exists in both packages/angular/collision-fixture/public-api.ts and packages/angular/src/collision-fixture/public-api.ts',
      )
    } finally {
      rmSync(fixtureRoot, { recursive: true, force: true })
    }
  })
})

describe('Angular type-doc generator aliases', () => {
  it('emits aliases from required inputs and outputs and normalizes boolean literal unions', async () => {
    const fixtureRoot = createAngularTypeDocFixture()
    try {
      const doc = await generateAngularTypeDoc('alias-fixture', fixtureRoot)
      expect(doc['Root'].props['requiredAlias']).toMatchObject({
        kind: 'required-input',
        isRequired: true,
        type: 'string',
      })
      expect(doc['Root'].props['internalRequired']).toBeUndefined()
      expect(doc['Root'].props['outputAlias']).toMatchObject({
        kind: 'output',
        isRequired: false,
        type: 'number',
      })
      expect(doc['Root'].props['internalOutput']).toBeUndefined()
      expect(doc['Root'].props['nullableBoolean'].type).toBe('boolean | null')
    } finally {
      rmSync(fixtureRoot, { recursive: true, force: true })
    }
  })
})

describe('Angular type-doc generator (Avatar)', () => {
  const doc = generateAngularTypeDoc('avatar', rootDir)

  it('reproduces the committed avatar.types.json byte-for-byte', async () => {
    const generated = `${JSON.stringify(await doc, null, 2)}\n`
    const committed = readFileSync(committedAvatarPath, 'utf-8')
    expect(generated).toBe(committed)
  })

  it('lists parts in source-derived order', async () => {
    expect(Object.keys(await doc)).toEqual(['Root', 'RootProvider', 'Image', 'Fallback'])
  })

  it('extracts Root.id as a plain input', async () => {
    const id = (await doc)['Root'].props['id']
    expect(id.kind).toBe('input')
    expect(id.isRequired).toBe(false)
    expect(id.type).toBe('string')
  })

  it('extracts Root.ids with the alias-resolved Partial type', async () => {
    const ids = (await doc)['Root'].props['ids']
    expect(ids.kind).toBe('input')
    expect(ids.isRequired).toBe(false)
    expect(ids.type).toBe('Partial<{ root: string; image: string; fallback: string }>')
  })

  it('extracts Root.statusChange as an output with the locally-aliased details type', async () => {
    const statusChange = (await doc)['Root'].props['statusChange']
    expect(statusChange.kind).toBe('output')
    expect(statusChange.isRequired).toBe(false)
    expect(statusChange.type).toBe('AvatarStatusChangeDetails')
  })

  it('extracts RootProvider.value as a required input', async () => {
    const value = (await doc)['RootProvider'].props['value']
    expect(value.kind).toBe('required-input')
    expect(value.isRequired).toBe(true)
    expect(value.type).toBe('UseAvatarReturn')
  })

  it('emits empty props for Image and Fallback', async () => {
    expect((await doc)['Image'].props).toEqual({})
    expect((await doc)['Fallback'].props).toEqual({})
  })
})

describe('Angular type-doc generator (Progress)', () => {
  const doc = generateAngularTypeDoc('progress', rootDir)

  it('reproduces the committed progress.types.json byte-for-byte', async () => {
    const generated = `${JSON.stringify(await doc, null, 2)}\n`
    const committed = readFileSync(committedProgressPath, 'utf-8')
    expect(generated).toBe(committed)
  })

  it('extracts Root.value as a model channel', async () => {
    const value = (await doc)['Root'].props['value']
    expect(value.kind).toBe('model')
    expect(value.isRequired).toBe(false)
  })

  it('does not expose a separate valueChange output on Root', async () => {
    const rootProps = (await doc)['Root'].props
    expect(rootProps['valueChange']).toBeUndefined()
    for (const [name, entry] of Object.entries(rootProps)) {
      if (entry.kind === 'output') {
        expect(name).not.toBe('valueChange')
      }
    }
  })

  it('extracts RootProvider.value as a required input typed as UseProgressReturn', async () => {
    const value = (await doc)['RootProvider'].props['value']
    expect(value.kind).toBe('required-input')
    expect(value.isRequired).toBe(true)
    expect(value.type).toBe('UseProgressReturn')
  })

  it('emits the Progress part directives in source-derived order', async () => {
    expect(Object.keys(await doc)).toEqual([
      'Root',
      'RootProvider',
      'Label',
      'Track',
      'Range',
      'ValueText',
      'View',
      'Circle',
      'CircleTrack',
      'CircleRange',
    ])
  })
})

describe('Angular type-doc generator (Toggle)', () => {
  const doc = generateAngularTypeDoc('toggle', rootDir)

  it('reproduces the committed toggle.types.json byte-for-byte', async () => {
    const generated = `${JSON.stringify(await doc, null, 2)}\n`
    const committed = readFileSync(committedTogglePath, 'utf-8')
    expect(generated).toBe(committed)
  })

  it('extracts Root.pressed as a model channel', async () => {
    const pressed = (await doc)['Root'].props['pressed']
    expect(pressed.kind).toBe('model')
    expect(pressed.isRequired).toBe(false)
  })

  it('extracts Root.defaultPressed as a plain input', async () => {
    const defaultPressed = (await doc)['Root'].props['defaultPressed']
    expect(defaultPressed.kind).toBe('input')
    expect(defaultPressed.isRequired).toBe(false)
  })

  it('extracts Root.disabled as a plain input', async () => {
    const disabled = (await doc)['Root'].props['disabled']
    expect(disabled.kind).toBe('input')
    expect(disabled.isRequired).toBe(false)
  })

  it('does not expose a separate pressedChange output on Root', async () => {
    const rootProps = (await doc)['Root'].props
    expect(rootProps['pressedChange']).toBeUndefined()
    for (const [name, entry] of Object.entries(rootProps)) {
      if (entry.kind === 'output') {
        expect(name).not.toBe('pressedChange')
      }
    }
  })
})

describe('Angular type-doc generator (Dialog)', () => {
  const doc = generateAngularTypeDoc('dialog', rootDir)

  it('reproduces the committed dialog.types.json byte-for-byte', async () => {
    const generated = `${JSON.stringify(await doc, null, 2)}\n`
    const committed = readFileSync(committedDialogPath, 'utf-8')
    expect(generated).toBe(committed)
  })

  it('extracts Root.open as a model channel', async () => {
    const open = (await doc)['Root'].props['open']
    expect(open.kind).toBe('model')
    expect(open.isRequired).toBe(false)
  })

  it('extracts Root.defaultOpen as a plain input', async () => {
    const defaultOpen = (await doc)['Root'].props['defaultOpen']
    expect(defaultOpen.kind).toBe('input')
    expect(defaultOpen.isRequired).toBe(false)
  })

  it('does not expose a separate openChange output on Root', async () => {
    const rootProps = (await doc)['Root'].props
    expect(rootProps['openChange']).toBeUndefined()
    for (const [name, entry] of Object.entries(rootProps)) {
      if (entry.kind === 'output') {
        expect(name).not.toBe('openChange')
      }
    }
  })
})

describe('Angular type-doc generator (Menu)', () => {
  const doc = generateAngularTypeDoc('menu', rootDir)

  it('reproduces the committed menu.types.json byte-for-byte', async () => {
    const generated = `${JSON.stringify(await doc, null, 2)}\n`
    const committed = readFileSync(committedMenuPath, 'utf-8')
    expect(generated).toBe(committed)
  })

  it('extracts Root.open as a model channel and defaultOpen as a plain input', async () => {
    const open = (await doc)['Root'].props['open']
    expect(open.kind).toBe('model')
    expect(open.isRequired).toBe(false)
    const defaultOpen = (await doc)['Root'].props['defaultOpen']
    expect(defaultOpen.kind).toBe('input')
    expect(defaultOpen.isRequired).toBe(false)
  })

  it('extracts Root.highlightedValue as a model channel and defaultHighlightedValue as a plain input', async () => {
    const highlighted = (await doc)['Root'].props['highlightedValue']
    expect(highlighted.kind).toBe('model')
    expect(highlighted.isRequired).toBe(false)
    const defaultHighlighted = (await doc)['Root'].props['defaultHighlightedValue']
    expect(defaultHighlighted.kind).toBe('input')
    expect(defaultHighlighted.isRequired).toBe(false)
  })

  it('extracts Root.triggerValue as a model channel and defaultTriggerValue as a plain input', async () => {
    const triggerValue = (await doc)['Root'].props['triggerValue']
    expect(triggerValue.kind).toBe('model')
    expect(triggerValue.isRequired).toBe(false)
    const defaultTriggerValue = (await doc)['Root'].props['defaultTriggerValue']
    expect(defaultTriggerValue.kind).toBe('input')
    expect(defaultTriggerValue.isRequired).toBe(false)
  })

  it('emits public aliases for aliased menu item inputs', async () => {
    const menuDoc = await doc
    expect(menuDoc['CheckboxItem'].props['disabled']).toBeDefined()
    expect(menuDoc['CheckboxItem'].props['disabledInput']).toBeUndefined()
    expect(menuDoc['RadioItem'].props['disabled']).toBeDefined()
    expect(menuDoc['RadioItem'].props['disabledInput']).toBeUndefined()
    expect(menuDoc['ItemGroup'].props['id']).toBeDefined()
    expect(menuDoc['ItemGroup'].props['idInput']).toBeUndefined()
    expect(menuDoc['RadioItemGroup'].props['id']).toBeDefined()
    expect(menuDoc['RadioItemGroup'].props['idInput']).toBeUndefined()
  })

  it('does not expose duplicate change outputs on Root', async () => {
    const rootProps = (await doc)['Root'].props
    expect(rootProps['openChange']).toBeUndefined()
    expect(rootProps['highlightedValueChange']).toBeUndefined()
    expect(rootProps['triggerValueChange']).toBeUndefined()
    for (const [name, entry] of Object.entries(rootProps)) {
      if (entry.kind === 'output') {
        expect(name).not.toBe('openChange')
        expect(name).not.toBe('highlightedValueChange')
        expect(name).not.toBe('triggerValueChange')
      }
    }
  })
})
