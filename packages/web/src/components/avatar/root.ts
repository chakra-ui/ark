import * as avatar from '@zag-js/avatar'

import { defineRoot } from '../../utils/define.js'
import { root } from './shared.js'

defineRoot<avatar.Api>({
  tag: root,
  machine: avatar.machine,
  connect: avatar.connect,

  properties: ['ids'],
  props: () => ({}),

  events: {
    onStatusChange: 'statuschange',
  },

  rootProps: (api) => api.getRootProps(),
})
