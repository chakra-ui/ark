import type * as clipboard from '@zag-js/clipboard'

import { definePart, wrapped, wrappedButton } from '../../utils/define.js'
import { root } from './shared.js'

const autoText = new WeakSet<HTMLElement>()

export const ClipboardLabel = definePart<clipboard.Api>({
  tag: 'ark-clipboard-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const ClipboardControl = definePart<clipboard.Api>({
  tag: 'ark-clipboard-control',
  root,
  props: (api) => api.getControlProps(),
})

export const ClipboardInput = definePart<clipboard.Api>({
  tag: 'ark-clipboard-input',
  root,
  target: wrapped('input'),
  props: (api) => api.getInputProps(),
})

export const ClipboardTrigger = definePart<clipboard.Api>({
  tag: 'ark-clipboard-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getTriggerProps(),
})

export const ClipboardIndicator = definePart<clipboard.Api, clipboard.IndicatorState>({
  tag: 'ark-clipboard-indicator',
  root,
  attributes: ['copied'],
  display: 'inline-flex',
  props: (api, el) => api.getIndicatorProps({ copied: el.hasAttribute('copied') }),
  state: (api, el) => api.getIndicatorState({ copied: el.hasAttribute('copied') }),
})

export const ClipboardValueText = definePart<clipboard.Api>({
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
