import { afterAll, beforeAll, describe, expect, test } from 'bun:test'
import { join } from 'node:path'
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
