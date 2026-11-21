import * as menu from '@zag-js/menu'
import { controlled, positioning, positioningAttributes, str } from '../../utils/attrs.js'
import { definePresenceRoot } from '../../utils/presence.js'
import { link, queries, root, submenus } from './shared.js'

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
  props: (el) => ({
    open: controlled(el, 'open'),
    popupType: str<menu.Props['popupType'] & string>(el, 'popup-type'),
    defaultOpen: el.hasAttribute('default-open'),
    loopFocus: el.hasAttribute('loop-focus'),
    closeOnSelect: el.getAttribute('close-on-select') !== 'false',
    typeahead: el.getAttribute('typeahead') !== 'false',
    positioning: positioning(el),
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
  setup: (el) => {
    const onOpenChange = (event: Event) => {
      if (event.target !== el || (event as CustomEvent<{ open: boolean }>).detail.open) return
      if (!queries.delete(el)) return
      for (const input of el.querySelectorAll<HTMLInputElement>('ark-menu-input > input')) {
        if (input.closest(root) === el) input.value = ''
      }
    }
    el.addEventListener('openchange', onOpenChange)
    return () => el.removeEventListener('openchange', onOpenChange)
  },
  started: link,
  render: (_api, el) => {
    for (const child of submenus.get(el) ?? []) child.render()
  },
})
