import * as checkbox from '@zag-js/checkbox'
import { list, num, str } from '../../utils/attrs.js'
import type { RootElement } from '../../utils/define.js'
import { emit } from '../../utils/events.js'
import { fieldsetOf } from '../../utils/field.js'
export const root = 'ark-checkbox'

const groupTag = 'ark-checkbox-group'

const groupPart = checkbox.anatomy.extendWith('group').build().group

export const checkedOf = (el: Element): checkbox.CheckedState | undefined => {
  const value = el.getAttribute('checked')
  if (value == null) return undefined
  return value === 'indeterminate' ? 'indeterminate' : value !== 'false'
}

class CheckboxGroup extends HTMLElement {
  static observedAttributes = ['value', 'name', 'disabled', 'invalid', 'readonly', 'max-selected']

  private uncontrolled: string[] | undefined

  connectedCallback() {
    this.setAttribute('role', 'group')
    for (const [name, value] of Object.entries(groupPart.attrs(this.id))) this.setAttribute(name, value)
    this.addEventListener('checkedchange', this.onCheckedChange, { capture: true })
  }

  disconnectedCallback() {
    this.removeEventListener('checkedchange', this.onCheckedChange, { capture: true })
  }

  attributeChangedCallback() {
    for (const item of this.querySelectorAll<RootElement>(root)) item.refresh?.()
  }

  get value() {
    return this.hasAttribute('value') ? (list(this, 'value') ?? []) : this.#uncontrolledValue()
  }

  /** Ignored while the `value` attribute controls the group. */
  set value(next: string[]) {
    this.uncontrolled = [...next]
    this.attributeChangedCallback()
  }

  #uncontrolledValue() {
    this.uncontrolled ??= list(this, 'default-value') ?? []
    return this.uncontrolled
  }

  isChecked(value: string) {
    return this.value.includes(value)
  }

  itemProps(value: string) {
    const checked = this.isChecked(value)
    const max = num(this, 'max-selected')
    const fieldset = fieldsetOf(this)
    return {
      checked,
      name: str(this, 'name'),
      disabled:
        this.hasAttribute('disabled') || !!fieldset?.disabled || (max != null && this.value.length >= max && !checked),
      invalid: this.hasAttribute('invalid') || !!fieldset?.invalid,
      readOnly: this.hasAttribute('readonly'),
    }
  }

  private onCheckedChange = (event: Event) => {
    const item = event.target as HTMLElement
    if (item.localName !== root || item.closest(groupTag) !== this) return
    const value = item.getAttribute('value') ?? 'on'
    const props = this.itemProps(value)
    if (props.disabled || props.readOnly) return
    const next = props.checked ? this.value.filter((v) => v !== value) : [...this.value, value]
    if (!this.hasAttribute('value')) this.uncontrolled = next
    emit(this, 'valuechange', { value: next })
    this.attributeChangedCallback()
  }
}

if (!customElements.get(groupTag)) customElements.define(groupTag, CheckboxGroup)

export const groupOf = (el: Element) => {
  const group = el.closest(groupTag)
  return group instanceof CheckboxGroup ? group : null
}
