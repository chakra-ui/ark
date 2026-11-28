import type { Api as FieldApi } from '@zag-js/field'
import type { Api as FieldsetApi } from '@zag-js/fieldset'

type Dict = Record<string, any>

const apiOf = <Api>(el: HTMLElement, tag: string) =>
  (el.parentElement?.closest(tag) as (HTMLElement & { api?: Api }) | null)?.api

export const fieldsetOf = (el: HTMLElement): FieldsetApi | undefined => apiOf<FieldsetApi>(el, 'ark-fieldset')

export function describedBy(el: HTMLElement): { 'aria-describedby'?: string } {
  const id = apiOf<FieldApi>(el, 'ark-field')?.ariaDescribedby
  return id ? { 'aria-describedby': id } : {}
}

export function withField<P extends Dict>(
  el: HTMLElement,
  control: string,
  props: P,
  options: { label?: boolean } = {},
): P {
  const fieldEl = el.parentElement?.closest<HTMLElement & { api?: FieldApi }>('ark-field')
  const field = fieldEl?.api
  if (!fieldEl || !field) return props
  const item = el.parentElement?.closest('ark-field-item')
  const value = item && fieldEl.contains(item) ? item.getAttribute('value') : null
  const controlId = value == null ? field.ids.control : field.getItemControlId(value)
  const labelId = value == null ? field.ids.label : `${controlId}:label`
  return {
    ...props,
    ids: { ...(options.label === false ? {} : { label: labelId }), [control]: controlId, ...props.ids },
    disabled: props.disabled || field.disabled,
    invalid: props.invalid || field.invalid,
    readOnly: props.readOnly || field.readOnly,
    required: props.required || field.required,
  }
}

const lastState = new WeakMap<HTMLElement, string>()

export function refreshOnChange(el: HTMLElement, state: unknown[]) {
  const key = state.join()
  if (lastState.get(el) === key) return
  lastState.set(el, key)
  for (const child of el.querySelectorAll<HTMLElement & { refresh?: () => void }>('*')) {
    if (child.localName.startsWith('ark-') && typeof child.refresh === 'function') child.refresh()
  }
}
