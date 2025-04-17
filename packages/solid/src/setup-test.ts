import '@testing-library/jest-dom/vitest'
import 'vitest-axe/extend-expect'
import ResizeObserver from 'resize-observer-polyfill'
import { vi } from 'vitest'

global.document.execCommand = () => true
global.ResizeObserver = ResizeObserver
global.URL.createObjectURL = () => 'https://i.pravatar.cc/300'
global.URL.revokeObjectURL = () => {}
global.Element.prototype.scrollIntoView = () => {
  // no-op
}

let now = 1000
vi.spyOn(globalThis.performance, 'now').mockImplementation(() => now)
vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => {
  now += 16
  setTimeout(() => fn(now), 0)
  return 1
})
vi.stubGlobal('cancelAnimationFrame', vi.fn())

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

// TODO after zag 1.10+ remove this polyfill
if (!Set.prototype.difference) {
  Set.prototype.difference = function (otherSet) {
    // Validate that the input is a Set
    if (!(otherSet instanceof Set)) {
      throw new TypeError('difference: otherSet must be an instance of Set')
    }

    const result = new Set()

    // Add elements from this Set that are not in otherSet
    for (const elem of this) {
      if (!otherSet.has(elem)) {
        result.add(elem)
      }
    }

    return result
  }
}
