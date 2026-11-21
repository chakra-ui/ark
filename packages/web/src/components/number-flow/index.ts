import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/number-flow'
import type { RootElement, StateProperties } from '../../utils/define.js'

export type { Api as NumberFlowApi, ValueChangeDetails as NumberFlowValueChangeDetails } from '@zag-js/number-flow'
export interface NumberFlowElement
  extends
    RootElement<Api, Props>,
    Pick<Props, 'ids' | 'formatOptions' | 'spinTiming' | 'transformTiming'>,
    StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-number-flow': NumberFlowElement
  }
}

export type NumberFlowEventMap = CallbackEvents<Props>
