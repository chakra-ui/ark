import type { CallbackEvents, FunctionProperties } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/tour'
import type { ActionMethods, RootElement, StateProperties } from '../../utils/define.js'

export type { Api as TourApi, StepDetails as TourStepDetails } from '@zag-js/tour'
export interface TourElement
  extends
    ActionMethods<Api, 'start' | 'next' | 'previous'>,
    RootElement<Api, Props>,
    FunctionProperties<Props>,
    Pick<Props, 'ids' | 'translations' | 'steps' | 'spotlightOffset'>,
    StateProperties<Props, 'stepId'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-tour': TourElement
  }
}

export type TourEventMap = CallbackEvents<Props>
