import type { TreeCollection } from '@zag-js/collection'
import * as tree from '@zag-js/tree-view'

import { clearRendered, cloneTemplate, defineCollection, type Item } from '../../utils/collection.js'
import { rootOf } from '../../utils/define.js'

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

type Tree = TreeCollection<any>

interface Templates {
  leaf: HTMLTemplateElement | null
  branch: HTMLTemplateElement | null
}

function createPart(doc: Document, tags: string[]) {
  const [tag, ...rest] = tags
  const node = doc.createElement(tag)
  if (rest.length) node.append(createPart(doc, rest))
  return node
}

function createLeaf(doc: Document) {
  return createPart(doc, [nodeTag, 'ark-tree-view-cell', textTag])
}

function createBranch(doc: Document) {
  const group = doc.createElement(groupTag)
  group.append(createPart(doc, [nodeTag, 'ark-tree-view-cell', textTag]), doc.createElement(contentTag))
  return group
}

function renderNode(doc: Document, coll: Tree, node: unknown, templates: Templates) {
  const isBranch = coll.isBranchNode(node)
  const holder = isBranch
    ? cloneTemplate(templates.branch, () => createBranch(doc))
    : cloneTemplate(templates.leaf, () => createLeaf(doc))
  holder.setAttribute('value', coll.getNodeValue(node))
  holder.toggleAttribute('disabled', coll.getNodeDisabled(node))
  const text = holder.querySelector(textTag)
  if (text) setText(text, coll.stringifyNode(node))
  const content = holder.querySelector(contentTag)
  if (isBranch && content) renderNodes(doc, content, coll, coll.getNodeChildren(node), templates)
  return holder
}

function renderNodes(doc: Document, container: Element, coll: Tree, nodes: unknown[], templates: Templates) {
  for (const node of nodes) container.append(renderNode(doc, coll, node, templates))
}

export const collection = defineCollection<Tree>({
  item: groupTag,
  itemText: textTag,
  list: 'ark-tree-view-tree',
  create: (items: Item[]) =>
    tree.collection<Item>({
      rootNode: { value: '', label: '', disabled: false, children: items },
      nodeToChildren: (node) => node.children ?? [],
    }),
  readMarkup: (el) => {
    const treeEl = el.querySelector('ark-tree-view-tree')
    return treeEl ? readNodes(treeEl) : []
  },
  render: (treeEl, coll) => {
    const templates = {
      leaf: treeEl.querySelector<HTMLTemplateElement>(':scope > template:not([data-branch])'),
      branch: treeEl.querySelector<HTMLTemplateElement>(':scope > template[data-branch]'),
    }
    clearRendered(treeEl)
    renderNodes(treeEl.ownerDocument, treeEl, coll, coll.getNodeChildren(coll.rootNode), templates)
  },
})

type Collection = NonNullable<ReturnType<typeof collection.get>>

const indexes = new WeakMap<Collection, Map<string, tree.NodeProps>>()

function indexOf(coll: Collection) {
  let index = indexes.get(coll)
  if (!index) {
    index = new Map()
    coll.visit({ onEnter: (node, indexPath) => void index!.set(coll.getNodeValue(node), { node, indexPath }) })
    indexes.set(coll, index)
  }
  return index
}

export const ancestors = new WeakMap<HTMLElement, { holder: Element | null; root: HTMLElement | null }>()

export const nodePropsOf = (part: HTMLElement) => {
  let found = ancestors.get(part)
  if (!found) {
    found = { holder: part.closest(valueHolder), root: rootOf(part, root) }
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
