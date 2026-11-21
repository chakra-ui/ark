import * as segmentGroup from '@zag-js/radio-group'

import { str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { root } from './shared.js'

type Orientation = NonNullable<segmentGroup.Props['orientation']>

const controlledValue = (el: Element) => {
  if (!el.hasAttribute('value')) return undefined
  return el.getAttribute('value') || null
}

defineRoot<segmentGroup.Api>({
  tag: root,
  machine: segmentGroup.machine,
  connect: segmentGroup.connect,

  attributes: ['value', 'default-value', 'name', 'form', 'disabled', 'invalid', 'required', 'readonly', 'orientation'],
  properties: ['ids'],
  state: {
    value: {
      get: (api) => api.value,
      set: (api, value) => (value == null ? api.clearValue() : api.setValue(value)),
    },
  },
  props: (el) => ({
    value: controlledValue(el),
    defaultValue: str(el, 'default-value'),
    name: str(el, 'name'),
    form: str(el, 'form'),
    disabled: el.hasAttribute('disabled'),
    invalid: el.hasAttribute('invalid'),
    required: el.hasAttribute('required'),
    readOnly: el.hasAttribute('readonly'),
    orientation: str<Orientation>(el, 'orientation') ?? 'vertical',
  }),

  events: {
    onValueChange: 'valuechange',
  },

  rootProps: (api) => api.getRootProps(),
})
