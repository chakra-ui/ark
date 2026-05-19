import { describe, expect, test } from 'bun:test'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const websiteDir = join(import.meta.dir, '..', '..')
const veliteEntryPath = join(websiteDir, '.velite', 'index.js')
const testWithVelite = existsSync(veliteEntryPath) ? test : test.skip

type TypeEntry = {
  type: string
  isRequired: boolean
  kind: 'input' | 'required-input' | 'model' | 'output'
}

type TypeDoc = Record<string, { props: Record<string, TypeEntry> }>

async function getTypesCollection() {
  const { types } = await import('../../.velite')
  return types
}

function readAngularTypes(component: string): TypeDoc {
  return JSON.parse(
    readFileSync(join(websiteDir, 'src', 'content', 'types', 'angular', `${component}.types.json`), 'utf-8'),
  ) as TypeDoc
}

function findProp(types: TypeDoc, name: string): TypeEntry | undefined {
  for (const part of Object.values(types)) {
    const prop = part.props[name]
    if (prop) return prop
  }
  return undefined
}

describe('velite types collection for Angular', () => {
  testWithVelite('exposes the Avatar component from generated Velite content', async () => {
    const types = await getTypesCollection()
    const components = types.filter((entry) => entry.framework === 'angular').map((entry) => entry.component)
    expect(components).toContain('avatar')
  })

  testWithVelite('matches the committed Angular Avatar JSON shape', async () => {
    const types = await getTypesCollection()
    const avatar = types.find((entry) => entry.framework === 'angular' && entry.component === 'avatar')
    expect(avatar).toBeDefined()
    if (!avatar) return

    const committed = JSON.parse(
      readFileSync(join(websiteDir, 'src', 'content', 'types', 'angular', 'avatar.types.json'), 'utf-8'),
    ) as Record<string, unknown>

    expect(avatar.parts).toEqual(committed)
  })

  test('commits representative Batch 6 utility type entries', () => {
    expect(findProp(readAngularTypes('presence'), 'present')).toMatchObject({
      kind: 'input',
      isRequired: false,
      type: 'boolean',
    })
    expect(findProp(readAngularTypes('presence'), 'exitComplete')).toMatchObject({
      kind: 'output',
      isRequired: false,
      type: 'void',
    })
    expect(findProp(readAngularTypes('download-trigger'), 'data')).toMatchObject({
      kind: 'input',
      isRequired: false,
    })
    expect(findProp(readAngularTypes('swap'), 'swap')).toMatchObject({
      kind: 'input',
      isRequired: false,
      type: 'boolean',
    })
  })
})
