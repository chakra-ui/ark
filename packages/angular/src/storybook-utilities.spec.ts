import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const previewSource = readFileSync(join(packageRoot, '.storybook/preview.ts'), 'utf-8')

describe('Angular Storybook utility navigation', () => {
  it('orders utility stories before providers and components', () => {
    expect(previewSource).toMatch(/order:\s*\[\s*['"]Utilities['"],\s*['"]Providers['"],\s*['"]Components['"],?\s*\]/)
  })

  it('sorts stories alphabetically within sidebar groups', () => {
    expect(previewSource).toMatch(/method:\s*['"]alphabetical['"]/)
  })
})
