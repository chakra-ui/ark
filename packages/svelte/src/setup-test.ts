/// <reference types="@testing-library/jest-dom" />
import '@testing-library/svelte/vitest'
import '@testing-library/jest-dom/vitest'

import { expect, vi } from 'vitest'
import * as matchers from 'vitest-axe/matchers'

expect.extend(matchers)

// Mock Canvas API (for axe-core)
global.HTMLCanvasElement.prototype.getContext = () => null

// Mock URL API
global.URL.createObjectURL = vi.fn(() => 'blob:mock-url')
global.URL.revokeObjectURL = vi.fn()

// Mock Clipboard API
Object.assign(global.navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
    readText: vi.fn().mockResolvedValue(''),
  },
})

// Mock ResizeObserver
global.ResizeObserver = vi.fn(function ResizeObserver() {
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }
})

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(function IntersectionObserver() {
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn(),
    root: null,
    rootMargin: '',
    thresholds: [],
  }
})

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock DOM methods
global.Element.prototype.scrollIntoView = vi.fn()
global.Element.prototype.scrollTo = vi.fn()

// Mock requestAnimationFrame with proper timing
let now = 1000
vi.spyOn(globalThis.performance, 'now').mockImplementation(() => now)

const rafCallbacks = new Map<number, FrameRequestCallback>()
let rafId = 1

vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => {
  const id = rafId++
  rafCallbacks.set(id, fn)
  now += 16
  setTimeout(() => {
    const callback = rafCallbacks.get(id)
    if (callback) {
      rafCallbacks.delete(id)
      callback(now)
    }
  }, 0)
  return id
})

vi.stubGlobal('cancelAnimationFrame', (id: number) => {
  rafCallbacks.delete(id)
})
