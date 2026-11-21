import * as clipboard from '@zag-js/clipboard'

import { num, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { root } from './shared.js'

defineRoot<clipboard.Api>({
  tag: root,
  machine: clipboard.machine,
  connect: clipboard.connect,

  attributes: ['value', 'default-value', 'timeout'],
  properties: ['ids', 'translations'],
  state: {
    value: {
      get: (api) => api.value,
      set: (api, value) => api.setValue(value),
    },
  },
  props: (el) => ({
    value: str(el, 'value'),
    defaultValue: str(el, 'default-value'),
    timeout: num(el, 'timeout'),
  }),

  events: {
    onStatusChange: 'statuschange',
    onValueChange: 'valuechange',
  },

  rootProps: (api) => api.getRootProps(),
})
