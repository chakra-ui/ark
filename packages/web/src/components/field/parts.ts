import { autoresizeTextarea } from '@zag-js/auto-resize'
import type * as field from '@zag-js/field'

import { definePart, wrapped } from '../../utils/define.js'
import { itemValueOf, root } from './shared.js'

const item = (el: HTMLElement) => ({ item: itemValueOf(el) })

export const FieldItem = definePart<field.Api>({
  tag: 'ark-field-item',
  root,
  attributes: ['value'],
  display: 'contents',
  props: () => ({}),
})

export const FieldLabel = definePart<field.Api>({
  tag: 'ark-field-label',
  root,
  target: wrapped('label'),
  props: (api, el) => {
    const value = itemValueOf(el)
    const props = api.getLabelProps({ item: value })
    return value == null ? props : { ...props, id: `${api.getItemControlId(value)}:label` }
  },
})

export const FieldInput = definePart<field.Api>({
  tag: 'ark-field-input',
  root,
  target: wrapped('input'),
  props: (api, el) => api.getInputProps(item(el)),
})

export const FieldSelect = definePart<field.Api>({
  tag: 'ark-field-select',
  root,
  target: wrapped('select'),
  props: (api, el) => api.getSelectProps(item(el)),
})

export const FieldTextarea = definePart<field.Api>({
  tag: 'ark-field-textarea',
  root,
  attributes: ['autoresize'],
  target: wrapped('textarea'),
  props: (api, el) => api.getTextareaProps(item(el)),
  setup: (el) => {
    const textarea = wrapped('textarea')(el) as HTMLTextAreaElement | null
    if (!textarea || !el.hasAttribute('autoresize')) return
    textarea.style.resize = 'none'
    return autoresizeTextarea(textarea)
  },
})

export const FieldHelperText = definePart<field.Api>({
  tag: 'ark-field-helper-text',
  root,
  props: (api) => api.getHelperTextProps(),
})

const matchOf = (el: HTMLElement): field.ErrorTextProps['match'] => {
  const match = el.getAttribute('match')
  if (match == null) return undefined
  return match === 'true' || match === '' ? true : (match as field.ValidityMatch)
}

export const FieldErrorText = definePart<field.Api, field.ErrorTextState>({
  tag: 'ark-field-error-text',
  root,
  attributes: ['match'],
  props: (api, el) => api.getErrorTextProps({ match: matchOf(el) }),
  state: (api, el) => api.getErrorTextState({ match: matchOf(el) }),
})

const indicatorTypeOf = (el: HTMLElement) => (el.getAttribute('type') ?? 'required') as field.IndicatorType

export const FieldIndicator = definePart<field.Api, field.IndicatorState>({
  tag: 'ark-field-indicator',
  root,
  attributes: ['type'],
  display: 'inline',
  props: (api, el) => api.getIndicatorProps({ type: indicatorTypeOf(el) }),
  state: (api, el) => api.getIndicatorState({ type: indicatorTypeOf(el) }),
})
