import * as checkbox from '@zag-js/checkbox'
import { str } from '../../utils/attrs.js'
import { defineRoot, wrapped } from '../../utils/define.js'
import { checkedOf, groupOf, root } from './shared.js'

defineRoot<checkbox.Api>({
  properties: ['ids'],

  tag: root,
  machine: checkbox.machine,
  connect: checkbox.connect,
  attributes: ['checked', 'default-checked', 'disabled', 'invalid', 'required', 'readonly', 'name', 'value', 'form'],
  props: (el) => ({
    checked: checkedOf(el),
    defaultChecked:
      el.getAttribute('default-checked') === 'indeterminate' ? 'indeterminate' : el.hasAttribute('default-checked'),
    disabled: el.hasAttribute('disabled'),
    invalid: el.hasAttribute('invalid'),
    required: el.hasAttribute('required'),
    readOnly: el.hasAttribute('readonly'),
    name: str(el, 'name'),
    value: str(el, 'value') ?? 'on',
    form: str(el, 'form'),
    ...groupOf(el)?.itemProps(str(el, 'value') ?? 'on'),
  }),
  events: { onCheckedChange: 'checkedchange' },
  target: wrapped('label'),
  rootProps: (api) => api.getRootProps(),
})
