import type * as pinInput from '@zag-js/pin-input'
import { definePart, ownInput, wrapped, rootOf } from '../../utils/define.js'
import { inputsOf, inputTag, root } from './shared.js'

definePart<pinInput.Api>({ tag: 'ark-pin-input-label', root, props: (api) => api.getLabelProps() })

definePart<pinInput.Api>({ tag: 'ark-pin-input-control', root, props: (api) => api.getControlProps() })

definePart<pinInput.Api>({
  tag: inputTag,
  root,
  target: wrapped('input'),
  // Adding or removing an input changes `count`
  setup: (_el, rootEl) => {
    rootEl.refresh()
    return () => rootEl.refresh()
  },
  props: (api, el) => {
    const rootEl = rootOf(el, root)
    return rootEl ? api.getInputProps({ index: inputsOf(rootEl).indexOf(el) }) : {}
  },
})

definePart<pinInput.Api>({
  tag: 'ark-pin-input-hidden-input',
  root,
  target: ownInput,
  props: (api) => api.getHiddenInputProps(),
})
