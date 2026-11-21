export const root = 'ark-carousel'
export const itemTag = 'ark-carousel-item'
export const indicatorTag = 'ark-carousel-indicator'

export const ownParts = (rootEl: Element, tag: string) =>
  Array.from(rootEl.querySelectorAll<HTMLElement>(tag)).filter((part) => part.closest(root) === rootEl)

// Falls back to the part's position among its root's parts of the same tag
export function indexOf(part: HTMLElement, tag: string) {
  const index = part.getAttribute('index')
  if (index != null && index !== '') return Number(index)
  const rootEl = part.closest(root)
  return rootEl ? Math.max(0, ownParts(rootEl, tag).indexOf(part)) : 0
}
