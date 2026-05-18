import { afterAll, beforeAll, describe, expect, test } from 'bun:test'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { getAllComponents } from './example-utils'
import { getFrameworkExampleDir, getFrameworkExampleDisplayPath } from './framework-example-paths'

const websiteDir = join(import.meta.dir, '..', '..')
const originalCwd = process.cwd()

describe('framework-example-paths', () => {
  beforeAll(() => {
    process.chdir(websiteDir)
  })

  afterAll(() => {
    process.chdir(originalCwd)
  })

  describe('angular', () => {
    test('resolves progress-linear to the linear examples subdir', () => {
      expect(getFrameworkExampleDir('angular', 'progress-linear')).toBe(
        join(websiteDir, '..', 'packages', 'angular', 'progress', 'examples', 'linear'),
      )
      expect(getFrameworkExampleDisplayPath('angular', 'progress-linear')).toBe(
        'packages/angular/progress/examples/linear',
      )
    })

    test('resolves progress-circular to the circular examples subdir', () => {
      expect(getFrameworkExampleDir('angular', 'progress-circular')).toBe(
        join(websiteDir, '..', 'packages', 'angular', 'progress', 'examples', 'circular'),
      )
      expect(getFrameworkExampleDisplayPath('angular', 'progress-circular')).toBe(
        'packages/angular/progress/examples/circular',
      )
    })

    test('resolves a non-variant component slug to its examples dir', () => {
      expect(getFrameworkExampleDir('angular', 'progress')).toBe(
        join(websiteDir, '..', 'packages', 'angular', 'progress', 'examples'),
      )
      expect(getFrameworkExampleDisplayPath('angular', 'progress')).toBe('packages/angular/progress/examples')
    })

    test('resolves every discovered Angular component to an existing examples dir', async () => {
      const components = await getAllComponents('angular')
      for (const component of components) {
        expect(existsSync(getFrameworkExampleDir('angular', component))).toBe(true)
      }
    })

    test('throws an ENOENT-compatible error for unknown Angular examples dirs', () => {
      expect(() => getFrameworkExampleDir('angular', 'definitely-missing')).toThrow(
        expect.objectContaining({ code: 'ENOENT' }),
      )
    })
  })

  describe('react', () => {
    test('resolves progress-linear to the linear examples subdir', () => {
      expect(getFrameworkExampleDir('react', 'progress-linear')).toBe(
        join(websiteDir, '..', 'packages', 'react', 'src', 'components', 'progress', 'examples', 'linear'),
      )
      expect(getFrameworkExampleDisplayPath('react', 'progress-linear')).toBe(
        'packages/react/src/components/progress/examples/linear',
      )
    })

    test('resolves progress-circular to the circular examples subdir', () => {
      expect(getFrameworkExampleDir('react', 'progress-circular')).toBe(
        join(websiteDir, '..', 'packages', 'react', 'src', 'components', 'progress', 'examples', 'circular'),
      )
      expect(getFrameworkExampleDisplayPath('react', 'progress-circular')).toBe(
        'packages/react/src/components/progress/examples/circular',
      )
    })
  })
})
