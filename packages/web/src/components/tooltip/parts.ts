import type * as tooltip from '@zag-js/tooltip'
import { str } from '../../utils/attrs.js'
import { definePart } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { root, triggerTarget } from './shared.js'

export const TooltipTrigger = definePart<tooltip.Api, tooltip.TriggerState>({
  tag: 'ark-tooltip-trigger',
  root,
  attributes: ['value'],
  target: triggerTarget,
  props: (api, el) => api.getTriggerProps({ value: str(el, 'value') }),
  state: (api, el) => api.getTriggerState({ value: str(el, 'value') }),
})

export const TooltipPositioner = definePresencePart<tooltip.Api>({
  tag: 'ark-tooltip-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
})

export const TooltipContent = definePresencePart<tooltip.Api, tooltip.ContentState>({
  tag: 'ark-tooltip-content',
  root,
  props: (api) => api.getContentProps(),
  state: (api) => api.getContentState(),
})

export const TooltipArrow = definePart<tooltip.Api>({
  tag: 'ark-tooltip-arrow',
  root,
  props: (api) => api.getArrowProps(),
})

export const TooltipArrowTip = definePart<tooltip.Api>({
  tag: 'ark-tooltip-arrow-tip',
  root,
  props: (api) => api.getArrowTipProps(),
})
