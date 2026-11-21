import type * as clipboard from '@zag-js/clipboard'

import { definePart, wrapped, wrappedButton } from '../../utils/define.js'
import { root } from './shared.js'

const autoText = new WeakSet<HTMLElement>()

definePart<clipboard.Api>({
  tag: 'ark-clipboard-label',
  root,
  props: (api) => api.getLabelProps(),
})

definePart<clipboard.Api>({
  tag: 'ark-clipboard-control',
  root,
  props: (api) => api.getControlProps(),
})

definePart<clipboard.Api>({
  tag: 'ark-clipboard-input',
  root,
  target: wrapped('input'),
  props: (api) => api.getInputProps(),
})

definePart<clipboard.Api>({
  tag: 'ark-clipboard-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getTriggerProps(),
})

definePart<clipboard.Api>({
  tag: 'ark-clipboard-indicator',
  root,
  display: 'inline-flex',
  props: (api, el) => api.getIndicatorProps({ copied: el.hasAttribute('copied') }),
})

definePart<clipboard.Api>({
  tag: 'ark-clipboard-value-text',
  root,
  display: 'inline',
  props: () => ({}),

  setup: (el) => {
    if (!el.firstChild) autoText.add(el)
  },

  render: (api, el) => {
    if (!autoText.has(el)) return
    if (el.textContent !== api.value) el.textContent = api.value
  },
})
