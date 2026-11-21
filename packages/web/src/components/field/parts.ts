import { autoresizeTextarea } from '@zag-js/auto-resize'

import { definePart, wrapped } from '../../utils/define.js'
import { type FieldApi, itemValueOf, root } from './shared.js'

// Helper and error text change aria-describedby, so the root re-renders when they come and go
const renderRoot = (_el: HTMLElement, rootEl: { render(): void }) => {
  queueMicrotask(() => rootEl.render())
  return () => queueMicrotask(() => rootEl.render())
}

definePart<FieldApi>({
  tag: 'ark-field-item',
  root,
  display: 'contents',
  props: () => ({}),
})

definePart<FieldApi>({
  tag: 'ark-field-label',
  root,
  target: wrapped('label'),
  props: (api, el) => api.getLabelProps(itemValueOf(el)),
})

definePart<FieldApi>({
  tag: 'ark-field-input',
  root,
  target: wrapped('input'),
  props: (api, el) => api.getInputProps(itemValueOf(el)),
})

definePart<FieldApi>({
  tag: 'ark-field-select',
  root,
  target: wrapped('select'),
  props: (api, el) => api.getSelectProps(itemValueOf(el)),
})

definePart<FieldApi>({
  tag: 'ark-field-textarea',
  root,
  target: wrapped('textarea'),
  props: (api, el) => api.getTextareaProps(itemValueOf(el)),
  setup: (el) => {
    const textarea = wrapped('textarea')(el) as HTMLTextAreaElement | null
    if (!textarea || !el.hasAttribute('autoresize')) return
    return autoresizeTextarea(textarea)
  },
})

definePart<FieldApi>({
  tag: 'ark-field-helper-text',
  root,
  props: (api) => api.getHelperTextProps(),
  setup: renderRoot,
})

definePart<FieldApi>({
  tag: 'ark-field-error-text',
  root,
  props: (api) => api.getErrorTextProps(),
  setup: renderRoot,
})

definePart<FieldApi>({
  tag: 'ark-field-required-indicator',
  root,
  display: 'inline',
  props: (api, el) => {
    const visible = el.hasAttribute('fallback') ? !api.required : api.required
    return { ...api.getRequiredIndicatorProps(), hidden: !visible }
  },
})
