import * as pinInput from '@zag-js/pin-input'
import { list, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { inputsOf, root } from './shared.js'
import { withField } from '../../utils/field.js'

defineRoot<pinInput.Api>({
  properties: ['normalizeValue', 'ids', 'translations'],

  tag: root,
  machine: pinInput.machine,
  connect: pinInput.connect,
  attributes: [
    'value',
    'default-value',
    'placeholder',
    'type',
    'pattern',
    'otp',
    'mask',
    'autofocus',
    'auto-submit',
    'disabled',
    'invalid',
    'required',
    'readonly',
    'name',
    'form',
  ],
  state: {
    value: {
      get: (api) => api.value,
      set: (api, value) => api.setValue(value),
    },
  },
  props: (el) =>
    withField(el, 'hiddenInput', {
      // The rendered inputs are the count, as the machine's own DOM lookups already assume
      count: inputsOf(el).length,
      value: el.hasAttribute('value') ? (list(el, 'value') ?? []) : undefined,
      defaultValue: list(el, 'default-value'),
      placeholder: str(el, 'placeholder'),
      type: str<pinInput.Props['type'] & string>(el, 'type'),
      pattern: str(el, 'pattern'),
      otp: el.hasAttribute('otp'),
      mask: el.hasAttribute('mask'),
      autoFocus: el.hasAttribute('autofocus'),
      autoSubmit: el.hasAttribute('auto-submit'),
      disabled: el.hasAttribute('disabled'),
      invalid: el.hasAttribute('invalid'),
      required: el.hasAttribute('required'),
      readOnly: el.hasAttribute('readonly'),
      name: str(el, 'name'),
      form: str(el, 'form'),
    }),
  events: { onValueComplete: 'valuecomplete', onValueChange: 'valuechange', onValueInvalid: 'valueinvalid' },
  rootProps: (api) => api.getRootProps(),
})
