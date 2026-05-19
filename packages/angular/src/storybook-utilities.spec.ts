import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const sourceRoot = join(packageRoot, 'src')
const previewSource = readFileSync(join(packageRoot, '.storybook/preview.ts'), 'utf-8')
const storySortSource = previewSource.match(/storySort:\s*\{[\s\S]*?\n\s*\}/)?.[0] ?? ''

const requiredUtilityStories = [
  ['providers/environment/environment.stories.ts', 'Utilities / Environment'],
  ['providers/interaction/interaction.stories.ts', 'Utilities / Interaction'],
  ['providers/locale/locale.stories.ts', 'Utilities / Locale'],
  ['collection/async-list.stories.ts', 'Utilities / Async List'],
  ['collection/list-selection.stories.ts', 'Utilities / List Selection'],
] as const

describe('Angular Storybook utility navigation', () => {
  it('orders utility stories before providers and components', () => {
    expect(storySortSource).toMatch(/order:\s*\[\s*['"]Utilities['"],\s*['"]Providers['"],\s*['"]Components['"],?\s*\]/)
  })

  it('sorts stories alphabetically within sidebar groups', () => {
    expect(storySortSource).toMatch(/method:\s*['"]alphabetical['"]/)
  })

  it.each(requiredUtilityStories)('defines the %s story title', (storyPath, title) => {
    const storySource = readFileSync(join(sourceRoot, storyPath), 'utf-8')

    expect(storySource).toContain(`title: '${title}'`)
  })
})
