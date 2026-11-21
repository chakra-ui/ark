import * as meter from '@zag-js/meter'

import { num, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { root } from './shared.js'

defineRoot<meter.Api>({
  tag: root,
  machine: meter.machine,
  connect: meter.connect,

  attributes: ['value', 'default-value', 'min', 'max', 'low', 'high', 'optimum', 'orientation', 'locale'],
  properties: ['ids', 'formatOptions', 'translations'],
  props: (el) => ({
    value: num(el, 'value'),
    defaultValue: num(el, 'default-value'),
    min: num(el, 'min'),
    max: num(el, 'max'),
    low: num(el, 'low'),
    high: num(el, 'high'),
    optimum: num(el, 'optimum'),
    orientation: str<meter.Orientation>(el, 'orientation') ?? 'horizontal',
    locale: str(el, 'locale'),
  }),

  events: {
    onValueChange: 'valuechange',
  },

  rootProps: (api) => api.getRootProps(),
})
