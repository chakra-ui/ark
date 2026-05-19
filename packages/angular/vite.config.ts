/// <reference types="vitest" />
import angular from '@analogjs/vite-plugin-angular'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ mode }) => ({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/setup-test.ts'],
    include: ['**/*.spec.ts', '**/*.spec.mts'],
    coverage: {
      provider: 'v8',
    },
  },
  resolve: {
    alias: {
      '@ark-ui/angular/avatar': new URL('./avatar/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/collapsible': new URL('./src/collapsible/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/dialog': new URL('./src/dialog/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/drawer': new URL('./src/drawer/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/editable': new URL('./editable/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/field': new URL('./field/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/fieldset': new URL('./fieldset/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/hover-card': new URL('./src/hover-card/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/menu': new URL('./src/menu/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/navigation-menu': new URL('./src/navigation-menu/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/number-input': new URL('./number-input/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/pin-input': new URL('./pin-input/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/popover': new URL('./src/popover/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/portal': new URL('./src/portal/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/presence': new URL('./src/presence/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/progress': new URL('./progress/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/toggle': new URL('./toggle/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/tooltip': new URL('./src/tooltip/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/src/_zag': new URL('./src/_zag/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/src/_zag/apply-ark-props': new URL('./src/_zag/apply-ark-props.ts', import.meta.url).pathname,
      '@ark-ui/angular/src/_zag/use-machine': new URL('./src/_zag/use-machine.ts', import.meta.url).pathname,
      '@ark-ui/angular/src/internal': new URL('./src/internal/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/src/internal/id': new URL('./src/internal/id.ts', import.meta.url).pathname,
      '@ark-ui/angular/src/internal/types': new URL('./src/internal/types.ts', import.meta.url).pathname,
      '@ark-ui/angular/src/presence': new URL('./src/presence/public-api.ts', import.meta.url).pathname,
      '@ark-ui/angular/src/providers/environment': new URL('./src/providers/environment/public-api.ts', import.meta.url)
        .pathname,
      '@ark-ui/angular/src/providers/locale': new URL('./src/providers/locale/public-api.ts', import.meta.url).pathname,
    },
    conditions: ['source', 'module', 'browser', 'import', 'default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}))
