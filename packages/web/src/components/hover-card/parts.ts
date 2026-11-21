import type * as hoverCard from '@zag-js/hover-card'
import { str } from '../../utils/attrs.js'
import { definePart, wrappedButton } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { root } from './shared.js'

export const HoverCardTrigger = definePart<hoverCard.Api, hoverCard.TriggerState>({
  tag: 'ark-hover-card-trigger',
  root,
  attributes: ['value'],
  target: wrappedButton,
  props: (api, el) => api.getTriggerProps({ value: str(el, 'value') }),
  state: (api, el) => api.getTriggerState({ value: str(el, 'value') }),
})

export const HoverCardPositioner = definePresencePart<hoverCard.Api, hoverCard.PositionerState>({
  tag: 'ark-hover-card-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
  state: (api) => api.getPositionerState(),
})

export const HoverCardContent = definePresencePart<hoverCard.Api, hoverCard.ContentState>({
  tag: 'ark-hover-card-content',
  root,
  props: (api) => api.getContentProps(),
  state: (api) => api.getContentState(),
})

export const HoverCardArrow = definePart<hoverCard.Api>({
  tag: 'ark-hover-card-arrow',
  root,
  props: (api) => api.getArrowProps(),
})

export const HoverCardArrowTip = definePart<hoverCard.Api>({
  tag: 'ark-hover-card-arrow-tip',
  root,
  props: (api) => api.getArrowTipProps(),
})
