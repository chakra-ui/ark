import { describe, expect, it } from 'bun:test'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { buildAngularRegistry } from './generate-example-registry'

const createFixture = () => {
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

  mkdirSync(join(examplesRoot, 'color-picker', 'examples', 'swatches'), { recursive: true })
  writeFileSync(
    join(examplesRoot, 'color-picker', 'examples', 'swatches', 'basic.ts'),
    'export class ColorPickerSwatchesBasicExample {}\n',
  )

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
        "  'color-picker/swatches/basic': ColorPickerSwatches_Basic",
        "  'date-picker/range-selection': DatePicker_RangeSelection",
      ])
    } finally {
      rmSync(fixtureRoot, { recursive: true, force: true })
    }
  })
})
