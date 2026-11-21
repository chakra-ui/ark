import * as toggle from '@zag-js/toggle'

import { controlled } from '../../utils/attrs.js'
import { defineRoot, wrapped } from '../../utils/define.js'
import { root } from './shared.js'

defineRoot<toggle.Api>({
  tag: root,
  machine: toggle.machine,
  connect: toggle.connect,

  attributes: ['pressed', 'default-pressed', 'disabled'],
  props: (el) => ({
    pressed: controlled(el, 'pressed'),
    defaultPressed: el.hasAttribute('default-pressed'),
    disabled: el.hasAttribute('disabled'),
  }),

  events: {
    onPressedChange: 'pressedchange',
  },

  target: wrapped('button'),
  rootProps: (api) => api.getRootProps(),
})
