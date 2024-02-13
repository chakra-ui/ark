import type { AnatomyInstance } from '@ark-ui/anatomy'
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
  // no-op
}
window.requestAnimationFrame = (cb) => setTimeout(cb, 1000 / 60)
window.URL.createObjectURL = () => 'https://i.pravatar.cc/300'

Object.assign(global, { window, document: window.document })

export const getParts = (anatomy: AnatomyInstance<string>) => {
  return Object.values(anatomy.build()).map(
    (x) => `[data-scope="${x.attrs['data-scope']}"][data-part="${x.attrs['data-part']}"]`,
  )
}

export const getExports = <T extends string>(anatomy: AnatomyInstance<T>) => {
  return anatomy.keys().map((x) => (x.charAt(0).toUpperCase() + x.slice(1)) as Capitalize<T>)
}
