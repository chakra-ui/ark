import * as tree from '@zag-js/tree-view'
import { defineCollection, type Item } from '../../utils/collection.js'
export const root = 'ark-tree-view'

export const groupTag = 'ark-tree-view-node-group'

export const nodeTag = 'ark-tree-view-node'

export const contentTag = 'ark-tree-view-node-group-content'

export const textTag = 'ark-tree-view-node-text'

const valueHolder = `${groupTag}[value], ${nodeTag}[value]`

const labelOf = (holder: Element) => {
  const text =
    holder.localName === nodeTag
      ? holder.querySelector(textTag)
      : holder.querySelector(`:scope > ${nodeTag} ${textTag}`)
  return text?.textContent?.trim() ?? ''
}

function readNodes(container: ParentNode): Item[] {
  const holders = Array.from(container.children).filter(
    (child) => child.matches(valueHolder) && !child.hasAttribute('data-rendered'),
  )
  return holders.map((holder) => {
    const content = holder.querySelector(`:scope > ${contentTag}`)
    // Lazy branches keep their children in a template until first expanded
    const lazy = content?.querySelector<HTMLTemplateElement>(':scope > template')
    return {
      value: holder.getAttribute('value') ?? '',
      label: labelOf(holder),
      disabled: holder.hasAttribute('disabled'),
      children: content ? readNodes(lazy?.content ?? content) : undefined,
    }
  })
}

function setText(el: Element, text: string) {
  for (const node of [...el.childNodes]) if (node.nodeType === Node.TEXT_NODE) node.remove()
  el.append(text)
}

function renderNodes(container: Element, items: Item[], leaf: HTMLTemplateElement, branch: HTMLTemplateElement | null) {
  for (const item of items) {
    const template = item.children && branch ? branch : leaf
    const holder = template.content.firstElementChild?.cloneNode(true) as HTMLElement
    holder.setAttribute('value', item.value)
    holder.toggleAttribute('disabled', item.disabled)
    holder.setAttribute('data-rendered', '')
    const text = holder.querySelector(textTag)
    if (text) setText(text, item.label)
    const content = holder.querySelector(contentTag)
    if (item.children && content) renderNodes(content, item.children, leaf, branch)
    container.append(holder)
  }
}

export const collection: ReturnType<typeof defineCollection<ReturnType<typeof tree.collection<Item>>>> =
  defineCollection({
    item: groupTag,
    itemText: textTag,
    list: 'ark-tree-view-tree',
    create: (items) =>
      tree.collection<Item>({
        rootNode: { value: '', label: '', disabled: false, children: items },
        nodeToValue: (node) => node.value,
        nodeToString: (node) => node.label,
        nodeToChildren: (node) => node.children ?? [],
        isNodeDisabled: (node) => node.disabled,
      }),
    readMarkup: (el) => {
      const treeEl = el.querySelector('ark-tree-view-tree')
      return treeEl ? readNodes(treeEl) : []
    },
    render: (template, items) => {
      const treeEl = template.parentElement!
      for (const rendered of treeEl.querySelectorAll(':scope > [data-rendered]')) rendered.remove()
      const leaf = treeEl.querySelector<HTMLTemplateElement>(':scope > template:not([data-branch])')
      const branch = treeEl.querySelector<HTMLTemplateElement>(':scope > template[data-branch]')
      if (leaf) renderNodes(treeEl, items, leaf, branch)
    },
  })

type Collection = NonNullable<ReturnType<typeof collection.get>>

const indexes = new WeakMap<Collection, Map<string, tree.NodeProps>>()

function indexOf(coll: Collection) {
  let index = indexes.get(coll)
  if (!index) {
    index = new Map()
    coll.visit({ onEnter: (node, indexPath) => void index!.set(node.value, { node, indexPath }) })
    indexes.set(coll, index)
  }
  return index
}

export const ancestors = new WeakMap<HTMLElement, { holder: Element | null; root: HTMLElement | null }>()

export const nodePropsOf = (part: HTMLElement) => {
  let found = ancestors.get(part)
  if (!found) {
    found = { holder: part.closest(valueHolder), root: part.closest(root) }
    ancestors.set(part, found)
  }
  const value = found.holder?.getAttribute('value')
  const coll = found.root ? collection.get(found.root) : undefined
  if (value == null || !coll) return null
  return indexOf(coll).get(value) ?? null
}

export const listOf = (attr: string | null) => (attr ? attr.split(',').map((value) => value.trim()) : undefined)

export const controlledList = (el: Element, name: string) =>
  el.hasAttribute(name) ? (listOf(el.getAttribute(name)) ?? []) : undefined
