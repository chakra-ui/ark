import type { AnatomyInstance } from '@ark-ui/anatomy'
import '@testing-library/jest-dom'
import { JSDOM } from 'jsdom'
import ResizeObserver from 'resize-observer-polyfill'

const { window } = new JSDOM()

window.ResizeObserver = ResizeObserver
window.Element.prototype.scrollTo = () => {
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
