import * as menu from '@zag-js/menu'

import { controlled, positioning, positioningAttributes, str } from '../../utils/attrs.js'
import { definePresenceRoot } from '../../utils/presence.js'
import { collection, link, menubarOf, root, submenus } from './shared.js'

definePresenceRoot<menu.Api>({
  properties: ['scrollToIndexFn', 'initialFocusEl', 'finalFocusEl', 'navigate', 'ids', 'positioning'],
  ownProperties: ['collection'],
  propertyChanged: (el, name) => {
    if (name === 'collection') collection.update(el)
  },

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
    collection: (el as { collection?: unknown }).collection ? collection.get(el) : undefined,
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
  setup: (el) => collection.setup(el),
  started: link,
  render: (_api, el) => {
    for (const child of submenus.get(el) ?? []) child.render()
  },
})
