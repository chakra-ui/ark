import { describe, expect, it } from 'vitest'

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
  it('includes all phase 2 secondary entrypoints', async () => {
    const pkg = (await import('../package.json')) as unknown as {
      default?: { exports: Record<string, unknown> }
      exports?: Record<string, unknown>
    }
    const exportsMap = pkg.default?.exports ?? pkg.exports
    expect(exportsMap).toBeDefined()
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
      expect((exportsMap as Record<string, unknown>)[key]).toBeDefined()
    }
  })
})
