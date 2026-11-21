/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom/vitest'

import { afterEach } from 'vitest'

const uaStyle = document.createElement('style')
uaStyle.textContent = '[hidden]{display:none !important}'
document.head.appendChild(uaStyle)

Object.defineProperty(Event.prototype, 'isTrusted', {
  configurable: true,
  get(this: Event & { pointerType?: string }) {
    return this.pointerType !== ''
  },
})

const getBoundingClientRect = Element.prototype.getBoundingClientRect

Element.prototype.getBoundingClientRect = function (this: Element) {
  return this.localName.endsWith('-virtualizer') ? new DOMRect(0, 0, 400, 400) : getBoundingClientRect.call(this)
}

let clipboardText = ''

Object.defineProperty(navigator, 'clipboard', {
  configurable: true,
  value: {
    writeText: async (text: string) => {
      clipboardText = text
    },
    readText: async () => clipboardText,
  },
})

class IntersectionObserverStub {
  static instances = new Set<IntersectionObserverStub>()

  targets = new Set<Element>()

  constructor(readonly callback: IntersectionObserverCallback) {
    IntersectionObserverStub.instances.add(this)
  }

  observe(target: Element) {
    IntersectionObserverStub.instances.add(this)
    this.targets.add(target)
  }

  unobserve(target: Element) {
    this.targets.delete(target)
  }

  disconnect() {
    this.targets.clear()
    IntersectionObserverStub.instances.delete(this)
  }

  takeRecords() {
    return []
  }
}

globalThis.IntersectionObserver = IntersectionObserverStub as unknown as typeof IntersectionObserver

class ImageStub extends Image {
  set onload(callback: (() => void) | null) {
    if (callback) queueMicrotask(callback)
  }
}

globalThis.Image = ImageStub

HTMLCanvasElement.prototype.toDataURL = () => 'data:image/png;base64,'

afterEach(() => {
  document.body.innerHTML = ''
  clipboardText = ''
})
