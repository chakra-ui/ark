import * as popover from '@zag-js/popover'
import { controlled, positioningAttributes } from '../../utils/attrs.js'
import { definePresenceRoot } from '../../utils/presence.js'
import { focusEl, positioningOf, root } from './shared.js'

definePresenceRoot<popover.Api>({
  properties: ['initialFocusEl', 'finalFocusEl', 'ids', 'translations', 'positioning'],

  tag: root,
  machine: popover.machine,
  connect: popover.connect,
  present: (api) => api.open,
  attributes: [
    'open',
    'default-open',
    'modal',
    'auto-focus',
    'close-on-escape',
    'close-on-interact-outside',
    'initial-focus',
    'final-focus',
    'offset',
    'flip',
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
    modal: el.hasAttribute('modal'),
    autoFocus: el.getAttribute('auto-focus') !== 'false',
    closeOnEscape: el.getAttribute('close-on-escape') !== 'false',
    closeOnInteractOutside: el.getAttribute('close-on-interact-outside') !== 'false',
    initialFocusEl: focusEl(el, 'initial-focus'),
    finalFocusEl: focusEl(el, 'final-focus'),
    positioning: positioningOf(el),
  }),
  events: {
    onOpenChange: 'openchange',
    onTriggerValueChange: 'triggervaluechange',
    onEscapeKeyDown: 'escapekeydown',
    onRequestDismiss: 'requestdismiss',
    onPointerDownOutside: 'pointerdownoutside',
    onFocusOutside: 'focusoutside',
    onInteractOutside: 'interactoutside',
  },
})
