import type * as drawer from '@zag-js/drawer'

import { str } from '../../utils/attrs.js'
import { definePart, wrappedButton } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { root, swipeDirectionOf } from './shared.js'

const observeAttributes = (el: HTMLElement, names: string[], onChange: VoidFunction) => {
  const observer = new MutationObserver(onChange)
  observer.observe(el, { attributeFilter: names })
  return () => observer.disconnect()
}

definePart<drawer.Api>({
  tag: 'ark-drawer-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => api.getTriggerProps({ value: str(el, 'value') }),
})

definePresencePart<drawer.Api>({
  tag: 'ark-drawer-backdrop',
  root,
  present: (api) => api.open,
  props: (api) => api.getBackdropProps(),
})

definePresencePart<drawer.Api>({
  tag: 'ark-drawer-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
})

definePresencePart<drawer.Api>({
  tag: 'ark-drawer-content',
  root,
  props: (api, el) => api.getContentProps({ draggable: el.getAttribute('draggable') !== 'false' }),

  setup: (el, rootEl) => observeAttributes(el, ['draggable'], () => rootEl.render()),
})

definePart<drawer.Api>({
  tag: 'ark-drawer-grabber',
  root,
  props: (api) => api.getGrabberProps(),
})

definePart<drawer.Api>({
  tag: 'ark-drawer-grabber-indicator',
  root,
  props: (api) => api.getGrabberIndicatorProps(),
})

definePart<drawer.Api>({
  tag: 'ark-drawer-swipe-area',
  root,
  props: (api, el) =>
    api.getSwipeAreaProps({
      disabled: el.hasAttribute('disabled'),
      swipeDirection: swipeDirectionOf(el),
    }),

  setup: (el, rootEl) => observeAttributes(el, ['disabled', 'swipe-direction'], () => rootEl.render()),
})

definePart<drawer.Api>({
  tag: 'ark-drawer-title',
  root,
  props: (api) => api.getTitleProps(),
})

definePart<drawer.Api>({
  tag: 'ark-drawer-description',
  root,
  props: (api) => api.getDescriptionProps(),
})

definePart<drawer.Api>({
  tag: 'ark-drawer-close-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getCloseTriggerProps(),
})
