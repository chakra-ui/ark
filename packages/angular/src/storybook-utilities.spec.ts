import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const previewSource = readFileSync(join(packageRoot, '.storybook/preview.ts'), 'utf-8')

const requiredUtilityStories = [
  ['src/providers/environment/environment.stories.ts', 'Utilities / Environment'],
  ['src/providers/interaction/interaction.stories.ts', 'Utilities / Interaction'],
  ['src/providers/locale/locale.stories.ts', 'Utilities / Locale'],
  ['src/collection/async-list.stories.ts', 'Utilities / Async List'],
  ['src/collection/list-selection.stories.ts', 'Utilities / List Selection'],
] as const

describe('Angular Storybook utility navigation', () => {
  it('orders utility stories before providers and components', () => {
    expect(previewSource).toMatch(/order:\s*\[\s*['"]Utilities['"],\s*['"]Providers['"],\s*['"]Components['"],?\s*\]/)
  })

  it('sorts stories alphabetically within sidebar groups', () => {
    expect(previewSource).toMatch(/method:\s*['"]alphabetical['"]/)
  })

  it.each(requiredUtilityStories)('defines the %s story title', (storyPath, title) => {
    const storySource = readFileSync(join(packageRoot, storyPath), 'utf-8')

    expect(storySource).toContain(`title: '${title}'`)
  })
})
