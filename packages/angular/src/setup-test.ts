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

// jsdom does not implement CSS.escape. This mirrors the CSSOM algorithm closely
// enough for selector contexts such as `#${CSS.escape(id)}` and `[attr=${CSS.escape(value)}]`.
const stubCssEscape = (value: string): string => {
  const string = String(value)
  const length = string.length
  let index = -1
  let result = ''
  const firstCodeUnit = string.charCodeAt(0)

  while (++index < length) {
    const codeUnit = string.charCodeAt(index)
    if (codeUnit === 0x0000) {
      result += '\uFFFD'
      continue
    }

    if (
      (codeUnit >= 0x0001 && codeUnit <= 0x001f) ||
      codeUnit === 0x007f ||
      (index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
      (index === 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit === 0x002d)
    ) {
      result += `\\${codeUnit.toString(16)} `
      continue
    }

    if (index === 0 && codeUnit === 0x002d && length === 1) {
      result += '\\-'
      continue
    }

    if (
      codeUnit >= 0x0080 ||
      codeUnit === 0x002d ||
      codeUnit === 0x005f ||
      (codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
      (codeUnit >= 0x0041 && codeUnit <= 0x005a) ||
      (codeUnit >= 0x0061 && codeUnit <= 0x007a)
    ) {
      result += string.charAt(index)
      continue
    }

    result += `\\${string.charAt(index)}`
  }

  return result
}
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
