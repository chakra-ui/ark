import type * as dialog from '@zag-js/dialog'
import { str } from '../../utils/attrs.js'
import { definePart, wrappedButton } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { root } from './shared.js'

definePart<dialog.Api>({
  tag: 'ark-dialog-trigger',
  root,
  target: wrappedButton,
  props: (api, el) => api.getTriggerProps({ value: str(el, 'value') }),
})

definePresencePart<dialog.Api>({
  tag: 'ark-dialog-backdrop',
  root,
  present: (api) => api.open,
  props: (api) => api.getBackdropProps(),
})

definePresencePart<dialog.Api>({
  tag: 'ark-dialog-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
})

definePresencePart<dialog.Api>({ tag: 'ark-dialog-content', root, props: (api) => api.getContentProps() })

definePart<dialog.Api>({ tag: 'ark-dialog-title', root, props: (api) => api.getTitleProps() })

definePart<dialog.Api>({ tag: 'ark-dialog-description', root, props: (api) => api.getDescriptionProps() })

definePart<dialog.Api>({
  tag: 'ark-dialog-close-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getCloseTriggerProps(),
})
