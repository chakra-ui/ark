import type * as numberFlow from '@zag-js/number-flow'

import { definePart, rootOf, type RootElement } from '../../utils/define.js'
import { renderSegments, root } from './shared.js'

const idOf = (el: HTMLElement) => rootOf<RootElement<numberFlow.Api> & HTMLElement>(el, root)?.machineId

export const NumberFlowSegments = definePart<numberFlow.Api>({
  tag: 'ark-number-flow-segments',
  root,
  display: 'contents',
  props: () => ({}),
  render: (api, el) => renderSegments(api, el, idOf(el) ?? ''),
})

export const NumberFlowValueText = definePart<numberFlow.Api>({
  tag: 'ark-number-flow-value-text',
  root,
  props: (api) => api.getValueTextProps(),
  render: (api, el) => {
    if (el.textContent !== api.announcedValueText) el.textContent = api.announcedValueText
  },
})
