import * as radio from '@zag-js/radio-group'
import { str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { fieldsetOf } from '../../utils/field.js'
import { root } from './shared.js'

defineRoot<radio.Api>({
  properties: ['ids'],

  tag: root,
  machine: radio.machine,
  connect: radio.connect,
  attributes: ['value', 'default-value', 'name', 'form', 'disabled', 'invalid', 'required', 'readonly', 'orientation'],
  state: {
    value: {
      get: (api) => api.value,
      set: (api, value) => (value == null ? api.clearValue() : api.setValue(value)),
    },
  },
  props: (el) => {
    const fieldset = fieldsetOf(el)
    return {
      ids: fieldset ? { label: fieldset.ids.legend } : undefined,
      value: el.hasAttribute('value') ? el.getAttribute('value') || null : undefined,
      defaultValue: str(el, 'default-value'),
      name: str(el, 'name'),
      form: str(el, 'form'),
      disabled: el.hasAttribute('disabled') || !!fieldset?.disabled,
      invalid: el.hasAttribute('invalid') || !!fieldset?.invalid,
      required: el.hasAttribute('required'),
      readOnly: el.hasAttribute('readonly'),
      orientation: str<radio.Props['orientation'] & string>(el, 'orientation') ?? 'vertical',
    }
  },
  events: { onValueChange: 'valuechange' },
  rootProps: (api) => api.getRootProps(),
})
