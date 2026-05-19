import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const pkg = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf-8')) as {
  exports: Record<string, { source?: string; types?: string; default?: string } | unknown>
}
const tsconfig = JSON.parse(readFileSync(join(packageRoot, 'tsconfig.json'), 'utf-8')) as {
  compilerOptions: { paths: Record<string, string[]> }
  include: string[]
}
const viteConfigSource = readFileSync(join(packageRoot, 'vite.config.ts'), 'utf-8')

const batch4Entrypoints = [
  ['date-input', 'ArkDateInputRoot', () => import('./date-input/public-api')],
  ['date-picker', 'ArkDatePickerRoot', () => import('./date-picker/public-api')],
  ['color-picker', 'ArkColorPickerRoot', () => import('./color-picker/public-api')],
  ['qr-code', 'ArkQrCodeRoot', () => import('./qr-code/public-api')],
  ['signature-pad', 'ArkSignaturePadRoot', () => import('./signature-pad/public-api')],
  ['image-cropper', 'ArkImageCropperRoot', () => import('./image-cropper/public-api')],
  ['tree-view', 'ArkTreeViewRoot', () => import('./tree-view/public-api')],
  ['json-tree-view', 'ArkJsonTreeViewRoot', () => import('./json-tree-view/public-api')],
] as const

const batch5Entrypoints = [
  ['accordion', () => import('./accordion/public-api')],
  ['tabs', () => import('./tabs/public-api')],
  ['pagination', () => import('./pagination/public-api')],
  ['steps', () => import('./steps/public-api')],
  ['splitter', () => import('./splitter/public-api')],
  ['carousel', () => import('./carousel/public-api')],
  ['scroll-area', () => import('./scroll-area/public-api')],
  ['floating-panel', () => import('./floating-panel/public-api')],
  ['marquee', () => import('./marquee/public-api')],
  ['tour', () => import('./tour/public-api')],
  ['timer', () => import('./timer/public-api')],
  ['toast', () => import('./toast/public-api')],
] as const

const pendingSourceEntrypoints = new Set(
  [...batch4Entrypoints, ...batch5Entrypoints].map(([name]) => normalize(`src/${name}/public-api.ts`)),
)
const privateSourceExportKeys = new Set(['./src/_zag', './src/collection', './src/internal', './src/tree-view'])

const isPendingSource = (source: string) => {
  const normalizedSource = normalize(source.replace(/^\.\//, ''))
  return pendingSourceEntrypoints.has(normalizedSource) && !existsSync(join(packageRoot, normalizedSource))
}

const entrypoints = [
  ['providers/environment', () => import('./providers/environment/public-api')],
  ['providers/locale', () => import('./providers/locale/public-api')],
  ['providers/interaction', () => import('./providers/interaction/public-api')],
  ['clipboard', () => import('../clipboard/public-api')],
  ['collapsible', () => import('./collapsible/public-api')],
  ['combobox', () => import('../combobox/public-api')],
  ['dialog', () => import('./dialog/public-api')],
  ['drawer', () => import('./drawer/public-api')],
  ['editable', () => import('../editable/public-api')],
  ['field', () => import('../field/public-api')],
  ['fieldset', () => import('../fieldset/public-api')],
  ['file-upload', () => import('../file-upload/public-api')],
  ['hover-card', () => import('./hover-card/public-api')],
  ['listbox', () => import('../listbox/public-api')],
  ['menu', () => import('./menu/public-api')],
  ['navigation-menu', () => import('./navigation-menu/public-api')],
  ['number-input', () => import('../number-input/public-api')],
  ['password-input', () => import('../password-input/public-api')],
  ['pin-input', () => import('../pin-input/public-api')],
  ['select', () => import('../select/public-api')],
  ['signature-pad', () => import('./signature-pad/public-api')],
  ['tags-input', () => import('../tags-input/public-api')],
  ['popover', () => import('./popover/public-api')],
  ['tooltip', () => import('./tooltip/public-api')],
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

describe('Batch 5 entrypoint scaffolding', () => {
  it.each(batch5Entrypoints)('%s resolves', async (_name, load) => {
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
      './accordion',
      './avatar',
      './carousel',
      './clipboard',
      './client-only',
      './collapsible',
      './color-picker',
      './combobox',
      './date-input',
      './date-picker',
      './dialog',
      './drawer',
      './editable',
      './field',
      './fieldset',
      './file-upload',
      './floating-panel',
      './hover-card',
      './image-cropper',
      './json-tree-view',
      './listbox',
      './marquee',
      './menu',
      './navigation-menu',
      './number-input',
      './pagination',
      './password-input',
      './pin-input',
      './popover',
      './qr-code',
      './scroll-area',
      './select',
      './signature-pad',
      './splitter',
      './steps',
      './tabs',
      './tags-input',
      './timer',
      './toast',
      './tooltip',
      './tour',
      './tree-view',
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
    expect(
      Object.keys(exportsMap).filter((key) => key.startsWith('./src/') && !privateSourceExportKeys.has(key)),
    ).toEqual([])
    for (const key of requiredKeys.filter((key) => key !== './package.json')) {
      const entry = exportsMap[key] as { source: string; types: string; default: string }
      if (!isPendingSource(entry.source)) {
        expect(existsSync(join(packageRoot, entry.source))).toBe(true)
      }
      expect(entry.types).toMatch(/^\.\/dist\//)
      expect(entry.default).toMatch(/^\.\/dist\/fesm2022\//)
      if (key !== '.') {
        const sourceDir = dirname(entry.source)
        if (!isPendingSource(entry.source)) {
          expect(existsSync(join(packageRoot, sourceDir, 'ng-package.json'))).toBe(true)
        }
      }
    }
  })

  it('wires Batch 4 entrypoints to src public APIs', () => {
    expect(tsconfig.include).toContain('src/**/*.ts')

    for (const [name] of batch4Entrypoints) {
      const publicApi = `src/${name}/public-api.ts`
      const source = `./${publicApi}`
      const entry = pkg.exports[`./${name}`] as { source: string; types: string; default: string }

      expect(entry).toEqual({
        source,
        types: `./dist/src/${name}/index.d.ts`,
        default: `./dist/fesm2022/ark-ui-angular-src-${name}.mjs`,
      })
      expect(tsconfig.compilerOptions.paths[`@ark-ui/angular/${name}`]).toEqual([publicApi])
      expect(viteConfigSource).toContain(
        `'@ark-ui/angular/${name}': new URL('./${publicApi}', import.meta.url).pathname`,
      )
    }
  })

  it('resolves materialized Batch 4 public APIs', async () => {
    for (const [name, rootExport, load] of batch4Entrypoints) {
      if (!existsSync(join(packageRoot, 'src', name, 'public-api.ts'))) continue
      const mod = await load()
      expect(mod[rootExport as keyof typeof mod]).toBeDefined()
    }
  })

  it('wires Batch 5 entrypoints to src public APIs', () => {
    expect(tsconfig.include).toContain('src/**/*.ts')

    for (const [name] of batch5Entrypoints) {
      const publicApi = `src/${name}/public-api.ts`
      const source = `./${publicApi}`
      const entry = pkg.exports[`./${name}`] as { source: string; types: string; default: string }

      expect(entry).toEqual({
        source,
        types: `./dist/src/${name}/index.d.ts`,
        default: `./dist/fesm2022/ark-ui-angular-src-${name}.mjs`,
      })
      expect(tsconfig.compilerOptions.paths[`@ark-ui/angular/${name}`]).toEqual([publicApi])
      expect(viteConfigSource).toContain(
        `'@ark-ui/angular/${name}': new URL('./${publicApi}', import.meta.url).pathname`,
      )
    }
  })

  it('keeps forms-isolation entrypoints aligned with package exports', () => {
    const script = readFileSync(join(packageRoot, 'scripts/check-forms-isolation.ts'), 'utf-8')
    const scriptFiles = [...script.matchAll(/file: '([^']+)'/g)].map((match) => normalize(match[1]))
    const scriptOutputs = [...script.matchAll(/outputs: \['([^']+)'\]/g)].map((match) => normalize(match[1]))
    const exportSources = Object.entries(pkg.exports)
      .filter(([key]) => key !== './package.json' && !privateSourceExportKeys.has(key))
      .map(([, entry]) => normalize((entry as { source: string }).source.replace(/^\.\//, '')))
    const exportDefaults = Object.entries(pkg.exports)
      .filter(([key]) => key !== './package.json' && !privateSourceExportKeys.has(key))
      .map(([, entry]) => normalize((entry as { default: string }).default.replace(/^\.\//, '')))

    expect(scriptFiles.sort()).toEqual(exportSources.sort())
    expect(scriptOutputs.sort()).toEqual(exportDefaults.sort())
  })
})
