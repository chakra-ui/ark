import { describe, expect, test } from 'bun:test'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { getAllComponents, getComponentExamples, readExampleFile } from './example-utils'

const websiteDir = join(import.meta.dir, '..', '..')
process.chdir(websiteDir)

describe('example-utils for Angular', () => {
  test('discovers Angular components with examples', async () => {
    const components = await getAllComponents('angular')
    expect(components).toContain('avatar')
  })

  test('lists Angular Avatar examples by id', async () => {
    const ids = await getComponentExamples('angular', 'avatar')
    expect(ids).toEqual(['basic', 'context', 'events', 'root-provider'])
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
})
