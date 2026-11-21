import type * as slider from '@zag-js/slider'
import { num, str } from '../../utils/attrs.js'
import { definePart, ownInput } from '../../utils/define.js'
import { root } from './shared.js'

const indexOf = (part: HTMLElement) => Number(part.closest('ark-slider-thumb')?.getAttribute('index') ?? 0)

const autoText = new WeakSet<HTMLElement>()

definePart<slider.Api>({ tag: 'ark-slider-label', root, props: (api) => api.getLabelProps() })

definePart<slider.Api>({
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

definePart<slider.Api>({ tag: 'ark-slider-control', root, props: (api) => api.getControlProps() })

definePart<slider.Api>({ tag: 'ark-slider-track', root, props: (api) => api.getTrackProps() })

definePart<slider.Api>({ tag: 'ark-slider-range', root, props: (api) => api.getRangeProps() })

definePart<slider.Api>({
  tag: 'ark-slider-thumb',
  root,
  props: (api, el) => api.getThumbProps({ index: indexOf(el), name: str(el, 'name') }),
})

definePart<slider.Api>({
  tag: 'ark-slider-dragging-indicator',
  root,
  setup: (el) => {
    if (!el.firstChild) autoText.add(el)
  },
  props: (api, el) => api.getDraggingIndicatorProps({ index: indexOf(el) }),
  render: (api, el) => {
    if (autoText.has(el)) el.textContent = String(api.getThumbValue(indexOf(el)))
  },
})

definePart<slider.Api>({
  tag: 'ark-slider-hidden-input',
  root,
  target: ownInput,
  props: (api, el) => api.getHiddenInputProps({ index: indexOf(el) }),
})

definePart<slider.Api>({ tag: 'ark-slider-marker-group', root, props: (api) => api.getMarkerGroupProps() })

definePart<slider.Api>({
  tag: 'ark-slider-marker',
  root,
  props: (api, el) => api.getMarkerProps({ value: num(el, 'value') ?? 0 }),
})
