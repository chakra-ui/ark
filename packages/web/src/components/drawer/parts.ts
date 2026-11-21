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

export const DrawerTrigger = definePart<drawer.Api, drawer.TriggerState>({
  tag: 'ark-drawer-trigger',
  root,
  attributes: ['value'],
  target: wrappedButton,
  props: (api, el) => api.getTriggerProps({ value: str(el, 'value') }),
  state: (api, el) => api.getTriggerState({ value: str(el, 'value') }),
})

export const DrawerBackdrop = definePresencePart<drawer.Api, drawer.BackdropState>({
  tag: 'ark-drawer-backdrop',
  root,
  present: (api) => api.open,
  props: (api) => api.getBackdropProps(),
  state: (api) => api.getBackdropState(),
})

export const DrawerPositioner = definePresencePart<drawer.Api, drawer.PositionerState>({
  tag: 'ark-drawer-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
  state: (api) => api.getPositionerState(),
})

export const DrawerContent = definePresencePart<drawer.Api, drawer.ContentState>({
  tag: 'ark-drawer-content',
  root,
  attributes: ['draggable'],
  props: (api, el) => api.getContentProps({ draggable: el.getAttribute('draggable') !== 'false' }),
  state: (api) => api.getContentState(),

  setup: (el, rootEl) => observeAttributes(el, ['draggable'], () => rootEl.render()),
})

export const DrawerGrabber = definePart<drawer.Api>({
  tag: 'ark-drawer-grabber',
  root,
  props: (api) => api.getGrabberProps(),
})

export const DrawerGrabberIndicator = definePart<drawer.Api>({
  tag: 'ark-drawer-grabber-indicator',
  root,
  props: (api) => api.getGrabberIndicatorProps(),
})

const swipeAreaPropsOf = (el: HTMLElement) => ({
  disabled: el.hasAttribute('disabled'),
  swipeDirection: swipeDirectionOf(el),
})

export const DrawerSwipeArea = definePart<drawer.Api, drawer.SwipeAreaState>({
  tag: 'ark-drawer-swipe-area',
  root,
  attributes: ['disabled', 'swipe-direction'],
  props: (api, el) => api.getSwipeAreaProps(swipeAreaPropsOf(el)),
  state: (api, el) => api.getSwipeAreaState(swipeAreaPropsOf(el)),

  setup: (el, rootEl) => observeAttributes(el, ['disabled', 'swipe-direction'], () => rootEl.render()),
})

export const DrawerTitle = definePart<drawer.Api>({
  tag: 'ark-drawer-title',
  root,
  props: (api) => api.getTitleProps(),
})

export const DrawerDescription = definePart<drawer.Api>({
  tag: 'ark-drawer-description',
  root,
  props: (api) => api.getDescriptionProps(),
})

export const DrawerCloseTrigger = definePart<drawer.Api>({
  tag: 'ark-drawer-close-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getCloseTriggerProps(),
})
