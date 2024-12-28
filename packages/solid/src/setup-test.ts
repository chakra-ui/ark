import '@testing-library/jest-dom/vitest'
import type { AnatomyInstance } from '@zag-js/anatomy'
import ResizeObserver from 'resize-observer-polyfill'
import { vi } from 'vitest'

export const getParts = (anatomy: AnatomyInstance<string>) => {
  return Object.values(anatomy.build()).map(
    (x) => `[data-scope="${x.attrs['data-scope']}"][data-part="${x.attrs['data-part']}"]`,
  )
}

export const getExports = <T extends string>(anatomy: AnatomyInstance<T>) => {
  return anatomy.keys().map((x) => (x.charAt(0).toUpperCase() + x.slice(1)) as Capitalize<T>)
}

global.document.execCommand = () => true
global.ResizeObserver = ResizeObserver
global.URL.createObjectURL = () => 'https://i.pravatar.cc/300'
global.URL.revokeObjectURL = () => {}
global.Element.prototype.scrollIntoView = () => {
  // no-op
}

// stub Array.prototype.toSorted (used in zag.js collection)
Array.prototype.toSorted = function () {
  return [...this].sort()
}

Object.defineProperty(window, 'navigator', {
  value: {
    clipboard: {
      writeText: vi.fn(),
    },
  },
})

Element.prototype.scrollTo = () => {
  // no-op
}

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
