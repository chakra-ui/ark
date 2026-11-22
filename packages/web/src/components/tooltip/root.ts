import * as tooltip from '@zag-js/tooltip'
import { controlled, num, positioningAttributes } from '../../utils/attrs.js'
import { definePresenceRoot } from '../../utils/presence.js'
import { positioningOf, root } from './shared.js'

definePresenceRoot<tooltip.Api>({
  properties: ['ids', 'positioning'],

  tag: root,
  machine: tooltip.machine,
  connect: tooltip.connect,
  present: (api) => api.open,
  attributes: [
    'open',
    'default-open',
    'open-delay',
    'close-delay',
    'interactive',
    'disabled',
    'close-on-click',
    'close-on-pointer-down',
    'offset',
    'strategy',
    ...positioningAttributes,
  ],
  state: {
    open: {
      get: (api) => api.open,
      set: (api, open) => api.setOpen(!!open),
    },
  },
  props: (el) => ({
    open: controlled(el, 'open'),
    defaultOpen: el.hasAttribute('default-open'),
    openDelay: num(el, 'open-delay'),
    closeDelay: num(el, 'close-delay'),
    interactive: el.hasAttribute('interactive'),
    disabled: el.hasAttribute('disabled'),
    closeOnClick: el.getAttribute('close-on-click') !== 'false',
    closeOnPointerDown: el.getAttribute('close-on-pointer-down') !== 'false',
    positioning: positioningOf(el),
  }),
  events: { onOpenChange: 'openchange', onTriggerValueChange: 'triggervaluechange' },
})
