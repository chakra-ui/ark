import type { FileRejection, ItemType } from '@zag-js/file-upload'
import type { RootElement } from '../../utils/define.js'

export const root = 'ark-file-upload'

export interface ItemData {
  file: File
  type: ItemType
  errors?: FileRejection['errors']
}

export const items = new WeakMap<HTMLElement, ItemData>()

export const itemOf = (part: HTMLElement) => {
  const item = part.closest<HTMLElement>('ark-file-upload-item')
  return item ? items.get(item) : undefined
}

const ids = new WeakMap<File, string>()
let uid = 0
export const fileKey = (file: File) => {
  let id = ids.get(file)
  if (!id) {
    id = String(++uid)
    ids.set(file, id)
  }
  return id
}

const stamped = new WeakMap<HTMLTemplateElement, Map<string, HTMLElement>>()

// Local copy of utils/repeat with stale nodes removed before placement, so kept nodes aren't moved
export function repeat<T>(
  template: HTMLTemplateElement,
  list: readonly T[],
  key: (item: T, index: number) => string,
  apply: (node: HTMLElement, item: T, index: number) => void,
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
      node = template.content.firstElementChild!.cloneNode(true) as HTMLElement
      node.setAttribute('data-rendered', '')
    }
    apply(node, item, index)
    if (anchor.nextElementSibling !== node) anchor.after(node)
    anchor = node
    next.set(k, node)
  })
  stamped.set(template, next)
}
