import { describe, expect, it } from 'bun:test'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { findUpSync } from 'find-up'
import { generateAngularTypeDoc } from './generate-type-docs.angular'

// biome-ignore lint/style/noNonNullAssertion: bun.lock is always present at repo root
const rootDir = dirname(findUpSync('bun.lock')!)

const committedPath = join(rootDir, 'website', 'src', 'content', 'types', 'angular', 'avatar.types.json')

describe('Angular type-doc generator (Avatar)', () => {
  const doc = generateAngularTypeDoc('avatar', rootDir)

  it('reproduces the committed avatar.types.json byte-for-byte', async () => {
    const generated = `${JSON.stringify(await doc, null, 2)}\n`
    const committed = readFileSync(committedPath, 'utf-8')
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
