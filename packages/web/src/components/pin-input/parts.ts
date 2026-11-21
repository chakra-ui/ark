import type * as pinInput from '@zag-js/pin-input'
import { definePart, ownInput, wrapped, rootOf } from '../../utils/define.js'
import { inputsOf, inputTag, root } from './shared.js'

const inputProps = (el: HTMLElement) => {
  const rootEl = rootOf(el, root)
  return rootEl ? { index: inputsOf(rootEl).indexOf(el) } : undefined
}

export const PinInputLabel = definePart<pinInput.Api>({
  tag: 'ark-pin-input-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const PinInputControl = definePart<pinInput.Api>({
  tag: 'ark-pin-input-control',
  root,
  props: (api) => api.getControlProps(),
})

export const PinInputInput = definePart<pinInput.Api, pinInput.InputState | undefined>({
  tag: inputTag,
  root,
  target: wrapped('input'),
  // Adding or removing an input changes `count`
  setup: (_el, rootEl) => {
    rootEl.refresh()
    return () => rootEl.refresh()
  },
  props: (api, el) => {
    const props = inputProps(el)
    return props ? api.getInputProps(props) : {}
  },
  state: (api, el) => {
    const props = inputProps(el)
    return props ? api.getInputState(props) : undefined
  },
})

export const PinInputHiddenInput = definePart<pinInput.Api>({
  tag: 'ark-pin-input-hidden-input',
  root,
  target: ownInput,
  props: (api) => api.getHiddenInputProps(),
})
