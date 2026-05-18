import '@angular/compiler'
import '@analogjs/vitest-angular/setup-snapshots'
import { NgModule, provideZonelessChangeDetection } from '@angular/core'
import { getTestBed } from '@angular/core/testing'
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing'

if (typeof globalThis.ResizeObserver === 'undefined') {
  class StubResizeObserver {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }
  ;(globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = StubResizeObserver
}

// jsdom does not implement CSS.escape. Stub it with a quote-wrapped fallback
// that yields a value usable inside attribute selectors (e.g. `[attr="value"]`).
const stubCssEscape = (value: string): string => `"${String(value).replace(/(["\\])/g, '\\$1')}"`
if (typeof (globalThis as { CSS?: { escape?: (value: string) => string } }).CSS === 'undefined') {
  ;(globalThis as unknown as { CSS: { escape: (value: string) => string } }).CSS = { escape: stubCssEscape }
} else if (typeof (globalThis as { CSS: { escape?: (value: string) => string } }).CSS.escape !== 'function') {
  ;(globalThis as { CSS: { escape: (value: string) => string } }).CSS.escape = stubCssEscape
}

@NgModule({
  providers: [provideZonelessChangeDetection()],
})
class ZonelessTestModule {}

getTestBed().initTestEnvironment([BrowserTestingModule, ZonelessTestModule], platformBrowserTesting(), {
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
})
