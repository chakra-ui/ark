import type * as popover from '@zag-js/popover'
import { str } from '../../utils/attrs.js'
import { definePart, wrappedButton } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { root } from './shared.js'

definePart<popover.Api>({
  tag: 'ark-popover-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => api.getTriggerProps({ value: str(el, 'value') }),
})

definePart<popover.Api>({ tag: 'ark-popover-anchor', root, props: (api) => api.getAnchorProps() })

definePart<popover.Api>({ tag: 'ark-popover-indicator', root, props: (api) => api.getIndicatorProps() })

definePresencePart<popover.Api>({
  tag: 'ark-popover-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
})

definePresencePart<popover.Api>({ tag: 'ark-popover-content', root, props: (api) => api.getContentProps() })

definePart<popover.Api>({ tag: 'ark-popover-arrow', root, props: (api) => api.getArrowProps() })

definePart<popover.Api>({ tag: 'ark-popover-arrow-tip', root, props: (api) => api.getArrowTipProps() })

definePart<popover.Api>({ tag: 'ark-popover-title', root, props: (api) => api.getTitleProps() })

definePart<popover.Api>({ tag: 'ark-popover-description', root, props: (api) => api.getDescriptionProps() })

definePart<popover.Api>({
  tag: 'ark-popover-close-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getCloseTriggerProps(),
})
