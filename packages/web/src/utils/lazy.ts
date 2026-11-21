const mounted = new WeakMap<HTMLElement, ChildNode[]>()

export function mountTemplate(part: HTMLElement, visible: boolean, unmount: boolean) {
  const template = part.querySelector<HTMLTemplateElement>(':scope > template')
  if (!template) return
  const nodes = mounted.get(part)
  if (visible && !nodes) {
    const fragment = template.content.cloneNode(true) as DocumentFragment
    mounted.set(part, [...fragment.childNodes])
    part.append(fragment)
  } else if (!visible && nodes && unmount) {
    for (const node of nodes) node.remove()
    mounted.delete(part)
  }
}
