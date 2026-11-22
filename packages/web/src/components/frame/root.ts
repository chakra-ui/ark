import { adoptDisplay } from '../../utils/define.js'
import { emit } from '../../utils/events.js'

export type FrameHead = string | Node | null | undefined

const resetStyle = '<style>*,*::before,*::after { margin: 0; padding: 0; box-sizing: border-box; }</style>'

const initialSrcDoc = `<html><head>${resetStyle}</head><body><div class="frame-root"></div></body></html>`

const isOwnNode = (node: Node) =>
  node instanceof HTMLIFrameElement || (node instanceof HTMLTemplateElement && node.getAttribute('slot') === 'head')

export class FrameElement extends HTMLElement {
  static observedAttributes = ['srcdoc']

  static meta = {
    kind: 'element',
    attributes: FrameElement.observedAttributes,
    events: ['mount', 'unmount'],
    properties: ['head', 'srcdoc', 'iframe', 'contentDocument', 'mountNode'],
  }

  #head: FrameHead
  #nodes: ChildNode[] = []
  #mountNode: HTMLElement | null = null
  #headNodes: Node[] = []
  #cleanups: VoidFunction[] = []
  #unobserve: VoidFunction | undefined
  #mounted = false

  get srcdoc(): string {
    return this.getAttribute('srcdoc') ?? initialSrcDoc
  }

  set srcdoc(value: string | null) {
    if (value == null) this.removeAttribute('srcdoc')
    else this.setAttribute('srcdoc', value)
  }

  get head(): FrameHead {
    return this.#head
  }

  set head(value: FrameHead) {
    this.#head = value
    this.#renderHead()
  }

  get iframe(): HTMLIFrameElement | null {
    return this.querySelector<HTMLIFrameElement>(':scope > iframe')
  }

  get contentDocument(): Document | null {
    return this.iframe?.contentDocument ?? null
  }

  get mountNode(): HTMLElement | null {
    return this.#mountNode
  }

  connectedCallback() {
    adoptDisplay(this, 'contents')
    const doc = this.ownerDocument

    if (doc.readyState !== 'loading') {
      this.#connect()
      return
    }

    const start = () => this.isConnected && this.#connect()
    doc.addEventListener('DOMContentLoaded', start, { once: true })
    this.#cleanups.push(() => doc.removeEventListener('DOMContentLoaded', start))
  }

  disconnectedCallback() {
    for (const cleanup of this.#cleanups.splice(0)) cleanup()
    this.#unobserve?.()
    this.#unobserve = undefined
    this.append(...this.#nodes.splice(0))
    this.#mountNode = null
    if (!this.#mounted) return
    this.#mounted = false
    emit(this, 'unmount')
  }

  attributeChangedCallback() {
    if (this.#mountNode) this.#render()
  }

  #connect() {
    let iframe = this.iframe

    if (!iframe) {
      iframe = this.ownerDocument.createElement('iframe')
      iframe.title = 'Frame'
      this.prepend(iframe)
    }

    this.#nodes.push(...Array.from(this.childNodes).filter((node) => !isOwnNode(node)))

    const frame = iframe
    const onLoad = () => {
      if (!this.#mountNode || this.#mountNode.ownerDocument !== frame.contentDocument) this.#render()
    }
    frame.addEventListener('load', onLoad)
    this.#cleanups.push(() => frame.removeEventListener('load', onLoad))

    const observer = new MutationObserver((records) => {
      const added = records.flatMap((record) => Array.from(record.addedNodes)) as ChildNode[]
      const nodes = added.filter((node) => node.parentNode === this && !isOwnNode(node))
      if (nodes.length === 0) return
      this.#nodes.push(...nodes)
      this.#mountNode?.append(...nodes)
    })
    observer.observe(this, { childList: true })
    this.#cleanups.push(() => observer.disconnect())

    this.#render()
  }

  #render() {
    const iframe = this.iframe
    const doc = iframe?.contentDocument
    if (!iframe || !doc) return

    doc.open()
    doc.write(this.srcdoc)
    doc.close()

    const mountNode = doc.body.querySelector<HTMLElement>('.frame-root') ?? doc.body
    this.#mountNode = mountNode
    this.#headNodes = []
    this.#renderHead()
    mountNode.append(...this.#nodes)
    this.#observeSize(iframe, mountNode)

    if (this.#mounted) return
    this.#mounted = true
    emit(this, 'mount')
  }

  #renderHead() {
    const doc = this.#mountNode?.ownerDocument
    if (!doc) return

    for (const node of this.#headNodes.splice(0)) node.parentNode?.removeChild(node)

    const template = this.querySelector<HTMLTemplateElement>(':scope > template[slot="head"]')
    const nodes: Node[] = template ? Array.from(doc.importNode(template.content, true).childNodes) : []
    const head = this.#head

    if (typeof head === 'string') {
      const range = doc.createRange()
      range.selectNodeContents(doc.head)
      nodes.push(...Array.from(range.createContextualFragment(head).childNodes))
    } else if (head) nodes.push(doc.importNode(head, true))

    this.#headNodes = nodes
    doc.head.append(...nodes)
  }

  #observeSize(iframe: HTMLIFrameElement, mountNode: HTMLElement) {
    this.#unobserve?.()
    this.#unobserve = undefined

    const win = mountNode.ownerDocument.defaultView as (Window & typeof globalThis) | null
    if (!win?.ResizeObserver) return

    const update = () => {
      iframe.style.setProperty('--width', `${mountNode.scrollWidth}px`)
      iframe.style.setProperty('--height', `${mountNode.scrollHeight}px`)
    }

    const observer = new win.ResizeObserver(() => win.requestAnimationFrame(update))
    observer.observe(mountNode)
    update()
    this.#unobserve = () => observer.disconnect()
  }
}

if (!customElements.get('ark-frame')) customElements.define('ark-frame', FrameElement)
