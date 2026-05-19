import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { entryPoints, scanEntryPoint } from './check-forms-isolation'

const createReporter = () => {
  const errors: string[] = []
  return {
    errors,
    reporter: {
      error: (message: string) => errors.push(message),
      warn: () => {},
    },
  }
}

describe('check-forms-isolation', () => {
  let workDir: string

  beforeEach(() => {
    workDir = mkdtempSync(join(tmpdir(), 'forms-isolation-'))
  })

  afterEach(() => {
    rmSync(workDir, { recursive: true, force: true })
  })

  it('reports a violation when a forms-free entrypoint imports @angular/forms', () => {
    const file = join(workDir, 'public-api.ts')
    writeFileSync(file, "import { FormsModule } from '@angular/forms'\nexport { FormsModule }\n", 'utf-8')

    const { reporter, errors } = createReporter()
    const failed = scanEntryPoint({ name: '@ark-ui/angular/synthetic-forms-free', file, formsAllowed: false }, reporter)

    expect(failed).toBe(true)
    expect(errors).toHaveLength(1)
    expect(errors[0]).toContain('@ark-ui/angular/synthetic-forms-free')
    expect(errors[0]).toContain('@angular/forms')
  })

  it('reports transitive forms imports through relative re-exports', () => {
    const file = join(workDir, 'public-api.ts')
    const inner = join(workDir, 'inner.ts')
    writeFileSync(file, "export * from './inner'\n", 'utf-8')
    writeFileSync(inner, "import { FormsModule } from '@angular/forms'\nexport { FormsModule }\n", 'utf-8')

    const { reporter, errors } = createReporter()
    const failed = scanEntryPoint({ name: '@ark-ui/angular/synthetic-forms-free', file, formsAllowed: false }, reporter)

    expect(failed).toBe(true)
    expect(errors).toHaveLength(1)
    expect(errors[0]).toContain('public-api.ts')
    expect(errors[0]).toContain('inner.ts')
  })

  it('allows form-bearing entrypoints to import @angular/forms', () => {
    const file = join(workDir, 'public-api.ts')
    writeFileSync(file, "import { FormsModule } from '@angular/forms'\nexport { FormsModule }\n", 'utf-8')

    const { reporter, errors } = createReporter()
    const failed = scanEntryPoint({ name: '@ark-ui/angular/editable', file, formsAllowed: true }, reporter)

    expect(failed).toBe(false)
    expect(errors).toEqual([])
  })

  it('allows transitive forms imports for form-bearing entrypoints', () => {
    const file = join(workDir, 'public-api.ts')
    const inner = join(workDir, 'inner.ts')
    writeFileSync(file, "export * from './inner'\n", 'utf-8')
    writeFileSync(inner, "import { FormsModule } from '@angular/forms'\nexport { FormsModule }\n", 'utf-8')

    const { reporter, errors } = createReporter()
    const failed = scanEntryPoint({ name: '@ark-ui/angular/editable', file, formsAllowed: true }, reporter)

    expect(failed).toBe(false)
    expect(errors).toEqual([])
  })

  it('reports form-bearing entrypoints that do not import @angular/forms transitively', () => {
    const file = join(workDir, 'public-api.ts')
    const inner = join(workDir, 'inner.ts')
    writeFileSync(file, "export * from './inner'\n", 'utf-8')
    writeFileSync(inner, 'export const ok = true\n', 'utf-8')

    const { reporter, errors } = createReporter()
    const failed = scanEntryPoint({ name: '@ark-ui/angular/date-input', file, formsAllowed: true }, reporter)

    expect(failed).toBe(true)
    expect(errors).toEqual([
      'forms isolation: @ark-ui/angular/date-input allows forms but its source entry does not import @angular/forms transitively.',
    ])
  })

  it('does not count output-only forms imports as source CVA coverage', () => {
    const file = join(workDir, 'public-api.ts')
    const output = join(workDir, 'output.mjs')
    writeFileSync(file, 'export const ok = true\n', 'utf-8')
    writeFileSync(output, "import { FormsModule } from '@angular/forms'\nexport { FormsModule }\n", 'utf-8')

    const { reporter, errors } = createReporter()
    const failed = scanEntryPoint(
      { name: '@ark-ui/angular/date-picker', file, formsAllowed: true, outputs: [output] },
      reporter,
    )

    expect(failed).toBe(true)
    expect(errors).toEqual([
      'forms isolation: @ark-ui/angular/date-picker allows forms but its source entry does not import @angular/forms transitively.',
    ])
  })

  it('reports missing source entries without throwing', () => {
    const file = join(workDir, 'missing.ts')

    const { reporter, errors } = createReporter()
    const failed = scanEntryPoint({ name: '@ark-ui/angular/missing', file, formsAllowed: false }, reporter)

    expect(failed).toBe(true)
    expect(errors).toHaveLength(1)
    expect(errors[0]).toContain('forms isolation: source entry not found for @ark-ui/angular/missing')
    expect(errors[0]).toContain('missing.ts')
  })

  it('reports forms imports found only in declared outputs', () => {
    const file = join(workDir, 'public-api.ts')
    const output = join(workDir, 'output.mjs')
    writeFileSync(file, 'export const ok = true\n', 'utf-8')
    writeFileSync(output, "import { FormsModule } from '@angular/forms'\nexport { FormsModule }\n", 'utf-8')

    const { reporter, errors } = createReporter()
    const failed = scanEntryPoint(
      { name: '@ark-ui/angular/synthetic-forms-free', file, formsAllowed: false, outputs: [output] },
      reporter,
    )

    expect(failed).toBe(true)
    expect(errors).toHaveLength(1)
    expect(errors[0]).toContain('output.mjs')
    expect(errors[0]).toContain('@angular/forms')
  })

  it('reports missing declared outputs', () => {
    const file = join(workDir, 'public-api.ts')
    const output = join(workDir, 'missing.mjs')
    writeFileSync(file, 'export const ok = true\n', 'utf-8')

    const { reporter, errors } = createReporter()
    const failed = scanEntryPoint(
      { name: '@ark-ui/angular/synthetic-forms-free', file, formsAllowed: false, outputs: [output] },
      reporter,
    )

    expect(failed).toBe(true)
    expect(errors).toEqual([
      `forms isolation: build output not found for @ark-ui/angular/synthetic-forms-free (${output})`,
    ])
  })

  it('classifies form-bearing entrypoints', () => {
    const entriesByName = new Map(entryPoints.map((entryPoint) => [entryPoint.name, entryPoint]))

    for (const name of [
      '@ark-ui/angular/editable',
      '@ark-ui/angular/number-input',
      '@ark-ui/angular/pin-input',
      '@ark-ui/angular/password-input',
      '@ark-ui/angular/tags-input',
      '@ark-ui/angular/select',
      '@ark-ui/angular/combobox',
      '@ark-ui/angular/date-input',
      '@ark-ui/angular/date-picker',
      '@ark-ui/angular/color-picker',
    ]) {
      expect(entriesByName.get(name)?.formsAllowed).toBe(true)
    }
  })

  it('classifies forms-free entrypoints', () => {
    const entriesByName = new Map(entryPoints.map((entryPoint) => [entryPoint.name, entryPoint]))

    for (const name of [
      '@ark-ui/angular/field',
      '@ark-ui/angular/fieldset',
      '@ark-ui/angular/clipboard',
      '@ark-ui/angular/file-upload',
      '@ark-ui/angular/listbox',
      '@ark-ui/angular/qr-code',
      '@ark-ui/angular/signature-pad',
      '@ark-ui/angular/image-cropper',
      '@ark-ui/angular/json-tree-view',
      '@ark-ui/angular/tree-view',
    ]) {
      expect(entriesByName.get(name)?.formsAllowed).toBe(false)
    }
  })
})
