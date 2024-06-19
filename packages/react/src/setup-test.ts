import type { AnatomyInstance } from '@ark-ui/anatomy'
import '@testing-library/jest-dom/vitest'
import { JSDOM } from 'jsdom'
import ResizeObserver from 'resize-observer-polyfill'
import { vi } from 'vitest'
import 'vitest-axe/extend-expect'

const { window } = new JSDOM()

vi.stubGlobal('ResizeObserver', ResizeObserver)
// biome-ignore lint/complexity/useLiteralKeys: <explanation>
window['ResizeObserver'] = ResizeObserver
window.Element.prototype.scrollTo = () => {}
window.Element.prototype.scrollIntoView = () => {}
window.requestAnimationFrame = (cb) => setTimeout(cb, 1000 / 60)
window.URL.createObjectURL = () => 'https://i.pravatar.cc/300'

Object.defineProperty(window, 'navigator', {
  value: {
    clipboard: {
      writeText: vi.fn(),
    },
  },
})

// stub Array.prototype.toSorted (used in zag.js collection)
Array.prototype.toSorted = function () {
  return [...this].sort()
}

Object.assign(global, { window, document: window.document })

export const getParts = (anatomy: AnatomyInstance<string>) => {
  return Object.values(anatomy.build()).map(
    (x) => `[data-scope="${x.attrs['data-scope']}"][data-part="${x.attrs['data-part']}"]`,
  )
}

export const getExports = <T extends string>(anatomy: AnatomyInstance<T>) => {
  return anatomy.keys().map((x) => (x.charAt(0).toUpperCase() + x.slice(1)) as Capitalize<T>)
}
