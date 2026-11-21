import { normalizeProps, spreadProps, VanillaMachine } from '@zag-js/vanilla'
import { emit, type CallbackEvents, type EventElement } from './events.js'

type Dict = Record<string, any>
type Connect<Api> = (service: any, normalize: typeof normalizeProps) => Api

let uid = 0

const sheet = typeof CSSStyleSheet !== 'undefined' ? new CSSStyleSheet() : null
const rules = new Set<string>()

function adoptDisplay(el: HTMLElement, display: string) {
  // `:where` so page styles win over defaults; `!important` so `hidden` wins over page styles
  for (const rule of [
    `:where(${el.localName}){display:${display}}`,
    `${el.localName}[hidden]:not([hidden=until-found]){display:none!important}`,
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

export interface RootConfig<Api> {
  tag: string
  machine: any
  connect: Connect<Api>
  attributes?: string[]
  /** Rich values and functions assigned directly to the element, never parsed from HTML. */
  properties?: readonly string[]
  propertyChanged?: (el: RootElement<Api>, name: string) => void
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
  class Root extends HTMLElement implements RootElement<Api> {
    static observedAttributes = config.attributes ?? []

    api: Api | undefined
    machineId = ''
    private machine: VanillaMachine<any> | undefined
    private snapshot: Dict | undefined
    private parts = new Set<PartElement<Api>>()
    private cleanups: VoidFunction[] = []
    private rootCleanup: VoidFunction | undefined

    constructor() {
      super()
      // Preserve values written before registration, including on detached elements.
      for (const name of config.properties ?? []) {
        const descriptor = Object.getOwnPropertyDescriptor(this, name)
        if (!descriptor || !('value' in descriptor)) continue
        delete (this as unknown as Dict)[name]
        ;(this as unknown as Dict)[name] = descriptor.value
      }
    }

    connectedCallback() {
      if (this.machine) return
      adoptDisplay(this, config.rootProps && !config.target ? 'block' : 'contents')
      this.machineId = this.id || this.machineId || `ark-${config.tag}-${++uid}`

      const getRootNode = () => this.getRootNode()
      this.machine = new VanillaMachine(config.machine, () => {
        if (this.snapshot) return this.snapshot
        const props: Dict = { id: this.machineId, getRootNode, ...config.props(this), ...properties.get(this) }
        for (const [prop, type] of Object.entries(config.events ?? {})) {
          const callback = props[prop]
          props[prop] = (detail: unknown) => {
            callback?.(detail)
            emit(this, type, detail)
          }
        }
        this.snapshot = props
        return props
      })

      const setupCleanup = config.setup?.(this)
      this.snapshot = undefined
      if (setupCleanup) this.cleanups.push(setupCleanup)

      this.cleanups.push(this.machine.subscribe(() => this.render()))
      // Parts render the initial state first; effects that query them run once they're in place
      this.render()
      const machine = this.machine
      const start = () => {
        if (this.machine !== machine) return
        machine.start()
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
      this.rootCleanup?.()
      this.rootCleanup = undefined
      this.machine?.stop()
      this.machine = undefined
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
      const target = config.target ? config.target(this) : this
      if (config.rootProps && target) this.rootCleanup = spreadProps(target, config.rootProps(api), this.machineId)
      config.render?.(api, this)
      for (const part of this.parts) part.update(api)
    }
  }

  for (const name of config.properties ?? []) {
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
    private cleanup: VoidFunction | undefined
    private setupCleanup: VoidFunction | void = undefined

    connectedCallback() {
      adoptDisplay(this, config.display ?? (config.target ? 'contents' : 'block'))
      // Connect in the same task when possible, so no style is computed before the props land
      if (customElements.get(config.root)) this.connect()
      else customElements.whenDefined(config.root).then(() => this.connect())
    }

    private connect() {
      // A part moved before its root is defined has two pending callbacks
      if (!this.isConnected || this.rootEl) return
      this.rootEl = this.closest<RootElement<Api> & HTMLElement>(config.root)
      if (!this.rootEl) return
      this.setupCleanup = config.setup?.(this, this.rootEl)
      this.rootEl.register(this)
    }

    disconnectedCallback() {
      this.setupCleanup?.()
      this.setupCleanup = undefined
      this.cleanup?.()
      this.rootEl?.unregister(this)
      this.rootEl = null
    }

    update(api: Api) {
      const target = config.target?.(this) ?? this
      if (!this.rootEl) return
      this.cleanup = spreadProps(target, config.props(api, this), this.rootEl.machineId)
      config.render?.(api, this)
    }
  }

  if (!customElements.get(config.tag)) customElements.define(config.tag, Part)
  return Part
}
