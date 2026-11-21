import type * as angleSlider from '@zag-js/angle-slider'

import { num } from '../../utils/attrs.js'
import { definePart, ownInput } from '../../utils/define.js'
import { root } from './shared.js'

const autoText = new WeakSet<HTMLElement>()

definePart<angleSlider.Api>({
  tag: 'ark-angle-slider-label',
  root,
  props: (api) => api.getLabelProps(),
})

definePart<angleSlider.Api>({
  tag: 'ark-angle-slider-control',
  root,
  props: (api) => api.getControlProps(),
})

definePart<angleSlider.Api>({
  tag: 'ark-angle-slider-thumb',
  root,
  props: (api) => api.getThumbProps(),
})

definePart<angleSlider.Api>({
  tag: 'ark-angle-slider-value-text',
  root,
  props: (api) => api.getValueTextProps(),

  setup: (el) => {
    if (!el.firstChild) autoText.add(el)
  },
  render: (api, el) => {
    if (autoText.has(el)) el.textContent = api.valueAsDegree
  },
})

definePart<angleSlider.Api>({
  tag: 'ark-angle-slider-marker-group',
  root,
  props: (api) => api.getMarkerGroupProps(),
})

definePart<angleSlider.Api>({
  tag: 'ark-angle-slider-marker',
  root,
  props: (api, el) => api.getMarkerProps({ value: num(el, 'value') ?? 0 }),
})

definePart<angleSlider.Api>({
  tag: 'ark-angle-slider-hidden-input',
  root,
  target: ownInput,
  props: (api) => api.getHiddenInputProps(),
})
