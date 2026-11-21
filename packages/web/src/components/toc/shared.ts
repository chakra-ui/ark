import type { TocItem } from '@zag-js/toc'

export const root = 'ark-toc'
export const itemTag = 'ark-toc-item'
export const contentTag = 'ark-toc-content'

export const itemValueOf = (el: Element) => el.closest(itemTag)?.getAttribute('value') ?? undefined

export function itemsOf(el: HTMLElement): TocItem[] {
  return Array.from(el.querySelectorAll(itemTag), (item) => ({
    value: item.getAttribute('value') ?? '',
    depth: Number(item.getAttribute('depth') ?? 1),
    label: item.textContent?.trim() ?? '',
  }))
}

export function observeItems(el: HTMLElement, onChange: VoidFunction) {
  const changed = (node: Node) =>
    node instanceof Element && (node.localName === itemTag || !!node.querySelector(itemTag))
  const observer = new MutationObserver((records) => {
    if (
      records.some(
        (record) =>
          record.type === 'attributes' ||
          [...record.addedNodes].some(changed) ||
          [...record.removedNodes].some(changed),
      )
    )
      onChange()
  })
  observer.observe(el, { childList: true, subtree: true, attributeFilter: ['value', 'depth'] })
  return () => observer.disconnect()
}
