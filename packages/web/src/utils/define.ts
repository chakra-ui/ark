import { normalizeProps, spreadProps, VanillaMachine } from '@zag-js/vanilla'

import { emit, silently, trackInput, type CallbackEvents, type EventElement } from './events.js'

type Dict = Record<string, any>
type Connect<Api> = (service: any, normalize: typeof normalizeProps) => Api

let uid = 0

const sheet = typeof CSSStyleSheet !== 'undefined' ? new CSSStyleSheet() : null
const rules = new Set<string>()

function adoptDisplay(el: HTMLElement, display: string) {
  // `:where` so page styles win over defaults; `!important` so `hidden` wins over page styles
  for (const rule of [
    `:where(${el.localName}){display:${display}}`,
    `:where(${el.localName}[as-child]){display:contents}`,
    `${el.localName}[hidden]:not([hidden=until-found]){display:none!important}`,
    `[as-child]>[hidden]:not([hidden=until-found]){display:none!important}`,
  ]) {
    if (!sheet || rules.has(rule)) continue
    rules.add(rule)
    sheet.insertRule(rule, sheet.cssRules.length)
  }
  const root = el.getRootNode() as Document | ShadowRoot
  if (sheet && 'adoptedStyleSheets' in root && !root.adoptedStyleSheets.includes(sheet)) {
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet]
  }
}

/** With `as-child`, the first element child (skipping `template` and `script`) receives the part's props. */
export const asChild = (el: HTMLElement) =>
  el.hasAttribute('as-child') ? el.querySelector<HTMLElement>(':scope > :not(template, script)') : null

export const targetOf = (el: HTMLElement, target?: (el: HTMLElement) => HTMLElement | null) =>
  asChild(el) ?? target?.(el) ?? el

function observeChild(el: HTMLElement, onChange: VoidFunction): VoidFunction | undefined {
  if (!el.hasAttribute('as-child')) return
  const observer = new MutationObserver(onChange)
  observer.observe(el, { childList: true })
  return () => observer.disconnect()
}

class Target {
  private node: HTMLElement | null = null
  private cleanup: VoidFunction | undefined

  spread(node: HTMLElement, props: Dict, scope: string) {
    if (node !== this.node) this.release(scope)
    this.node = node
    this.cleanup = spreadProps(node, props, scope)
  }

  /** Strips the previous node's props when the target changes. */
  release(scope: string) {
    if (this.node) spreadProps(this.node, {}, scope)
    this.detach()
  }

  detach() {
    this.cleanup?.()
    this.cleanup = undefined
    this.node = null
  }
}

export interface StateProperty<Api> {
  get: (api: Api) => unknown
  set: (api: Api, value: any) => void
}

export type StateProperties<Props, Keys extends keyof Props> = {
  -readonly [Key in Keys]-?: Exclude<Props[Key], undefined>
}

const isBareValue = (value: unknown) => ['boolean', 'number', 'string'].includes(typeof value)

const detailKey = (prop: string) => {
  const name = prop.slice(2).replace(/Change$/, '')
  return name.charAt(0).toLowerCase() + name.slice(1)
}

const detailOf = (prop: string, detail: unknown) => (isBareValue(detail) ? { [detailKey(prop)]: detail } : detail)

function forTarget(el: Element, tag: string): Element | null {
  const id = el.getAttribute('for')
  if (!id) return null

  const scope = el.getRootNode() as Partial<Document>
  const target = scope.getElementById?.(id)

  return target?.localName === tag ? target : null
}

export function rootOf<T extends Element = HTMLElement>(part: Element, tag: string): T | null {
  for (let el: Element | null = part; el; el = el.parentElement) {
    if (el.localName === tag) return el as T

    const target = forTarget(el, tag)
    if (target) return target as T
  }

  return null
}

export interface RootConfig<Api> {
  tag: string
  machine: any
  connect: Connect<Api>
  attributes?: string[]
  /** Rich values and functions assigned directly to the element, never parsed from HTML. */
  properties?: readonly string[]
  ownProperties?: readonly string[]
  propertyChanged?: (el: RootElement<Api>, name: string) => void
  state?: Record<string, StateProperty<Api>>
  props: (el: RootElement<Api>) => Dict
  events?: Record<string, string>
  rootProps?: (api: Api) => Dict
  target?: (el: HTMLElement) => HTMLElement | null
  setup?: (el: RootElement<Api>) => VoidFunction | void
  started?: (el: RootElement<Api>) => VoidFunction | void
  render?: (api: Api, el: RootElement<Api>) => void
}

export interface RootElement<Api = Dict, Props extends object = {}> extends EventElement<CallbackEvents<Props>> {
  readonly api: Api | undefined
  readonly machineId: string
  readonly service: VanillaMachine<any>['service'] | undefined
  refresh(): void
  render(): void
  register(part: PartElement<Api>): void
  unregister(part: PartElement<Api>): void
}

export function defineRoot<Api>(config: RootConfig<Api>): { new (): RootElement<Api> } {
  const properties = new WeakMap<HTMLElement, Dict>()
  const propertyNames = [...(config.properties ?? []), ...(config.ownProperties ?? [])]

  const machineProperties = (el: HTMLElement) => {
    const values = { ...properties.get(el) }
    for (const name of config.ownProperties ?? []) delete values[name]
    return values
  }

  class Root extends HTMLElement implements RootElement<Api> {
    static observedAttributes = config.attributes ?? []

    api: Api | undefined
    machineId = ''
    private machine: VanillaMachine<any> | undefined
    private snapshot: Dict | undefined
    private parts = new Set<PartElement<Api>>()
    private cleanups: VoidFunction[] = []
    private rootTarget = new Target()
    private started = false
    private assigned = new Map<string, unknown>()

    constructor() {
      super()
      // Preserve values written before registration, including on detached elements.
      for (const name of [...propertyNames, ...Object.keys(config.state ?? {})]) {
        const descriptor = Object.getOwnPropertyDescriptor(this, name)
        if (!descriptor || !('value' in descriptor)) continue
        delete (this as unknown as Dict)[name]
        ;(this as unknown as Dict)[name] = descriptor.value
      }
    }

    connectedCallback() {
      if (this.machine) return
      adoptDisplay(this, config.rootProps && !config.target ? 'block' : 'contents')
      trackInput(this.ownerDocument)
      this.machineId = this.id || this.machineId || `ark-${config.tag}-${++uid}`

      const getRootNode = () => this.getRootNode()
      this.machine = new VanillaMachine(config.machine, () => {
        if (this.snapshot) return this.snapshot
        const props: Dict = { id: this.machineId, getRootNode, ...config.props(this), ...machineProperties(this) }
        for (const [prop, type] of Object.entries(config.events ?? {})) {
          const callback = props[prop]
          props[prop] = (detail: unknown) => {
            callback?.(detail)
            emit(this, type, detailOf(prop, detail))
          }
        }
        this.snapshot = props
        return props
      })

      const setupCleanup = config.setup?.(this)
      this.snapshot = undefined
      if (setupCleanup) this.cleanups.push(setupCleanup)
      const unobserve = observeChild(this, () => this.render())
      if (unobserve) this.cleanups.push(unobserve)

      this.cleanups.push(this.machine.subscribe(() => this.render()))
      // Parts render the initial state first; effects that query them run once they're in place
      this.render()
      const machine = this.machine
      const start = () => {
        if (this.machine !== machine) return
        machine.start()
        this.started = true
        for (const [name, value] of this.assigned) this.writeState(name, value)
        const cleanup = config.started?.(this)
        if (cleanup) this.cleanups.push(cleanup)
        this.render()
      }
      const doc = this.ownerDocument
      if (doc.readyState === 'loading') {
        doc.addEventListener('DOMContentLoaded', start, { once: true })
        this.cleanups.push(() => doc.removeEventListener('DOMContentLoaded', start))
      } else queueMicrotask(start)
    }

    get service() {
      return this.machine?.service
    }

    disconnectedCallback() {
      for (const cleanup of this.cleanups.splice(0)) cleanup()
      this.rootTarget.detach()
      this.machine?.stop()
      this.machine = undefined
      this.started = false
      this.snapshot = undefined
      this.api = undefined
    }

    attributeChangedCallback() {
      this.refresh()
    }

    refresh() {
      this.snapshot = undefined
      this.machine?.updateProps({})
    }

    readState(name: string) {
      if (this.assigned.has(name)) return this.assigned.get(name)
      return this.api ? config.state![name].get(this.api) : undefined
    }

    writeState(name: string, value: unknown) {
      this.assigned.set(name, value)

      const api = this.api
      if (!this.started || !api) return

      silently(this, () => config.state![name].set(api, value))

      queueMicrotask(() => {
        if (Object.is(this.assigned.get(name), value)) this.assigned.delete(name)
      })
    }

    register(part: PartElement<Api>) {
      this.parts.add(part)
      if (this.api) part.update(this.api)
    }

    unregister(part: PartElement<Api>) {
      this.parts.delete(part)
    }

    render() {
      if (!this.machine) return
      const api = config.connect(this.machine.service, normalizeProps)
      this.api = api
      const target = asChild(this) ?? (config.target ? config.target(this) : this)
      if (config.rootProps && target) this.rootTarget.spread(target, config.rootProps(api), this.machineId)
      config.render?.(api, this)
      for (const part of this.parts) part.update(api)
    }
  }

  for (const name of propertyNames) {
    Object.defineProperty(Root.prototype, name, {
      configurable: true,
      get(this: Root) {
        return properties.get(this)?.[name]
      },
      set(this: Root, value: unknown) {
        let values = properties.get(this)
        if (Object.is(values?.[name], value)) return
        if (!values) {
          values = {}
          properties.set(this, values)
        }
        if (value === undefined) delete values[name]
        else values[name] = value
        if (this.service) config.propertyChanged?.(this, name)
        this.refresh()
        this.render()
      },
    })
  }

  for (const name of Object.keys(config.state ?? {})) {
    Object.defineProperty(Root.prototype, name, {
      configurable: true,
      get(this: Root) {
        return this.readState(name)
      },
      set(this: Root, value: unknown) {
        this.writeState(name, value)
      },
    })
  }

  if (!customElements.get(config.tag)) customElements.define(config.tag, Root)
  return Root
}

export interface PartConfig<Api> {
  tag: string
  root: string
  props: (api: Api, el: HTMLElement) => Dict
  target?: (el: HTMLElement) => HTMLElement | null
  display?: string
  render?: (api: Api, el: HTMLElement) => void
  setup?: (el: PartElement<Api>, root: RootElement<Api>) => VoidFunction | void
}

export interface PartElement<Api = Dict> extends HTMLElement {
  update(api: Api): void
}

export const wrapped = (selector: string) => (el: HTMLElement) =>
  el.querySelector<HTMLElement>(`:scope > :is(${selector})`)
export const wrappedButton = wrapped('button, a')

export const ownInput = (el: HTMLElement) =>
  el.querySelector<HTMLInputElement>(':scope > input') ?? el.appendChild(document.createElement('input'))

export function definePart<Api>(config: PartConfig<Api>): { new (): PartElement<Api> } {
  class Part extends HTMLElement implements PartElement<Api> {
    private rootEl: RootElement<Api> | null = null
    private target = new Target()
    private setupCleanup: VoidFunction | void = undefined
    private unobserve: VoidFunction | undefined
    private unwait: VoidFunction | undefined

    connectedCallback() {
      adoptDisplay(this, config.display ?? (config.target ? 'contents' : 'block'))
      // Connect in the same task when possible, so no style is computed before the props land
      if (customElements.get(config.root)) this.connect()
      else customElements.whenDefined(config.root).then(() => this.connect())
    }

    private connect() {
      // A part moved before its root is defined has two pending callbacks
      if (!this.isConnected || this.rootEl) return

      this.rootEl = rootOf<RootElement<Api> & HTMLElement>(this, config.root)
      if (!this.rootEl) return this.waitForRoot()

      this.setupCleanup = config.setup?.(this, this.rootEl)
      this.unobserve = observeChild(this, () => {
        if (this.rootEl?.api) this.update(this.rootEl.api)
      })
      this.rootEl.register(this)
    }

    private waitForRoot() {
      if (this.unwait || !this.closest('[for]')) return

      const observer = new MutationObserver(() => {
        if (!rootOf(this, config.root)) return
        this.stopWaiting()
        this.connect()
      })

      observer.observe(this.getRootNode(), { childList: true, subtree: true, attributeFilter: ['id', 'for'] })
      this.unwait = () => observer.disconnect()
    }

    private stopWaiting() {
      this.unwait?.()
      this.unwait = undefined
    }

    disconnectedCallback() {
      this.stopWaiting()
      this.setupCleanup?.()
      this.setupCleanup = undefined
      this.unobserve?.()
      this.unobserve = undefined
      this.target.detach()
      this.rootEl?.unregister(this)
      this.rootEl = null
    }

    update(api: Api) {
      if (!this.rootEl) return
      this.target.spread(targetOf(this, config.target), config.props(api, this), this.rootEl.machineId)
      config.render?.(api, this)
    }
  }

  if (!customElements.get(config.tag)) customElements.define(config.tag, Part)
  return Part
}
