import type * as slider from '@zag-js/slider'
import { num, str } from '../../utils/attrs.js'
import { definePart, ownInput } from '../../utils/define.js'
import { root } from './shared.js'

const indexOf = (part: HTMLElement) => Number(part.closest<HTMLElement>('ark-slider-thumb')?.getAttribute('index') ?? 0)

const autoText = new WeakSet<HTMLElement>()

export const SliderLabel = definePart<slider.Api>({
  tag: 'ark-slider-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const SliderValueText = definePart<slider.Api>({
  tag: 'ark-slider-value-text',
  root,
  setup: (el) => {
    if (!el.firstChild) autoText.add(el)
  },
  props: (api) => api.getValueTextProps(),
  render: (api, el) => {
    if (autoText.has(el)) el.textContent = api.value.join(', ')
  },
})

export const SliderControl = definePart<slider.Api>({
  tag: 'ark-slider-control',
  root,
  props: (api) => api.getControlProps(),
})

export const SliderTrack = definePart<slider.Api>({
  tag: 'ark-slider-track',
  root,
  props: (api) => api.getTrackProps(),
})

export const SliderRange = definePart<slider.Api>({
  tag: 'ark-slider-range',
  root,
  props: (api) => api.getRangeProps(),
})

export const SliderThumb = definePart<slider.Api, slider.ThumbState>({
  tag: 'ark-slider-thumb',
  root,
  attributes: ['index', 'name'],
  props: (api, el) => api.getThumbProps({ index: indexOf(el), name: str(el, 'name') }),
  state: (api, el) => api.getThumbState({ index: indexOf(el), name: str(el, 'name') }),
})

export const SliderDraggingIndicator = definePart<slider.Api, slider.ThumbState>({
  tag: 'ark-slider-dragging-indicator',
  root,
  setup: (el) => {
    if (!el.firstChild) autoText.add(el)
  },
  props: (api, el) => api.getDraggingIndicatorProps({ index: indexOf(el) }),
  state: (api, el) => api.getThumbState({ index: indexOf(el) }),
  render: (api, el) => {
    if (autoText.has(el)) el.textContent = String(api.getThumbValue(indexOf(el)))
  },
})

export const SliderHiddenInput = definePart<slider.Api, slider.ThumbState>({
  tag: 'ark-slider-hidden-input',
  root,
  target: ownInput,
  props: (api, el) => api.getHiddenInputProps({ index: indexOf(el) }),
  state: (api, el) => api.getThumbState({ index: indexOf(el) }),
})

export const SliderMarkerGroup = definePart<slider.Api>({
  tag: 'ark-slider-marker-group',
  root,
  props: (api) => api.getMarkerGroupProps(),
})

export const SliderMarker = definePart<slider.Api, slider.MarkerState>({
  tag: 'ark-slider-marker',
  root,
  attributes: ['value'],
  props: (api, el) => api.getMarkerProps({ value: num(el, 'value') ?? 0 }),
  state: (api, el) => api.getMarkerState({ value: num(el, 'value') ?? 0 }),
})
