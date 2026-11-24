import {
  getAccessibleDescription,
  getRootNode,
  type JsonNode,
  type JsonNodeHastElement,
  type JsonNodePreviewOptions,
  jsonNodeToElement,
  keyPathToKey,
  nodeToString,
  nodeToValue,
} from '@zag-js/json-tree-utils'
import * as tree from '@zag-js/tree-view'
import type { TreeViewElement } from '../tree-view/index.js'
import '../tree-view/index.js'

type Collection = tree.Api['collection']

export type JsonTreeViewRenderValue = (node: JsonNodeHastElement) => Node | string | null | undefined

const scope = { 'data-scope': 'json-tree-view' }

const forwardedEvents = ['expandedchange', 'selectionchange', 'focuschange']

function create<K extends keyof HTMLElementTagNameMap>(doc: Document, tag: K, attrs: Record<string, string> = {}) {
  const el = doc.createElement(tag)
  for (const [name, value] of Object.entries({ ...scope, ...attrs })) el.setAttribute(name, value)
  return el
}

function branchValues(coll: Collection, depth: number) {
  const values: string[] = []
  coll.visit({
    onEnter: (node, indexPath) => {
      if (indexPath.length > 0 && indexPath.length <= depth && coll.isBranchNode(node)) {
        values.push(coll.getNodeValue(node))
      }
    },
  })
  return values
}

function renderValue(doc: Document, node: JsonNodeHastElement, custom?: JsonTreeViewRenderValue): Node {
  if (node.type === 'text') {
    const rendered = custom?.(node)
    if (rendered == null) return doc.createTextNode(String(node.value))
    if (typeof rendered === 'string') return doc.createTextNode(rendered)
    return rendered.parentNode ? rendered.cloneNode(true) : rendered
  }
  const el = doc.createElement(node.tagName)
  if (node.properties.root) el.setAttribute('data-root', '')
  if (node.properties.nodeType) el.setAttribute('data-type', String(node.properties.nodeType))
  if (node.properties.kind) el.setAttribute('data-kind', String(node.properties.kind))
  for (const child of node.children) el.append(renderValue(doc, child, custom))
  return el
}

const numberAttr = (el: Element, name: string) => {
  const value = el.getAttribute(name)
  return value == null || value === '' ? undefined : Number(value)
}

const refreshRoot = (el: Element) => {
  const root = el.closest('ark-json-tree-view')
  if (root instanceof JsonTreeViewElement) root.refresh()
}

export class JsonTreeViewTreeElement extends HTMLElement {
  static observedAttributes = ['indent-guide']

  private renderValueFn: JsonTreeViewRenderValue | undefined

  get renderValue(): JsonTreeViewRenderValue | undefined {
    return this.renderValueFn
  }

  set renderValue(value: JsonTreeViewRenderValue | undefined) {
    this.renderValueFn = value
    refreshRoot(this)
  }

  attributeChangedCallback() {
    refreshRoot(this)
  }
}

export class JsonTreeViewElement extends HTMLElement {
  static observedAttributes = [
    'default-expanded-depth',
    'max-preview-items',
    'collapse-strings-after-length',
    'group-arrays-after-length',
    'show-nonenumerable',
    'quotes-on-keys',
    'selection-mode',
  ]

  private dataValue: unknown
  private hasData = false
  private scheduled = false
  private treeView: TreeViewElement | null = null
  private expanded: string[] | undefined
  private observer: MutationObserver | undefined
  private cleanup: VoidFunction | undefined
  private renderCleanup = new AbortController()

  get data(): unknown {
    if (this.hasData) return this.dataValue
    const script = this.querySelector(':scope > script[type="application/json"]')
    if (!script?.textContent) return undefined
    try {
      return JSON.parse(script.textContent)
    } catch {
      return undefined
    }
  }

  set data(value: unknown) {
    this.dataValue = value
    this.hasData = true
    this.refresh()
  }

  get tree(): TreeViewElement | null {
    return this.treeView
  }

  connectedCallback() {
    this.style.display ||= 'block'
    this.observer = new MutationObserver((records) => {
      if (records.some((record) => this.isAuthored(record))) this.refresh()
    })
    this.observer.observe(this, { childList: true, subtree: true, characterData: true })
    const doc = this.ownerDocument
    if (doc.readyState === 'loading') {
      const start = () => this.refresh()
      doc.addEventListener('DOMContentLoaded', start, { once: true })
      this.cleanup = () => doc.removeEventListener('DOMContentLoaded', start)
    } else this.refresh()
  }

  disconnectedCallback() {
    this.observer?.disconnect()
    this.observer = undefined
    this.cleanup?.()
    this.cleanup = undefined
  }

  private isAuthored(record: MutationRecord) {
    const target = record.target instanceof Element ? record.target : record.target.parentElement
    return !target?.closest('ark-tree-view-tree')
  }

  refresh() {
    if (this.scheduled || !this.isConnected || this.ownerDocument.readyState === 'loading') return
    this.scheduled = true
    queueMicrotask(() => {
      this.scheduled = false
      if (this.isConnected) this.render()
    })
  }

  private options(): Partial<JsonNodePreviewOptions> & { quotesOnKeys: boolean } {
    return {
      maxPreviewItems: numberAttr(this, 'max-preview-items'),
      collapseStringsAfterLength: numberAttr(this, 'collapse-strings-after-length'),
      groupArraysAfterLength: numberAttr(this, 'group-arrays-after-length'),
      showNonenumerable: this.hasAttribute('show-nonenumerable'),
      quotesOnKeys: this.hasAttribute('quotes-on-keys'),
    }
  }

  private render() {
    const doc = this.ownerDocument
    const parts = [...this.querySelectorAll<JsonTreeViewTreeElement>('ark-json-tree-view-tree')]
    const authored = parts.find((part) => !part.hasAttribute('data-generated'))
    for (const part of parts) if (authored && part !== authored) part.remove()
    let treePart = authored ?? parts[0]
    if (!treePart) {
      treePart = doc.createElement('ark-json-tree-view-tree')
      treePart.setAttribute('data-generated', '')
    }
    const previous = this.treeView?.isConnected
      ? this.treeView
      : this.querySelector<TreeViewElement>(':scope > ark-tree-view')
    const expanded = this.expanded

    const coll = tree.collection<JsonNode>({ nodeToValue, nodeToString, rootNode: getRootNode(this.data) })
    const options = this.options()
    const arrow = treePart.querySelector<HTMLTemplateElement>(':scope > template[data-arrow]')

    const view = create(doc, 'ark-tree-view') as TreeViewElement
    view.style.display = 'contents'
    const selectionMode = this.getAttribute('selection-mode')
    if (selectionMode) view.setAttribute('selection-mode', selectionMode)
    const depth = numberAttr(this, 'default-expanded-depth')
    const initial = expanded ?? (depth != null ? branchValues(coll, depth) : undefined)
    if (initial) {
      this.expanded = initial.filter((value) => coll.findNode(value))
      view.expandedValue = this.expanded
    }

    const list = create(doc, 'ark-tree-view-tree')
    const nodes = coll.getNodeChildren(coll.rootNode)
    for (const [index, node] of nodes.entries()) {
      list.append(this.renderNode(doc, coll, node, [index], options, arrow, treePart))
    }

    for (const child of [...treePart.childNodes]) {
      if (!(child instanceof HTMLTemplateElement)) child.remove()
    }
    treePart.append(list)
    view.append(treePart)

    this.renderCleanup.abort()
    this.renderCleanup = new AbortController()
    const { signal } = this.renderCleanup
    for (const type of forwardedEvents) {
      view.addEventListener(
        type,
        (event) => {
          const detail = (event as CustomEvent).detail
          if (type === 'expandedchange') this.expanded = detail.expandedValue
          this.dispatchEvent(new CustomEvent(type, { detail, composed: true }))
        },
        { signal },
      )
    }

    if (previous) previous.replaceWith(view)
    else this.append(view)
    this.treeView = view
    this.observer?.takeRecords()
  }

  private renderNode(
    doc: Document,
    coll: Collection,
    node: JsonNode,
    indexPath: number[],
    options: Partial<JsonNodePreviewOptions> & { quotesOnKeys: boolean },
    arrow: HTMLTemplateElement | null,
    treePart: JsonTreeViewTreeElement,
  ): HTMLElement {
    const value = coll.getNodeValue(node)
    const nodeEl = create(doc, 'ark-tree-view-node', {
      'aria-label': getAccessibleDescription(node),
      'data-line': String(indexPath.reduce((sum, index) => sum + index, 1)),
      style: `--line-length: ${indexPath.length - 1}`,
    })
    const cell = create(doc, 'ark-tree-view-cell')
    const text = create(doc, 'ark-tree-view-node-text')

    const key = keyPathToKey(node.keyPath, { excludeRoot: true })
    if (key) {
      const keyEl = doc.createElement('span')
      keyEl.setAttribute('data-kind', 'key')
      if (node.isNonEnumerable) keyEl.setAttribute('data-non-enumerable', '')
      const name = keyPathToKey(node.keyPath)
      keyEl.textContent = options.quotesOnKeys ? `"${name}"` : name
      const colon = doc.createElement('span')
      colon.setAttribute('data-kind', 'colon')
      colon.textContent = ': '
      text.append(keyEl, colon)
    }
    text.append(renderValue(doc, jsonNodeToElement(node, options), treePart.renderValue))

    if (!coll.isBranchNode(node)) {
      nodeEl.setAttribute('value', value)
      cell.append(text)
      nodeEl.append(cell)
      return nodeEl
    }

    const group = create(doc, 'ark-tree-view-node-group', { value })
    if (arrow) {
      const indicator = create(doc, 'ark-tree-view-node-indicator', { type: 'expanded' })
      indicator.append(arrow.content.cloneNode(true))
      cell.append(indicator)
    }
    cell.append(text)
    nodeEl.append(cell)

    const content = create(doc, 'ark-tree-view-node-group-content')
    if (treePart.hasAttribute('indent-guide')) content.append(create(doc, 'ark-tree-view-indent-guide'))
    for (const [index, child] of coll.getNodeChildren(node).entries()) {
      content.append(this.renderNode(doc, coll, child, [...indexPath, index], options, arrow, treePart))
    }

    group.append(nodeEl, content)
    return group
  }
}

if (!customElements.get('ark-json-tree-view')) customElements.define('ark-json-tree-view', JsonTreeViewElement)
if (!customElements.get('ark-json-tree-view-tree')) {
  customElements.define('ark-json-tree-view-tree', JsonTreeViewTreeElement)
}
