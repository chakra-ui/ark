import * as angleSlider from '@zag-js/angle-slider'

import { num, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { root } from './shared.js'

defineRoot<angleSlider.Api>({
  tag: root,
  machine: angleSlider.machine,
  connect: angleSlider.connect,

  attributes: ['value', 'default-value', 'step', 'disabled', 'readonly', 'invalid', 'name'],
  properties: ['ids'],
  state: {
    value: {
      get: (api) => api.value,
      set: (api, value) => api.setValue(value),
    },
  },
  props: (el) => ({
    value: num(el, 'value'),
    defaultValue: num(el, 'default-value') ?? 0,
    step: num(el, 'step') ?? 1,
    disabled: el.hasAttribute('disabled'),
    readOnly: el.hasAttribute('readonly'),
    invalid: el.hasAttribute('invalid'),
    name: str(el, 'name'),
  }),

  events: {
    onValueChange: 'valuechange',
    onValueChangeEnd: 'valuechangeend',
  },

  rootProps: (api) => api.getRootProps(),
})
