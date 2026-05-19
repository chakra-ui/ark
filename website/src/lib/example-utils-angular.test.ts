import { afterAll, beforeAll, describe, expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { batch6Examples } from '../../../scripts/src/batch-6-example-fixtures'
import { getAllComponents, getComponentExamples, readExampleFile } from './example-utils'

const websiteDir = join(import.meta.dir, '..', '..')
const originalCwd = process.cwd()

describe('example-utils for Angular', () => {
  beforeAll(() => {
    process.chdir(websiteDir)
  })

  afterAll(() => {
    process.chdir(originalCwd)
  })

  test('discovers Angular components with examples', async () => {
    const components = await getAllComponents('angular')
    expect(components).toContain('avatar')
  })

  test('lists Angular Avatar examples by id', async () => {
    const ids = await getComponentExamples('angular', 'avatar')
    expect(ids.length).toBeGreaterThan(0)
    expect(ids).toContain('basic')
  })

  test('reads an Angular Avatar example source from disk', async () => {
    const content = await readExampleFile('angular', 'avatar', 'basic')
    const expected = readFileSync(
      join(websiteDir, '..', 'packages', 'angular', 'avatar', 'examples', 'basic.ts'),
      'utf-8',
    )
    expect(content).toBe(expected)
  })

  test('returns empty list for an Angular component that does not exist', async () => {
    const ids = await getComponentExamples('angular', 'does-not-exist')
    expect(ids).toEqual([])
  })

  test('discovers src-level Batch 6 utility examples in the generated Angular registry', async () => {
    const registry = readFileSync(join(websiteDir, 'src', 'lib', 'angular-example-registry.ts'), 'utf-8')

    for (const [component, expectedIds] of Object.entries(batch6Examples)) {
      const ids = await getComponentExamples('angular', component)

      expect(ids.slice().sort()).toEqual(expectedIds.slice().sort())
      for (const id of expectedIds) {
        expect(registry).toContain(`'${component}/${id}':`)
      }
    }
  })

  test('keeps non-Angular registry keys unchanged', () => {
    const registry = readFileSync(join(websiteDir, 'src', 'lib', 'example-registry.ts'), 'utf-8')

    expect(registry).toContain("'avatar/basic': Avatar_Basic")
    expect(registry).toContain("'progress/circular/basic': ProgressCircular_Basic")
  })
})
