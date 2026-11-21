export const root = 'ark-marquee'
export const contentTag = 'ark-marquee-content'

const contentsOf = (viewport: Element) => Array.from(viewport.querySelectorAll<HTMLElement>(`:scope > ${contentTag}`))

export const contentIndexOf = (el: HTMLElement) => (el.parentElement ? contentsOf(el.parentElement).indexOf(el) : 0)

export function syncCopies(viewport: HTMLElement, count: number, rebuild = false) {
  const [source, ...copies] = contentsOf(viewport)
  if (!source) return
  if (rebuild) for (const copy of copies.splice(0)) copy.remove()
  while (copies.length > Math.max(0, count - 1)) copies.pop()!.remove()
  let anchor: Element = copies.at(-1) ?? source
  while (copies.length < count - 1) {
    const copy = source.cloneNode(true) as HTMLElement
    copy.setAttribute('data-rendered', '')
    anchor.after(copy)
    anchor = copy
    copies.push(copy)
  }
}
