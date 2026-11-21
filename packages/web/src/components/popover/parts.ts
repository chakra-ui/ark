import type * as popover from '@zag-js/popover'
import { str } from '../../utils/attrs.js'
import { definePart, wrappedButton } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { root } from './shared.js'

export const PopoverTrigger = definePart<popover.Api, popover.TriggerState>({
  tag: 'ark-popover-trigger',
  root,
  attributes: ['value'],
  target: wrappedButton,
  props: (api, el) => api.getTriggerProps({ value: str(el, 'value') }),
  state: (api, el) => api.getTriggerState({ value: str(el, 'value') }),
})

export const PopoverAnchor = definePart<popover.Api>({
  tag: 'ark-popover-anchor',
  root,
  props: (api) => api.getAnchorProps(),
})

export const PopoverIndicator = definePart<popover.Api>({
  tag: 'ark-popover-indicator',
  root,
  props: (api) => api.getIndicatorProps(),
})

export const PopoverPositioner = definePresencePart<popover.Api, popover.PositionerState>({
  tag: 'ark-popover-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
  state: (api) => api.getPositionerState(),
})

export const PopoverContent = definePresencePart<popover.Api, popover.ContentState>({
  tag: 'ark-popover-content',
  root,
  props: (api) => api.getContentProps(),
  state: (api) => api.getContentState(),
})

export const PopoverArrow = definePart<popover.Api>({
  tag: 'ark-popover-arrow',
  root,
  props: (api) => api.getArrowProps(),
})

export const PopoverArrowTip = definePart<popover.Api>({
  tag: 'ark-popover-arrow-tip',
  root,
  props: (api) => api.getArrowTipProps(),
})

export const PopoverTitle = definePart<popover.Api>({
  tag: 'ark-popover-title',
  root,
  props: (api) => api.getTitleProps(),
})

export const PopoverDescription = definePart<popover.Api>({
  tag: 'ark-popover-description',
  root,
  props: (api) => api.getDescriptionProps(),
})

export const PopoverCloseTrigger = definePart<popover.Api>({
  tag: 'ark-popover-close-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getCloseTriggerProps(),
})
