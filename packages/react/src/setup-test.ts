import '@testing-library/jest-dom/vitest'
import { JSDOM } from 'jsdom'
import ResizeObserver from 'resize-observer-polyfill'
import { vi } from 'vitest'
import 'vitest-axe/extend-expect'

const { window } = new JSDOM()
/**
 * IntersectionObserver
 */
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}))
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
// biome-ignore lint/complexity/useLiteralKeys: <explanation>
window['IntersectionObserver'] = IntersectionObserverMock

vi.stubGlobal('ResizeObserver', ResizeObserver)
// biome-ignore lint/complexity/useLiteralKeys: <explanation>
window['ResizeObserver'] = ResizeObserver

window.Element.prototype.scrollTo = () => {}
window.Element.prototype.scrollIntoView = () => {}

// Mock performance.now and requestAnimationFrame
let now = 1000
vi.spyOn(globalThis.performance, 'now').mockImplementation(() => now)
vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => {
  now += 16
  setTimeout(() => fn(now), 10)
  return 1
})
vi.stubGlobal('cancelAnimationFrame', vi.fn())

window.URL.createObjectURL = () => 'https://i.pravatar.cc/300'
window.URL.revokeObjectURL = () => {}

Object.defineProperty(window, 'navigator', {
  value: {
    clipboard: {
      writeText: vi.fn(),
    },
  },
})

Object.assign(global, { window, document: window.document })
