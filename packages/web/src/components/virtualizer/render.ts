import { spreadProps } from '@zag-js/vanilla'
import type { CSSProperties } from '@zag-js/virtualizer'

export interface VirtualizerProps {
  style?: CSSProperties
  [attribute: string]: unknown
}

/** Applies the props returned by a virtualizer getter (style, aria) to an element. */
export const spreadVirtualizerProps = (element: Element, props: VirtualizerProps) =>
  spreadProps(element, props, 'virtualizer')

type Key = string | number

const rendered = new WeakMap<Element, Map<Key, Element>>()

/**
 * Renders the current window into `container`, reusing elements by key.
 * `render` receives the element from the previous pass (if any) and returns the element to show.
 */
export function renderVirtualItems<I, T extends Element = HTMLElement>(
  container: Element,
  items: readonly I[],
  key: (item: I) => Key,
  render: (item: I, element: T | undefined) => T,
) {
  const prev = (rendered.get(container) ?? new Map()) as Map<Key, T>
  const next = new Map<Key, T>()

  for (const item of items) {
    const k = key(item)
    next.set(k, render(item, prev.get(k)))
  }

  for (const [k, element] of prev) {
    if (next.get(k) !== element) element.remove()
  }

  let previous: Element | null = null

  for (const element of next.values()) {
    const expected: Element | null = previous ? previous.nextElementSibling : container.firstElementChild
    if (expected !== element) placeAfter(container, previous, element)
    previous = element
  }

  rendered.set(container, next)
}

const placeAfter = (container: Element, previous: Element | null, element: Element) => {
  if (previous) previous.after(element)
  else container.prepend(element)
}
