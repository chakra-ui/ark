import * as navigationMenu from '@zag-js/navigation-menu'

import { num, str } from '../../utils/attrs.js'
import { defineRoot } from '../../utils/define.js'
import { dirOf, root } from './shared.js'

defineRoot<navigationMenu.Api>({
  tag: root,
  machine: navigationMenu.machine,
  connect: navigationMenu.connect,

  attributes: [
    'value',
    'default-value',
    'orientation',
    'open-delay',
    'close-delay',
    'disable-click-trigger',
    'disable-hover-trigger',
    'disable-pointer-leave-close',
  ],
  properties: ['ids', 'translations'],
  state: {
    value: {
      get: (api) => api.value,
      set: (api, value) => api.setValue(String(value ?? '')),
    },
  },
  props: (el) => ({
    value: el.hasAttribute('value') ? (el.getAttribute('value') ?? '') : undefined,
    defaultValue: str(el, 'default-value'),
    orientation: str<'horizontal' | 'vertical'>(el, 'orientation'),
    openDelay: num(el, 'open-delay'),
    closeDelay: num(el, 'close-delay'),
    disableClickTrigger: el.hasAttribute('disable-click-trigger'),
    disableHoverTrigger: el.hasAttribute('disable-hover-trigger'),
    disablePointerLeaveClose: el.hasAttribute('disable-pointer-leave-close'),
    dir: dirOf(el),
  }),

  events: {
    onValueChange: 'valuechange',
  },

  rootProps: (api) => api.getRootProps(),
})
