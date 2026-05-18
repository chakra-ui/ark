import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { formBearingEntryPoints, scanEntryPoint } from './check-forms-isolation'

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
    const failed = scanEntryPoint({ name: '@ark-ui/angular/synthetic-forms-free', file }, reporter)

    expect(failed).toBe(true)
    expect(errors).toHaveLength(1)
    expect(errors[0]).toContain('@ark-ui/angular/synthetic-forms-free')
    expect(errors[0]).toContain('@angular/forms')
  })

  it('allows form-bearing entrypoints to import @angular/forms', () => {
    const file = join(workDir, 'public-api.ts')
    writeFileSync(file, "import { FormsModule } from '@angular/forms'\nexport { FormsModule }\n", 'utf-8')

    const { reporter, errors } = createReporter()
    const failed = scanEntryPoint({ name: '@ark-ui/angular/editable', file }, reporter)

    expect(failed).toBe(false)
    expect(errors).toEqual([])
  })

  it('classifies Batch 3 form-bearing entrypoints', () => {
    for (const name of [
      '@ark-ui/angular/editable',
      '@ark-ui/angular/number-input',
      '@ark-ui/angular/pin-input',
      '@ark-ui/angular/password-input',
      '@ark-ui/angular/tags-input',
      '@ark-ui/angular/select',
      '@ark-ui/angular/combobox',
    ]) {
      expect(formBearingEntryPoints.has(name)).toBe(true)
    }
  })

  it('classifies Batch 3 forms-free entrypoints', () => {
    for (const name of [
      '@ark-ui/angular/field',
      '@ark-ui/angular/fieldset',
      '@ark-ui/angular/clipboard',
      '@ark-ui/angular/file-upload',
      '@ark-ui/angular/listbox',
    ]) {
      expect(formBearingEntryPoints.has(name)).toBe(false)
    }
  })
})
