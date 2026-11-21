import * as drawer from '@zag-js/drawer'

import { controlled, num, str } from '../../utils/attrs.js'
import { definePresenceRoot } from '../../utils/presence.js'
import { dirOf, focusEl, root, snapPointOf, snapPointsOf, swipeDirectionOf, unlessFalse } from './shared.js'

type Role = NonNullable<drawer.Props['role']>

definePresenceRoot<drawer.Api>({
  tag: root,
  machine: drawer.machine,
  connect: drawer.connect,
  present: (api) => api.open,

  attributes: [
    'open',
    'default-open',
    'modal',
    'role',
    'dir',
    'swipe-direction',
    'snap-points',
    'snap-point',
    'default-snap-point',
    'snap-to-sequential-points',
    'close-threshold',
    'swipe-velocity-threshold',
    'close-on-escape',
    'close-on-interact-outside',
    'trap-focus',
    'prevent-scroll',
    'restore-focus',
    'prevent-drag-on-scroll',
    'initial-focus',
    'final-focus',
  ],
  properties: ['initialFocusEl', 'finalFocusEl', 'ids'],
  state: {
    open: {
      get: (api) => api.open,
      set: (api, open) => api.setOpen(!!open),
    },
    snapPoint: {
      get: (api) => api.snapPoint,
      set: (api, value) => api.setSnapPoint(value),
    },
  },
  props: (el) => ({
    open: controlled(el, 'open'),
    defaultOpen: el.hasAttribute('default-open'),
    modal: unlessFalse(el, 'modal'),
    role: str<Role>(el, 'role'),
    dir: dirOf(el),
    swipeDirection: swipeDirectionOf(el),
    snapPoints: snapPointsOf(el),
    snapPoint: snapPointOf(el, 'snap-point'),
    defaultSnapPoint: snapPointOf(el, 'default-snap-point'),
    snapToSequentialPoints: el.hasAttribute('snap-to-sequential-points'),
    closeThreshold: num(el, 'close-threshold'),
    swipeVelocityThreshold: num(el, 'swipe-velocity-threshold'),
    closeOnEscape: unlessFalse(el, 'close-on-escape'),
    closeOnInteractOutside: unlessFalse(el, 'close-on-interact-outside'),
    trapFocus: unlessFalse(el, 'trap-focus'),
    preventScroll: unlessFalse(el, 'prevent-scroll'),
    restoreFocus: unlessFalse(el, 'restore-focus'),
    preventDragOnScroll: unlessFalse(el, 'prevent-drag-on-scroll'),
    initialFocusEl: focusEl(el, 'initial-focus'),
    finalFocusEl: focusEl(el, 'final-focus'),
  }),

  events: {
    onOpenChange: 'openchange',
    onSnapPointChange: 'snappointchange',
    onTriggerValueChange: 'triggervaluechange',
    onEscapeKeyDown: 'escapekeydown',
    onRequestDismiss: 'requestdismiss',
    onPointerDownOutside: 'pointerdownoutside',
    onFocusOutside: 'focusoutside',
    onInteractOutside: 'interactoutside',
  },
})
