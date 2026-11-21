import * as menu from '@zag-js/menu'

import { controlled, positioning, positioningAttributes, str } from '../../utils/attrs.js'
import { rootOf, type RootElement } from '../../utils/define.js'
import { definePresenceRoot } from '../../utils/presence.js'
import { link, menubarOf, queries, root, submenus } from './shared.js'

function clearQuery(el: RootElement<menu.Api>) {
  if (!queries.delete(el)) return
  for (const input of el.querySelectorAll<HTMLInputElement>('ark-menu-input > input')) {
    if (rootOf(input, root) === el) input.value = ''
  }
}

definePresenceRoot<menu.Api>({
  properties: ['scrollToIndexFn', 'initialFocusEl', 'finalFocusEl', 'navigate', 'ids', 'positioning'],

  tag: root,
  machine: menu.machine,
  connect: menu.connect,
  present: (api) => api.open,
  attributes: [
    'open',
    'default-open',
    'loop-focus',
    'close-on-select',
    'typeahead',
    'popup-type',
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
    popupType: str<menu.Props['popupType'] & string>(el, 'popup-type'),
    defaultOpen: el.hasAttribute('default-open'),
    loopFocus: el.hasAttribute('loop-focus'),
    closeOnSelect: el.getAttribute('close-on-select') !== 'false',
    typeahead: el.getAttribute('typeahead') !== 'false',
    positioning: positioning(el),
    menubar: menubarOf(el),
  }),
  events: {
    onHighlightChange: 'highlightchange',
    onSelect: 'itemselect',
    onOpenChange: 'openchange',
    onTriggerValueChange: 'triggervaluechange',
    onEscapeKeyDown: 'escapekeydown',
    onRequestDismiss: 'requestdismiss',
    onPointerDownOutside: 'pointerdownoutside',
    onFocusOutside: 'focusoutside',
    onInteractOutside: 'interactoutside',
  },
  started: link,
  render: (api, el) => {
    if (!api.open) clearQuery(el)
    for (const child of submenus.get(el) ?? []) child.render()
  },
})
