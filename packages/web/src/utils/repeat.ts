const stamped = new WeakMap<HTMLTemplateElement, Map<string, HTMLElement>>()

/** Stamps `template` once per item, after the template, reusing nodes by key. */
export function repeat<T>(
  template: HTMLTemplateElement,
  items: readonly T[],
  key: (item: T, index: number) => string,
  apply: (node: HTMLElement, item: T, index: number) => void,
) {
  const prev = stamped.get(template) ?? new Map<string, HTMLElement>()
  const next = new Map<string, HTMLElement>()
  let anchor: Element = template

  items.forEach((item, index) => {
    const k = key(item, index)
    let node = prev.get(k)
    if (!node) {
      node = template.content.firstElementChild!.cloneNode(true) as HTMLElement
      node.setAttribute('data-rendered', '')
    }
    apply(node, item, index)
    // Only move out-of-place nodes, so a focused one keeps focus
    if (anchor.nextElementSibling !== node) anchor.after(node)
    anchor = node
    next.set(k, node)
  })

  for (const [k, node] of prev) if (!next.has(k)) node.remove()
  stamped.set(template, next)
}

export const templateOf = (el: Element) => el.querySelector<HTMLTemplateElement>(':scope > template')
