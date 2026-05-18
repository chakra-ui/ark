import { describe, expect, it } from 'bun:test'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { findUpSync } from 'find-up'
import { generateAngularTypeDoc } from './generate-type-docs.angular'

// biome-ignore lint/style/noNonNullAssertion: bun.lock is always present at repo root
const rootDir = dirname(findUpSync('bun.lock')!)

const committedAvatarPath = join(rootDir, 'website', 'src', 'content', 'types', 'angular', 'avatar.types.json')
const committedProgressPath = join(rootDir, 'website', 'src', 'content', 'types', 'angular', 'progress.types.json')
const committedTogglePath = join(rootDir, 'website', 'src', 'content', 'types', 'angular', 'toggle.types.json')

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
