import { createSharedMutationObserver } from '@zag-js/dom-query'
import { normalizeProps, spreadProps, VanillaMachine } from '@zag-js/vanilla'
import { debug, traceState } from './debug.js'
import { emit, silently, trackInput, type CallbackEvents, type EventElement } from './events.js'

type Dict = Record<string, any>
type Connect<Api> = (service: any, normalize: typeof normalizeProps) => Api

let uid = 0

const sheets = new WeakMap<Document, { sheet: CSSStyleSheet; rules: Set<string> }>()

function sheetOf(doc: Document) {
  let entry = sheets.get(doc)
  const Sheet = (doc.defaultView as (Window & typeof globalThis) | null)?.CSSStyleSheet
  if (!entry && Sheet) {
    entry = { sheet: new Sheet(), rules: new Set() }
    sheets.set(doc, entry)
  }
  return entry
}

export function adoptDisplay(el: HTMLElement, display: string) {
  const entry = sheetOf(el.ownerDocument)
  const sheet = entry?.sheet
  // `:where` so page styles win over defaults; `!important` so `hidden` wins over page styles
  for (const rule of [
    `:where(${el.localName}){display:${display}}`,
    `:where(${el.localName}[as-child]){display:contents}`,
    `${el.localName}[hidden]:not([hidden=until-found]){display:none!important}`,
    `[as-child]>[hidden]:not([hidden=until-found]){display:none!important}`,
  ]) {
    if (!entry || entry.rules.has(rule)) continue
    entry.rules.add(rule)
    entry.sheet.insertRule(rule, entry.sheet.cssRules.length)
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

const childObserver = createSharedMutationObserver({ childList: true })
const rootObserver = createSharedMutationObserver({ childList: true, subtree: true, attributeFilter: ['id', 'for'] })

function observeChild(el: HTMLElement, onChange: VoidFunction): VoidFunction | undefined {
  if (!el.hasAttribute('as-child')) return
  return childObserver.observe(el, onChange)
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
  set: (api: Api, value: any, el: RootElement<Api>) => void
}

export type StateProperties<Props, Keys extends keyof Props> = {
  -readonly [Key in Keys]-?: Exclude<Props[Key], undefined>
}

export type ActionMethods<Api, Names extends keyof Api> = {
  [Name in Names]: Api[Name] extends (...args: infer Args) => any ? (...args: Args) => void : never
}

type Action<Api> = (api: Api, ...args: any[]) => void

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
  actions?: Record<string, Action<Api>>
  props: (el: RootElement<Api>) => Dict
  events?: Record<string, string>
  rootProps?: (api: Api) => Dict
  target?: (el: HTMLElement) => HTMLElement | null
  setup?: (el: RootElement<Api>) => VoidFunction | void
  started?: (el: RootElement<Api>) => VoidFunction | void
  render?: (api: Api, el: RootElement<Api>) => void
}

function deferred() {
  let resolve!: VoidFunction
  const promise = new Promise<void>((done) => {
    resolve = done
  })

  return { promise, resolve }
}

/** Any `ark-*` element. Roots and parts expose their machine state through `state`. */
export interface ArkElement extends HTMLElement {
  readonly state?: object | undefined
}

declare global {
  interface HTMLElementTagNameMap {
    [tag: `ark-${string}`]: ArkElement
  }
}

export interface ElementMeta {
  kind: 'root' | 'part'
  root?: string
  attributes?: readonly string[]
  events?: readonly string[]
  properties?: readonly string[]
  methods?: readonly string[]
}

export type RootState<Api> = Api extends { getRootState(): infer State } ? State : undefined

const rootStateOf = <Api>(api: Api | undefined) =>
  (api as { getRootState?: () => unknown } | undefined)?.getRootState?.() as RootState<Api> | undefined

export interface RootElement<Api = Dict, Props extends object = {}> extends EventElement<CallbackEvents<Props>> {
  readonly api: Api | undefined
  /** The root's state from its machine (`getRootState()`), such as `open` or `disabled`. `undefined` until it connects. */
  readonly state: RootState<Api> | undefined
  /** Resolves once the element's machine has started, so `api`, state and parts are in place. */
  readonly ready: Promise<void>
  readonly machineId: string
  readonly service: VanillaMachine<any>['service'] | undefined
  refresh(): void
  render(): void
  register(part: PartElement<Api, unknown>): void
  unregister(part: PartElement<Api, unknown>): void
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

    static meta: ElementMeta = {
      kind: 'root',
      attributes: config.attributes ?? [],
      events: Object.values(config.events ?? {}),
      properties: [...propertyNames, ...Object.keys(config.state ?? {})],
      methods: Object.keys(config.actions ?? {}),
    }

    api: Api | undefined
    machineId = ''
    private machine: VanillaMachine<any> | undefined
    private snapshot: Dict | undefined
    private parts = new Set<PartElement<Api, unknown>>()
    private cleanups: VoidFunction[] = []
    private rootTarget = new Target()
    private started = false
    private assigned = new Map<string, unknown>()
    private pending: Array<(api: Api) => void> = []
    private readiness = deferred()

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
        const own = config.props(this)
        const assigned = machineProperties(this)
        const props: Dict = { id: this.machineId, getRootNode, ...own, ...assigned }
        // Assigned ids add to the ids a root derives, such as the ones an enclosing field supplies
        if (own.ids && assigned.ids) props.ids = { ...own.ids, ...assigned.ids }
        for (const [prop, type] of Object.entries(config.events ?? {})) {
          const callback = props[prop]
          props[prop] = (detail: unknown) => {
            callback?.(detail)
            debug(this, `event ${type}`, detail)
            emit(this, type, detailOf(prop, detail))
          }
        }
        this.snapshot = props
        debug(this, 'props', props)
        return props
      })

      const setupCleanup = config.setup?.(this)
      this.snapshot = undefined
      if (setupCleanup) this.cleanups.push(setupCleanup)
      const unobserve = observeChild(this, () => this.render())
      if (unobserve) this.cleanups.push(unobserve)

      const trace = traceState(this, () => this.machine?.service.state.get())
      this.cleanups.push(
        this.machine.subscribe(() => {
          trace()
          this.render()
        }),
      )
      // Parts render the initial state first; effects that query them run once they're in place
      this.render()
      const machine = this.machine
      const start = () => {
        if (this.machine !== machine) return
        machine.start()
        this.started = true
        for (const [name, value] of this.assigned) this.writeState(name, value)
        for (const run of this.pending.splice(0)) run(this.api!)
        this.readiness.resolve()
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

    get state() {
      return rootStateOf(this.api)
    }

    get ready() {
      return this.readiness.promise
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
      this.pending = []
      this.readiness = deferred()
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

      silently(this, () => config.state![name].set(api, value, this))

      queueMicrotask(() => {
        if (Object.is(this.assigned.get(name), value)) this.assigned.delete(name)
      })
    }

    whenStarted(run: (api: Api) => void) {
      if (this.started && this.api) run(this.api)
      else this.pending.push(run)
    }

    register(part: PartElement<Api, unknown>) {
      this.parts.add(part)
      if (this.api) part.update(this.api)
    }

    unregister(part: PartElement<Api, unknown>) {
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

  for (const [name, action] of Object.entries(config.actions ?? {})) {
    Object.defineProperty(Root.prototype, name, {
      configurable: true,
      value(this: Root, ...args: unknown[]) {
        this.whenStarted((api) => action(api, ...args))
      },
    })
  }

  if (!customElements.get(config.tag)) customElements.define(config.tag, Root)
  return Root
}

export interface PartConfig<Api, State = RootState<Api>> {
  tag: string
  root: string
  /** Attributes the part reads from itself, for the custom elements manifest. */
  attributes?: string[]
  props: (api: Api, el: HTMLElement) => Dict
  /** The part's machine state. Without it the part reports its root's state. */
  state?: (api: Api, el: HTMLElement) => State
  target?: (el: HTMLElement) => HTMLElement | null
  display?: string
  render?: (api: Api, el: HTMLElement) => void
  setup?: (el: PartElement<Api, State>, root: RootElement<Api>) => VoidFunction | void
}

export interface PartElement<Api = Dict, State = RootState<Api>> extends HTMLElement {
  /** The part's state from its machine, such as an item's `selected` and `highlighted`. `undefined` until it connects. */
  readonly state: State | undefined
  update(api: Api): void
}

export const wrapped = (selector: string) => (el: HTMLElement) =>
  el.querySelector<HTMLElement>(`:scope > :is(${selector})`)
export const wrappedButton = wrapped('button, a')

export const ownInput = (el: HTMLElement) =>
  el.querySelector<HTMLInputElement>(':scope > input') ?? el.appendChild(document.createElement('input'))

export function definePart<Api, State = RootState<Api>>(
  config: PartConfig<Api, State>,
): { new (): PartElement<Api, State> } {
  class Part extends HTMLElement implements PartElement<Api, State> {
    static meta: ElementMeta = { kind: 'part', root: config.root, attributes: config.attributes ?? [] }

    private rootEl: RootElement<Api> | null = null
    private target = new Target()
    private setupCleanup: VoidFunction | undefined = undefined
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

      this.setupCleanup = config.setup?.(this, this.rootEl) || undefined
      this.unobserve = observeChild(this, () => {
        if (this.rootEl?.api) this.update(this.rootEl.api)
      })
      this.rootEl.register(this)
    }

    private waitForRoot() {
      if (this.unwait || !this.closest('[for]')) return

      this.unwait = rootObserver.observe(this.getRootNode(), () => {
        if (!rootOf(this, config.root)) return
        this.stopWaiting()
        this.connect()
      })
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

    get state(): State | undefined {
      const api = this.rootEl?.api
      if (!api) return undefined
      return config.state ? config.state(api, this) : (rootStateOf(api) as State)
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
