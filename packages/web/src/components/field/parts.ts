import { autoresizeTextarea } from '@zag-js/auto-resize'
import type * as field from '@zag-js/field'

import { definePart, wrapped } from '../../utils/define.js'
import { itemValueOf, root } from './shared.js'

const item = (el: HTMLElement) => ({ item: itemValueOf(el) })

definePart<field.Api>({
  tag: 'ark-field-item',
  root,
  display: 'contents',
  props: () => ({}),
})

definePart<field.Api>({
  tag: 'ark-field-label',
  root,
  target: wrapped('label'),
  props: (api, el) => {
    const value = itemValueOf(el)
    const props = api.getLabelProps({ item: value })
    return value == null ? props : { ...props, id: `${api.getItemControlId(value)}:label` }
  },
})

definePart<field.Api>({
  tag: 'ark-field-input',
  root,
  target: wrapped('input'),
  props: (api, el) => api.getInputProps(item(el)),
})

definePart<field.Api>({
  tag: 'ark-field-select',
  root,
  target: wrapped('select'),
  props: (api, el) => api.getSelectProps(item(el)),
})

definePart<field.Api>({
  tag: 'ark-field-textarea',
  root,
  target: wrapped('textarea'),
  props: (api, el) => api.getTextareaProps(item(el)),
  setup: (el) => {
    const textarea = wrapped('textarea')(el) as HTMLTextAreaElement | null
    if (!textarea || !el.hasAttribute('autoresize')) return
    textarea.style.resize = 'none'
    return autoresizeTextarea(textarea)
  },
})

definePart<field.Api>({
  tag: 'ark-field-helper-text',
  root,
  props: (api) => api.getHelperTextProps(),
})

const matchOf = (el: HTMLElement): field.ErrorTextProps['match'] => {
  const match = el.getAttribute('match')
  if (match == null) return undefined
  return match === 'true' || match === '' ? true : (match as field.ValidityMatch)
}

definePart<field.Api>({
  tag: 'ark-field-error-text',
  root,
  props: (api, el) => api.getErrorTextProps({ match: matchOf(el) }),
})

definePart<field.Api>({
  tag: 'ark-field-indicator',
  root,
  display: 'inline',
  props: (api, el) => api.getIndicatorProps({ type: (el.getAttribute('type') ?? 'required') as field.IndicatorType }),
})
