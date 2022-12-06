import '@testing-library/jest-dom'
import { JSDOM } from 'jsdom'
import ResizeObserver from 'resize-observer-polyfill'

const { window } = new JSDOM()

window.ResizeObserver = ResizeObserver
window.Element.prototype.scrollTo = () => {
  // no-op
}

Object.assign(global, { window, document: window.document })
