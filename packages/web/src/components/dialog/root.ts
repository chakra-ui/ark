import * as dialog from '@zag-js/dialog'
import { controlled } from '../../utils/attrs.js'
import { definePresenceRoot } from '../../utils/presence.js'
import { focusEl, root } from './shared.js'

definePresenceRoot<dialog.Api>({
  properties: ['initialFocusEl', 'finalFocusEl', 'ids'],

  tag: root,
  machine: dialog.machine,
  connect: dialog.connect,
  present: (api) => api.open,
  attributes: ['open', 'modal', 'role', 'initial-focus', 'final-focus'],
  state: {
    open: {
      get: (api) => api.open,
      set: (api, open) => api.setOpen(!!open),
    },
  },
  props: (el) => ({
    open: controlled(el, 'open'),
    modal: el.getAttribute('modal') !== 'false',
    role: (el.getAttribute('role') as dialog.Props['role']) ?? 'dialog',
    initialFocusEl: focusEl(el, 'initial-focus'),
    finalFocusEl: focusEl(el, 'final-focus'),
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
