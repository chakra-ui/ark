import { trapFocus, type FocusTrapOptions } from '@zag-js/focus-trap'

import { adoptDisplay } from '../../utils/define.js'
import { emit } from '../../utils/events.js'

export type FocusTrapTarget = NonNullable<FocusTrapOptions['initialFocus']>
export type FocusTrapFallback = NonNullable<FocusTrapOptions['fallbackFocus']>
export type FocusTrapReturnTarget = NonNullable<FocusTrapOptions['setReturnFocus']>
export type FocusTrapPersistentElements = NonNullable<FocusTrapOptions['persistentElements']>

type Deactivate = ReturnType<typeof trapFocus>

export class FocusTrapElement extends HTMLElement {
  static observedAttributes = [
    'disabled',
    'initial-focus',
    'fallback-focus',
    'return-focus-on-deactivate',
    'set-return-focus',
  ]

  static meta = {
    kind: 'element',
    attributes: FocusTrapElement.observedAttributes,
    events: ['activate', 'deactivate'],
    properties: ['initialFocus', 'fallbackFocus', 'setReturnFocus', 'persistentElements'],
  }

  initialFocus: FocusTrapTarget | undefined
  fallbackFocus: FocusTrapFallback | undefined
  setReturnFocus: FocusTrapReturnTarget | undefined
  persistentElements: FocusTrapPersistentElements | undefined

  #deactivate: Deactivate | undefined
  #active = false

  get disabled(): boolean {
    return this.hasAttribute('disabled')
  }

  set disabled(disabled: boolean) {
    this.toggleAttribute('disabled', disabled)
  }

  get returnFocusOnDeactivate(): boolean {
    return this.getAttribute('return-focus-on-deactivate') !== 'false'
  }

  set returnFocusOnDeactivate(value: boolean) {
    this.setAttribute('return-focus-on-deactivate', String(value))
  }

  get active(): boolean {
    return this.#active
  }

  connectedCallback() {
    adoptDisplay(this, 'block')
    this.#sync()
  }

  disconnectedCallback() {
    this.#stop()
  }

  attributeChangedCallback(name: string) {
    if (name === 'disabled') this.#sync()
  }

  #sync() {
    if (this.isConnected && !this.disabled) this.#start()
    else this.#stop()
  }

  #start() {
    if (this.#deactivate) return
    this.#deactivate = trapFocus(this, this.#options())
  }

  #stop() {
    const deactivate = this.#deactivate
    this.#deactivate = undefined
    deactivate?.({ returnFocus: this.returnFocusOnDeactivate })
  }

  #options() {
    const options: FocusTrapOptions = {
      initialFocus: this.initialFocus ?? this.#initialFocusNode,
      returnFocusOnDeactivate: this.returnFocusOnDeactivate,
      onActivate: () => {
        this.#active = true
        emit(this, 'activate')
      },
      onDeactivate: () => {
        this.#active = false
        emit(this, 'deactivate')
      },
    }

    const fallback = this.getAttribute('fallback-focus')
    const returnTarget = this.getAttribute('set-return-focus')

    if (this.fallbackFocus) options.fallbackFocus = this.fallbackFocus
    else if (fallback) options.fallbackFocus = () => this.querySelector<HTMLElement>(fallback) ?? this

    if (this.setReturnFocus !== undefined) options.setReturnFocus = this.setReturnFocus
    else if (returnTarget) {
      options.setReturnFocus = (previous) => this.ownerDocument.querySelector<HTMLElement>(returnTarget) ?? previous
    }

    if (this.persistentElements) options.persistentElements = this.persistentElements

    return options
  }

  #initialFocusNode = () => {
    const selector = this.getAttribute('initial-focus')
    const node =
      (selector && this.querySelector<HTMLElement>(selector)) || this.querySelector<HTMLElement>('[autofocus]')
    return node ?? (undefined as unknown as false)
  }
}

if (!customElements.get('ark-focus-trap')) customElements.define('ark-focus-trap', FocusTrapElement)
