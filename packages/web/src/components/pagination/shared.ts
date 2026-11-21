import type { RootElement } from '../../utils/define.js'

export const root = 'ark-pagination'

const stamped = new WeakMap<HTMLTemplateElement, Map<string, HTMLElement>>()

// Local copy of utils/repeat: `pick` chooses which top-level template element to stamp per item,
// and stale nodes are removed before placement so kept nodes aren't moved
export function repeat<T>(
  template: HTMLTemplateElement,
  list: readonly T[],
  key: (item: T, index: number) => string,
  apply: (node: HTMLElement, item: T, index: number) => void,
  pick: (item: T) => string = () => '*',
) {
  const prev = stamped.get(template) ?? new Map<string, HTMLElement>()
  const keys = list.map(key)
  const live = new Set(keys)
  for (const [k, node] of prev) if (!live.has(k)) node.remove()
  const next = new Map<string, HTMLElement>()
  let anchor: Element = template
  list.forEach((item, index) => {
    const k = keys[index]
    let node = prev.get(k)
    if (!node) {
      const selector = pick(item)
      const source = Array.from(template.content.children).find((child) => child.matches(selector))
      if (!source) return
      node = source.cloneNode(true) as HTMLElement
      node.setAttribute('data-rendered', '')
    }
    apply(node, item, index)
    if (anchor.nextElementSibling !== node) anchor.after(node)
    anchor = node
    next.set(k, node)
  })
  stamped.set(template, next)
}
