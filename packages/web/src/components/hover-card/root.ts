import * as hoverCard from '@zag-js/hover-card'
import { controlled, num, positioning, positioningAttributes, str } from '../../utils/attrs.js'
import { definePresenceRoot } from '../../utils/presence.js'
import { root } from './shared.js'

definePresenceRoot<hoverCard.Api>({
  properties: ['ids', 'positioning'],

  tag: root,
  machine: hoverCard.machine,
  connect: hoverCard.connect,
  present: (api) => api.open,
  attributes: [
    'open',
    'default-open',
    'open-delay',
    'close-delay',
    'disabled',
    'trigger-value',
    'default-trigger-value',
    ...positioningAttributes,
  ],
  props: (el) => ({
    open: controlled(el, 'open'),
    defaultOpen: el.hasAttribute('default-open'),
    openDelay: num(el, 'open-delay'),
    closeDelay: num(el, 'close-delay'),
    disabled: el.hasAttribute('disabled'),
    triggerValue: el.hasAttribute('trigger-value') ? str(el, 'trigger-value') || null : undefined,
    defaultTriggerValue: str(el, 'default-trigger-value'),
    positioning: positioning(el),
  }),
  events: {
    onOpenChange: 'openchange',
    onTriggerValueChange: 'triggervaluechange',
    onPointerDownOutside: 'pointerdownoutside',
    onFocusOutside: 'focusoutside',
    onInteractOutside: 'interactoutside',
  },
})
