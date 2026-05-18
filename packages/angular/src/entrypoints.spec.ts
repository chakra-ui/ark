import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const packageRoot = dirname(fileURLToPath(import.meta.url)).replace(/\/src$/, '')
const pkg = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf-8')) as {
  exports: Record<string, { source?: string; types?: string; default?: string } | unknown>
}

const entrypoints = [
  ['providers/environment', () => import('./providers/environment/public-api')],
  ['providers/locale', () => import('./providers/locale/public-api')],
  ['providers/interaction', () => import('./providers/interaction/public-api')],
  ['collection', () => import('./collection/public-api')],
  ['client-only', () => import('./client-only/public-api')],
  ['download-trigger', () => import('./download-trigger/public-api')],
  ['focus-trap', () => import('./focus-trap/public-api')],
  ['format', () => import('./format/public-api')],
  ['frame', () => import('./frame/public-api')],
  ['highlight', () => import('./highlight/public-api')],
  ['portal', () => import('./portal/public-api')],
  ['presence', () => import('./presence/public-api')],
  ['swap', () => import('./swap/public-api')],
] as const

describe('phase 2 entrypoint scaffolding', () => {
  it.each(entrypoints)('%s resolves', async (_name, load) => {
    await expect(load()).resolves.toBeDefined()
  })
})

describe('root entrypoint', () => {
  it('imports without throwing', async () => {
    await expect(import('./index')).resolves.toBeDefined()
  })

  it('does not expose _zag or internal symbols', async () => {
    const mod = await import('./index')
    const keys = Object.keys(mod)
    for (const key of keys) {
      expect(key).not.toMatch(/_zag/)
      expect(key).not.toMatch(/internal/i)
    }
  })
})

describe('providers aggregation', () => {
  it('imports without throwing', async () => {
    await expect(import('./providers')).resolves.toBeDefined()
  })

  it('exposes environment, locale, and interaction APIs', async () => {
    const mod = await import('./providers')
    expect(mod.provideArkEnvironment).toBeDefined()
    expect(mod.provideArkLocale).toBeDefined()
    expect(mod.provideArkInteraction).toBeDefined()
  })
})

describe('package.json exports map', () => {
  it('includes valid phase 2 secondary entrypoints', () => {
    const exportsMap = pkg.exports
    const requiredKeys = [
      '.',
      './avatar',
      './client-only',
      './collection',
      './download-trigger',
      './focus-trap',
      './format',
      './frame',
      './highlight',
      './portal',
      './presence',
      './providers/environment',
      './providers/interaction',
      './providers/locale',
      './swap',
      './package.json',
    ]
    for (const key of requiredKeys) {
      expect(exportsMap[key]).toBeDefined()
    }
    for (const key of requiredKeys.filter((key) => key !== './package.json')) {
      const entry = exportsMap[key] as { source: string; types: string; default: string }
      expect(existsSync(join(packageRoot, entry.source))).toBe(true)
      expect(entry.types).toMatch(/^\.\/dist\//)
      expect(entry.default).toMatch(/^\.\/dist\/fesm2022\//)
      if (key !== '.') {
        const sourceDir = dirname(entry.source)
        expect(existsSync(join(packageRoot, sourceDir, 'ng-package.json'))).toBe(true)
      }
    }
  })

  it('keeps forms-isolation entrypoints aligned with package exports', () => {
    const script = readFileSync(join(packageRoot, 'scripts/check-forms-isolation.ts'), 'utf-8')
    const scriptFiles = [...script.matchAll(/file: '([^']+)'/g)].map((match) => normalize(match[1]))
    const exportSources = Object.entries(pkg.exports)
      .filter(([key]) => key !== './package.json' && !key.startsWith('./src/'))
      .map(([, entry]) => normalize((entry as { source: string }).source.replace(/^\.\//, '')))

    expect(scriptFiles.sort()).toEqual(exportSources.sort())
  })
})
