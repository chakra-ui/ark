import type * as angleSlider from '@zag-js/angle-slider'

import { num } from '../../utils/attrs.js'
import { definePart, ownInput } from '../../utils/define.js'
import { root } from './shared.js'

const autoText = new WeakSet<HTMLElement>()

export const AngleSliderLabel = definePart<angleSlider.Api>({
  tag: 'ark-angle-slider-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const AngleSliderControl = definePart<angleSlider.Api>({
  tag: 'ark-angle-slider-control',
  root,
  props: (api) => api.getControlProps(),
})

export const AngleSliderThumb = definePart<angleSlider.Api>({
  tag: 'ark-angle-slider-thumb',
  root,
  props: (api) => api.getThumbProps(),
})

export const AngleSliderValueText = definePart<angleSlider.Api>({
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

export const AngleSliderMarkerGroup = definePart<angleSlider.Api>({
  tag: 'ark-angle-slider-marker-group',
  root,
  props: (api) => api.getMarkerGroupProps(),
})

export const AngleSliderMarker = definePart<angleSlider.Api, angleSlider.MarkerState>({
  tag: 'ark-angle-slider-marker',
  root,
  attributes: ['value'],
  props: (api, el) => api.getMarkerProps({ value: num(el, 'value') ?? 0 }),
  state: (api, el) => api.getMarkerState({ value: num(el, 'value') ?? 0 }),
})

export const AngleSliderHiddenInput = definePart<angleSlider.Api>({
  tag: 'ark-angle-slider-hidden-input',
  root,
  target: ownInput,
  props: (api) => api.getHiddenInputProps(),
})
