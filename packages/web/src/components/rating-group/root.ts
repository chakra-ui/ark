import * as rating from '@zag-js/rating-group'
import { num, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { root } from './shared.js'

defineRoot<rating.Api>({
  properties: ['ids', 'translations'],

  tag: root,
  machine: rating.machine,
  connect: rating.connect,
  attributes: [
    'value',
    'default-value',
    'count',
    'allow-half',
    'disabled',
    'readonly',
    'required',
    'autofocus',
    'name',
    'form',
  ],
  state: {
    value: {
      get: (api) => api.value,
      set: (api, value) => api.setValue(Number(value)),
    },
  },
  props: (el) => ({
    value: num(el, 'value'),
    defaultValue: num(el, 'default-value'),
    count: num(el, 'count'),
    allowHalf: el.hasAttribute('allow-half'),
    disabled: el.hasAttribute('disabled'),
    readOnly: el.hasAttribute('readonly'),
    required: el.hasAttribute('required'),
    autoFocus: el.hasAttribute('autofocus'),
    name: str(el, 'name'),
    form: str(el, 'form'),
  }),
  events: { onValueChange: 'valuechange', onHoverChange: 'hoverchange' },
  rootProps: (api) => api.getRootProps(),
})
