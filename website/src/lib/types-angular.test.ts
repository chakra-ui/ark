import { describe, expect, test } from 'bun:test'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const websiteDir = join(import.meta.dir, '..', '..')
const veliteEntryPath = join(websiteDir, '.velite', 'index.js')
const testWithVelite = existsSync(veliteEntryPath) ? test : test.skip

async function getTypesCollection() {
  const { types } = await import('../../.velite')
  return types
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

    const committed = JSON.parse(
      readFileSync(join(websiteDir, 'src', 'content', 'types', 'angular', 'avatar.types.json'), 'utf-8'),
    ) as Record<string, unknown>

    expect(avatar!.parts).toEqual(committed)
  })
})
