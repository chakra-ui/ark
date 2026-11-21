import type * as progress from '@zag-js/progress'
import { spreadProps } from '@zag-js/vanilla'
import { str } from '../../utils/attrs.js'
import { definePart, wrapped, type RootElement } from '../../utils/define.js'
import { root } from './shared.js'

const autoText = new WeakSet<HTMLElement>()

definePart<progress.Api>({ tag: 'ark-progress-label', root, props: (api) => api.getLabelProps() })

definePart<progress.Api>({
  tag: 'ark-progress-value-text',
  root,
  setup: (el) => {
    if (!el.firstChild) autoText.add(el)
  },
  props: (api) => api.getValueTextProps(),
  render: (api, el) => {
    if (autoText.has(el)) el.textContent = api.percentAsString
  },
})

definePart<progress.Api>({ tag: 'ark-progress-track', root, props: (api) => api.getTrackProps() })

definePart<progress.Api>({ tag: 'ark-progress-range', root, props: (api) => api.getRangeProps() })

definePart<progress.Api>({
  tag: 'ark-progress-view',
  root,
  props: (api, el) => api.getViewProps({ state: str<progress.ProgressState>(el, 'state') ?? 'loading' }),
})

// Custom elements can't live inside <svg>, so the circle part also props its first two <circle>s: track, then range
definePart<progress.Api>({
  tag: 'ark-progress-circle',
  root,
  target: wrapped('svg'),
  props: (api) => api.getCircleProps(),
  render: (api, el) => {
    const [track, range] = el.querySelectorAll<SVGCircleElement>(':scope > svg > circle')
    const machineId = el.closest<RootElement<progress.Api>>(root)!.machineId
    if (track) spreadProps(track as unknown as HTMLElement, api.getCircleTrackProps(), machineId)
    if (range) spreadProps(range as unknown as HTMLElement, api.getCircleRangeProps(), machineId)
  },
})
