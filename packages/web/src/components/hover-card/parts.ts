import type * as hoverCard from '@zag-js/hover-card'
import { str } from '../../utils/attrs.js'
import { definePart, wrappedButton } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { root } from './shared.js'

definePart<hoverCard.Api>({
  tag: 'ark-hover-card-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => api.getTriggerProps({ value: str(el, 'value') }),
})

definePresencePart<hoverCard.Api>({
  tag: 'ark-hover-card-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
})

definePresencePart<hoverCard.Api>({ tag: 'ark-hover-card-content', root, props: (api) => api.getContentProps() })

definePart<hoverCard.Api>({ tag: 'ark-hover-card-arrow', root, props: (api) => api.getArrowProps() })

definePart<hoverCard.Api>({ tag: 'ark-hover-card-arrow-tip', root, props: (api) => api.getArrowTipProps() })
