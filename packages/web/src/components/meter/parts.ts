import type * as meter from '@zag-js/meter'

import { definePart } from '../../utils/define.js'
import { root } from './shared.js'

const autoText = new WeakSet<HTMLElement>()

definePart<meter.Api>({
  tag: 'ark-meter-label',
  root,
  props: (api) => api.getLabelProps(),
})

definePart<meter.Api>({
  tag: 'ark-meter-value-text',
  root,
  props: (api) => api.getValueTextProps(),

  setup: (el) => {
    if (!el.firstChild) autoText.add(el)
  },
  render: (api, el) => {
    if (autoText.has(el)) el.textContent = api.valueAsString
  },
})

definePart<meter.Api>({
  tag: 'ark-meter-track',
  root,
  props: (api) => api.getTrackProps(),
})

definePart<meter.Api>({
  tag: 'ark-meter-range',
  root,
  props: (api) => api.getIndicatorProps(),
})
