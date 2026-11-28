import { asChild } from './define.js'

const mounted = new WeakMap<HTMLElement, ChildNode[]>()

export function mountTemplate(part: HTMLElement, visible: boolean, unmount: boolean): boolean {
  const host = asChild(part) ?? part
  const template = host.querySelector<HTMLTemplateElement>(':scope > template')
  if (!template) return false
  const nodes = mounted.get(part)
  if (visible && !nodes) {
    const fragment = template.content.cloneNode(true) as DocumentFragment
    mounted.set(part, [...fragment.childNodes])
    host.append(fragment)
    return true
  }
  if (!visible && nodes && unmount) {
    for (const node of nodes) node.remove()
    mounted.delete(part)
    return true
  }
  return false
}
