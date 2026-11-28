import type * as numberInput from '@zag-js/number-input'
import { definePart, ownInput, wrapped, wrappedButton } from '../../utils/define.js'
import { root } from './shared.js'
import { describedBy } from '../../utils/field.js'

const autoText = new WeakSet<HTMLElement>()

export const NumberInputLabel = definePart<numberInput.Api>({
  tag: 'ark-number-input-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const NumberInputControl = definePart<numberInput.Api>({
  tag: 'ark-number-input-control',
  root,
  props: (api) => api.getControlProps(),
})

export const NumberInputInput = definePart<numberInput.Api, numberInput.InputState>({
  tag: 'ark-number-input-input',
  root,
  target: wrapped('input'),
  props: (api, el) => ({ ...describedBy(el), ...api.getInputProps() }),
  state: (api) => api.getInputState(),
})

export const NumberInputIncrementTrigger = definePart<numberInput.Api, numberInput.IncrementTriggerState>({
  tag: 'ark-number-input-increment-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getIncrementTriggerProps(),
  state: (api) => api.getIncrementTriggerState(),
})

export const NumberInputDecrementTrigger = definePart<numberInput.Api, numberInput.DecrementTriggerState>({
  tag: 'ark-number-input-decrement-trigger',
  root,
  target: wrappedButton,
  props: (api) => api.getDecrementTriggerProps(),
  state: (api) => api.getDecrementTriggerState(),
})

export const NumberInputScrubber = definePart<numberInput.Api>({
  tag: 'ark-number-input-scrubber',
  root,
  props: (api) => api.getScrubberProps(),
})

export const NumberInputScrubberCursor = definePart<numberInput.Api>({
  tag: 'ark-number-input-scrubber-cursor',
  root,
  props: (api) => api.getScrubberCursorProps(),
})

export const NumberInputValueText = definePart<numberInput.Api>({
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

export const NumberInputHiddenInput = definePart<numberInput.Api>({
  tag: 'ark-number-input-hidden-input',
  root,
  target: ownInput,
  props: (api) => api.getHiddenInputProps(),
})
