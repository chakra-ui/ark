import type * as numberInput from '@zag-js/number-input'
import { definePart, ownInput, wrapped, wrappedButton } from '../../utils/define.js'
import { root } from './shared.js'

const autoText = new WeakSet<HTMLElement>()

definePart<numberInput.Api>({ tag: 'ark-number-input-label', root, props: (api) => api.getLabelProps() })

definePart<numberInput.Api>({ tag: 'ark-number-input-control', root, props: (api) => api.getControlProps() })

definePart<numberInput.Api>({
  tag: 'ark-number-input-input',
  root,
  target: wrapped('input'),
  props: (api) => api.getInputProps(),
})

definePart<numberInput.Api>({
  tag: 'ark-number-input-increment-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getIncrementTriggerProps(),
})

definePart<numberInput.Api>({
  tag: 'ark-number-input-decrement-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getDecrementTriggerProps(),
})

definePart<numberInput.Api>({ tag: 'ark-number-input-scrubber', root, props: (api) => api.getScrubberProps() })

definePart<numberInput.Api>({
  tag: 'ark-number-input-scrubber-cursor',
  root,
  props: (api) => api.getScrubberCursorProps(),
})

definePart<numberInput.Api>({
  tag: 'ark-number-input-value-text',
  root,
  setup: (el) => {
    if (!el.firstChild) autoText.add(el)
  },
  props: (api) => api.getValueTextProps(),
  render: (api, el) => {
    if (autoText.has(el)) el.textContent = api.formattedValue
  },
})

definePart<numberInput.Api>({
  tag: 'ark-number-input-hidden-input',
  root,
  target: ownInput,
  props: (api) => api.getHiddenInputProps(),
})
