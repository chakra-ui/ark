import type * as dialog from '@zag-js/dialog'
import { str } from '../../utils/attrs.js'
import { definePart, wrappedButton } from '../../utils/define.js'
import { definePresencePart } from '../../utils/presence.js'
import { root } from './shared.js'

export const DialogTrigger = definePart<dialog.Api, dialog.TriggerState>({
  tag: 'ark-dialog-trigger',
  root,
  attributes: ['value'],
  target: wrappedButton,
  props: (api, el) => api.getTriggerProps({ value: str(el, 'value') }),
  state: (api, el) => api.getTriggerState({ value: str(el, 'value') }),
})

export const DialogBackdrop = definePresencePart<dialog.Api, dialog.BackdropState>({
  tag: 'ark-dialog-backdrop',
  root,
  present: (api) => api.open,
  props: (api) => api.getBackdropProps(),
  state: (api) => api.getBackdropState(),
})

export const DialogPositioner = definePresencePart<dialog.Api, dialog.PositionerState>({
  tag: 'ark-dialog-positioner',
  root,
  animates: false,
  props: (api) => api.getPositionerProps(),
  state: (api) => api.getPositionerState(),
})

export const DialogContent = definePresencePart<dialog.Api, dialog.ContentState>({
  tag: 'ark-dialog-content',
  root,
  props: (api) => api.getContentProps(),
  state: (api) => api.getContentState(),
})

export const DialogTitle = definePart<dialog.Api>({
  tag: 'ark-dialog-title',
  root,
  props: (api) => api.getTitleProps(),
})

export const DialogDescription = definePart<dialog.Api>({
  tag: 'ark-dialog-description',
  root,
  props: (api) => api.getDescriptionProps(),
})

export const DialogCloseTrigger = definePart<dialog.Api>({
  tag: 'ark-dialog-close-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getCloseTriggerProps(),
})
