import type * as progress from '@zag-js/progress'
import { spreadProps } from '@zag-js/vanilla'
import { str } from '../../utils/attrs.js'
import { definePart, wrapped, type RootElement, rootOf } from '../../utils/define.js'
import { root } from './shared.js'

const autoText = new WeakSet<HTMLElement>()

export const ProgressLabel = definePart<progress.Api>({
  tag: 'ark-progress-label',
  root,
  props: (api) => api.getLabelProps(),
})

export const ProgressValueText = definePart<progress.Api>({
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

export const ProgressTrack = definePart<progress.Api>({
  tag: 'ark-progress-track',
  root,
  props: (api) => api.getTrackProps(),
})

export const ProgressRange = definePart<progress.Api>({
  tag: 'ark-progress-range',
  root,
  props: (api) => api.getRangeProps(),
})

const viewOf = (el: HTMLElement): progress.ViewProps => ({
  state: str<progress.ProgressState>(el, 'state') ?? 'loading',
})

export const ProgressView = definePart<progress.Api, progress.ViewState>({
  tag: 'ark-progress-view',
  root,
  attributes: ['state'],
  props: (api, el) => api.getViewProps(viewOf(el)),
  state: (api, el) => api.getViewState(viewOf(el)),
})

// Custom elements can't live inside <svg>, so the circle part also props its first two <circle>s: track, then range
export const ProgressCircle = definePart<progress.Api>({
  tag: 'ark-progress-circle',
  root,
  target: wrapped('svg'),
  props: (api) => api.getCircleProps(),
  render: (api, el) => {
    const [track, range] = el.querySelectorAll<SVGCircleElement>(':scope > svg > circle')
    const machineId = rootOf<RootElement<progress.Api>>(el, root)!.machineId
    if (track) spreadProps(track as unknown as HTMLElement, api.getCircleTrackProps(), machineId)
    if (range) spreadProps(range as unknown as HTMLElement, api.getCircleRangeProps(), machineId)
  },
})
