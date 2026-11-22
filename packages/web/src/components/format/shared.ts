import { getDefaultLocale } from '@zag-js/i18n-utils'

import { localeOf } from '../../utils/locale.js'

type Kind = 'string' | 'number' | 'boolean'

const camel = (name: string) => name.replace(/-(\w)/g, (_, char: string) => char.toUpperCase())

function read(el: Element, name: string, kind: Kind) {
  const value = el.getAttribute(name)
  if (kind === 'boolean') return value == null ? undefined : value !== 'false'
  if (value == null) return undefined
  if (kind === 'string') return value

  const number = Number(value)
  return Number.isNaN(number) ? undefined : number
}

export abstract class FormatElement<Value, Options extends object> extends HTMLElement {
  static options: Record<string, Kind> = {}

  static get observedAttributes() {
    return ['value', 'locale', ...Object.keys(this.options)]
  }

  static get meta() {
    return { kind: 'element', attributes: this.observedAttributes }
  }

  #value: Value | undefined
  #options: Options | undefined

  protected abstract parse(value: string): Value | undefined

  protected abstract format(value: Value, locale: string, options: Options): string | null

  get value(): Value | undefined {
    if (this.#value !== undefined) return this.#value

    const value = this.getAttribute('value')
    return value == null ? undefined : this.parse(value)
  }

  set value(value: Value | undefined) {
    this.#value = value
    this.#render()
  }

  get options(): Options {
    const kinds = (this.constructor as typeof FormatElement).options
    const options: Record<string, unknown> = {}

    for (const [name, kind] of Object.entries(kinds)) {
      const value = read(this, name, kind)
      if (value !== undefined) options[camel(name)] = value
    }

    return { ...options, ...this.#options } as Options
  }

  set options(options: Options | undefined) {
    this.#options = options
    this.#render()
  }

  get locale(): string {
    return this.getAttribute('locale') ?? localeOf(this) ?? getDefaultLocale().locale
  }

  set locale(locale: string | null) {
    if (locale == null) this.removeAttribute('locale')
    else this.setAttribute('locale', locale)
  }

  get text(): string {
    const value = this.value
    return value === undefined ? '' : (this.format(value, this.locale, this.options) ?? '')
  }

  connectedCallback() {
    this.#render()
  }

  attributeChangedCallback() {
    this.#render()
  }

  #render() {
    if (this.isConnected) this.textContent = this.text
  }
}

export function define(tag: string, element: CustomElementConstructor) {
  if (!customElements.get(tag)) customElements.define(tag, element)
}
