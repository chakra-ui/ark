import type * as editable from '@zag-js/editable'
import { definePart, wrapped, wrappedButton } from '../../utils/define.js'
import { root } from './shared.js'
import { describedBy } from '../../utils/field.js'

export const EditableLabel = definePart<editable.Api>({
  tag: 'ark-editable-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const EditableArea = definePart<editable.Api>({
  tag: 'ark-editable-area',
  root,
  props: (api) => api.getAreaProps(),
})

export const EditableInput = definePart<editable.Api>({
  tag: 'ark-editable-input',
  root,
  target: wrapped('input, textarea'),
  props: (api, el) => ({ ...describedBy(el), ...api.getInputProps() }),
})

const previewTarget = (el: HTMLElement) => wrapped('span')(el) ?? el

export const EditablePreview = definePart<editable.Api>({
  tag: 'ark-editable-preview',
  root,
  // An optional wrapped span lets styles written for a span preview apply
  target: previewTarget,
  display: 'block',
  // `children` would be spread as innerHTML, so the value is written as text instead
  props: (api) => {
    const { children: _, ...props } = api.getPreviewProps() as Record<string, unknown>
    return props
  },
  render: (api, el) => {
    const target = previewTarget(el)
    if (target.textContent !== api.valueText) target.textContent = api.valueText
  },
})

export const EditableControl = definePart<editable.Api>({
  tag: 'ark-editable-control',
  root,
  props: (api) => api.getControlProps(),
})

export const EditableEditTrigger = definePart<editable.Api>({
  tag: 'ark-editable-edit-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getEditTriggerProps(),
})

export const EditableSubmitTrigger = definePart<editable.Api>({
  tag: 'ark-editable-submit-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getSubmitTriggerProps(),
})

export const EditableCancelTrigger = definePart<editable.Api>({
  tag: 'ark-editable-cancel-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getCancelTriggerProps(),
})
