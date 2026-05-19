import { describe, expect, it } from 'bun:test'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { buildAngularRegistry } from './generate-example-registry'

const batch6Examples = {
  'client-only': ['basic', 'with-fallback'],
  'download-trigger': ['basic', 'svg', 'with-promise'],
  'focus-trap': ['autofocus', 'basic', 'initial-focus'],
  format: [
    'byte-basic',
    'byte-sizes',
    'byte-with-locale',
    'byte-with-unit',
    'byte-with-unit-display',
    'byte-with-unit-system',
    'number-basic',
    'number-with-compact',
    'number-with-currency',
    'number-with-locale',
    'number-with-percentage',
    'number-with-unit',
    'relative-time-basic',
    'relative-time-short',
    'time-basic',
    'time-with-am-pm-labels',
    'time-with-date',
    'time-with-locale',
    'time-with-seconds',
  ],
  frame: ['basic', 'inherit-styles', 'script', 'src-doc'],
  highlight: ['basic', 'dynamic-query', 'exact-match', 'ignore-case', 'match-all', 'multiple', 'repeating-text'],
  presence: ['basic', 'lazy-mount', 'lazy-mount-and-unmount-on-exit', 'skip-animation-on-mount', 'unmount-on-exit'],
  swap: ['fade', 'flip', 'rotate', 'scale'],
} as const

const toPascalCase = (value: string) =>
  value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')

const createFixture = (options: { includeBatch6?: boolean } = {}) => {
  const fixtureRoot = mkdtempSync(join(tmpdir(), 'ng-ark-angular-example-registry-'))
  const examplesRoot = join(fixtureRoot, 'packages', 'angular', 'src')

  mkdirSync(join(examplesRoot, 'date-picker', 'examples'), { recursive: true })
  writeFileSync(
    join(examplesRoot, 'date-picker', 'examples', 'range-selection.ts'),
    'export class DatePickerRangeSelectionExample {}\n',
  )
  writeFileSync(
    join(examplesRoot, 'date-picker', 'examples', '_template.ts'),
    'export class DatePickerTemplateExample {}\n',
  )
  writeFileSync(
    join(examplesRoot, 'date-picker', 'examples', 'range-selection.spec.ts'),
    'export class DatePickerRangeSelectionSpecExample {}\n',
  )

  mkdirSync(join(examplesRoot, 'color-picker', 'examples', 'swatches'), { recursive: true })
  writeFileSync(
    join(examplesRoot, 'color-picker', 'examples', 'swatches', 'basic.ts'),
    'export class ColorPickerSwatchesBasicExample {}\n',
  )

  if (options.includeBatch6) {
    for (const [component, examples] of Object.entries(batch6Examples)) {
      mkdirSync(join(examplesRoot, component, 'examples'), { recursive: true })
      for (const example of examples) {
        writeFileSync(
          join(examplesRoot, component, 'examples', `${example}.ts`),
          `export class ${toPascalCase(component)}${toPascalCase(example)}Example {}\n`,
        )
      }
    }
  }

  return fixtureRoot
}

describe('Angular example registry generator', () => {
  it('builds Batch 4 example keys and import paths', async () => {
    const fixtureRoot = createFixture()
    try {
      const registry = await buildAngularRegistry(fixtureRoot)

      expect(registry.imports).toEqual([
        "import * as ColorPickerSwatches_Basic from '../../../packages/angular/src/color-picker/examples/swatches/basic'",
        "import * as DatePicker_RangeSelection from '../../../packages/angular/src/date-picker/examples/range-selection'",
      ])
      expect(registry.entries).toEqual([
        "  'color-picker/swatches/basic': { module: ColorPickerSwatches_Basic, exportName: 'ColorPickerSwatchesBasicExample' }",
        "  'date-picker/range-selection': { module: DatePicker_RangeSelection, exportName: 'DatePickerRangeSelectionExample' }",
      ])
      expect(registry.entries.some((entry) => entry.includes('_template'))).toBe(false)
      expect(registry.entries.some((entry) => entry.includes('spec'))).toBe(false)
    } finally {
      rmSync(fixtureRoot, { recursive: true, force: true })
    }
  })

  it('registers src-level Batch 6 utility example keys', async () => {
    const fixtureRoot = createFixture({ includeBatch6: true })
    try {
      const registry = await buildAngularRegistry(fixtureRoot)

      for (const [component, examples] of Object.entries(batch6Examples)) {
        for (const example of examples) {
          expect(registry.entries).toContain(
            `  '${component}/${example}': { module: ${toPascalCase(component)}_${toPascalCase(example)}, exportName: '${toPascalCase(component)}${toPascalCase(example)}Example' }`,
          )
        }
      }
    } finally {
      rmSync(fixtureRoot, { recursive: true, force: true })
    }
  })
})
