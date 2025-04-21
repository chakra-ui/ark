import '@testing-library/jest-dom'
import { JSDOM } from 'jsdom'
import ResizeObserver from 'resize-observer-polyfill'
import { vi } from 'vitest'

const { window } = new JSDOM()

vi.stubGlobal('ResizeObserver', ResizeObserver)
window.ResizeObserver = ResizeObserver
window.Element.prototype.scrollTo = () => {
  // no-op
}
window.Element.prototype.scrollIntoView = () => {
  // noop
}
window.requestAnimationFrame = (cb) => setTimeout(cb, 1000 / 60)
window.URL.createObjectURL = () => 'https://i.pravatar.cc/300'
window.URL.revokeObjectURL = () => {}

// stub Array.prototype.toSorted (used in zag.js collection)
// @ts-ignore
Array.prototype.toSorted = function () {
  return [...this].sort()
}

Object.assign(global, { window, document: window.document })

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
window.IntersectionObserver = IntersectionObserverMock
