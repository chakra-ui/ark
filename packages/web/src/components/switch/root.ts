import * as zagSwitch from '@zag-js/switch'
import { str } from '../../utils/attrs.js'
import { defineRoot, wrapped } from '../../utils/define.js'
import { root } from './shared.js'

defineRoot<zagSwitch.Api>({
  properties: ['ids'],

  tag: root,
  machine: zagSwitch.machine,
  connect: zagSwitch.connect,
  attributes: ['checked', 'default-checked', 'disabled', 'invalid', 'required', 'readonly', 'name', 'value', 'form'],
  props: (el) => ({
    checked: el.hasAttribute('checked') ? el.getAttribute('checked') !== 'false' : undefined,
    defaultChecked: el.hasAttribute('default-checked'),
    disabled: el.hasAttribute('disabled'),
    invalid: el.hasAttribute('invalid'),
    required: el.hasAttribute('required'),
    readOnly: el.hasAttribute('readonly'),
    name: str(el, 'name'),
    value: str(el, 'value') ?? 'on',
    form: str(el, 'form'),
  }),
  events: { onCheckedChange: 'checkedchange' },
  target: wrapped('label'),
  rootProps: (api) => api.getRootProps(),
})
