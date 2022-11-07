import '@testing-library/jest-dom'
import { JSDOM } from 'jsdom'
import ResizeObserver from 'resize-observer-polyfill'

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')

// @ts-expect-error DOMWindow !== globalThis
window = jsdom.window
Object.assign(global, { window, document: window.document })

window.ResizeObserver = ResizeObserver
