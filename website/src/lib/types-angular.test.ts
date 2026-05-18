import { describe, expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { types } from '../../.velite'

const websiteDir = join(import.meta.dir, '..', '..')

describe('velite types collection for Angular', () => {
  test('exposes the Avatar component', () => {
    const components = types.filter((entry) => entry.framework === 'angular').map((entry) => entry.component)
    expect(components).toContain('avatar')
  })

  test('matches the committed Angular Avatar JSON shape', () => {
    const avatar = types.find((entry) => entry.framework === 'angular' && entry.component === 'avatar')
    if (!avatar) throw new Error('Angular Avatar entry missing from velite types collection')

    const committed = JSON.parse(
      readFileSync(join(websiteDir, 'src', 'content', 'types', 'angular', 'avatar.types.json'), 'utf-8'),
    ) as Record<string, unknown>

    expect(Object.keys(avatar.parts).sort()).toEqual(Object.keys(committed).sort())
  })
})
