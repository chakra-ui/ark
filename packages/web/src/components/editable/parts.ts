import type * as editable from '@zag-js/editable'
import { definePart, wrapped, wrappedButton } from '../../utils/define.js'
import { root } from './shared.js'

definePart<editable.Api>({ tag: 'ark-editable-label', root, props: (api) => api.getLabelProps() })

definePart<editable.Api>({ tag: 'ark-editable-area', root, props: (api) => api.getAreaProps() })

definePart<editable.Api>({
  tag: 'ark-editable-input',
  root,
  target: wrapped('input, textarea'),
  props: (api) => api.getInputProps(),
})

const previewTarget = (el: HTMLElement) => wrapped('span')(el) ?? el

definePart<editable.Api>({
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

definePart<editable.Api>({ tag: 'ark-editable-control', root, props: (api) => api.getControlProps() })

definePart<editable.Api>({
  tag: 'ark-editable-edit-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getEditTriggerProps(),
})

definePart<editable.Api>({
  tag: 'ark-editable-submit-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getSubmitTriggerProps(),
})

definePart<editable.Api>({
  tag: 'ark-editable-cancel-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getCancelTriggerProps(),
})
