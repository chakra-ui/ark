import type * as tooltip from '@zag-js/tooltip'
import { str } from '../../utils/attrs.js'
import { definePart } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { root, triggerTarget } from './shared.js'

definePart<tooltip.Api>({
  tag: 'ark-tooltip-trigger',
  root,
  target: triggerTarget,
  props: (api, el) => api.getTriggerProps({ value: str(el, 'value') }),
})

definePresencePart<tooltip.Api>({
  tag: 'ark-tooltip-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
})

definePresencePart<tooltip.Api>({ tag: 'ark-tooltip-content', root, props: (api) => api.getContentProps() })

definePart<tooltip.Api>({ tag: 'ark-tooltip-arrow', root, props: (api) => api.getArrowProps() })

definePart<tooltip.Api>({ tag: 'ark-tooltip-arrow-tip', root, props: (api) => api.getArrowTipProps() })
