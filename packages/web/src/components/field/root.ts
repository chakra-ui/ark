import * as field from '@zag-js/field'

import { str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { fieldsetOf, refreshOnChange } from '../../utils/field.js'
import { root } from './shared.js'

const bool = (el: Element, name: string) => (el.hasAttribute(name) ? el.getAttribute(name) !== 'false' : undefined)

defineRoot<field.Api>({
  tag: root,
  machine: field.machine,
  connect: field.connect,

  attributes: ['disabled', 'invalid', 'readonly', 'required', 'target', 'validation-mode', 'dirty', 'touched'],
  properties: ['ids', 'errors', 'validate'],
  props: (el) => ({
    disabled: el.hasAttribute('disabled') || !!fieldsetOf(el)?.disabled,
    invalid: el.hasAttribute('invalid'),
    readOnly: el.hasAttribute('readonly'),
    required: el.hasAttribute('required'),
    target: str(el, 'target'),
    validationMode: str<field.ValidationMode>(el, 'validation-mode'),
    dirty: bool(el, 'dirty'),
    touched: bool(el, 'touched'),
  }),

  events: { onValidityChange: 'validitychange' },
  rootProps: (api) => api.getRootProps(),
  render: (api, el) =>
    refreshOnChange(el, [api.disabled, api.invalid, api.readOnly, api.required, api.ariaDescribedby]),
})
