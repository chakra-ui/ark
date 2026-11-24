import type { CallbackEvents, FunctionProperties } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/tour'
import type { ActionMethods, RootElement, StateProperties } from '../../utils/define.js'
import type {
  TourActions,
  TourArrow,
  TourArrowTip,
  TourBackdrop,
  TourCloseTrigger,
  TourContent,
  TourControl,
  TourDescription,
  TourPositioner,
  TourProgressText,
  TourSpotlight,
  TourTitle,
} from './parts.js'

export { waitForElement, waitForElementValue, waitForPromise, type WaitOptions } from '@zag-js/tour'
export { waitForEvent, type WaitForEventOptions } from './wait-for-event.js'
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
    'ark-tour-backdrop': InstanceType<typeof TourBackdrop>
    'ark-tour-spotlight': InstanceType<typeof TourSpotlight>
    'ark-tour-positioner': InstanceType<typeof TourPositioner>
    'ark-tour-content': InstanceType<typeof TourContent>
    'ark-tour-arrow': InstanceType<typeof TourArrow>
    'ark-tour-arrow-tip': InstanceType<typeof TourArrowTip>
    'ark-tour-title': InstanceType<typeof TourTitle>
    'ark-tour-description': InstanceType<typeof TourDescription>
    'ark-tour-progress-text': InstanceType<typeof TourProgressText>
    'ark-tour-close-trigger': InstanceType<typeof TourCloseTrigger>
    'ark-tour-control': InstanceType<typeof TourControl>
    'ark-tour-actions': InstanceType<typeof TourActions>
  }
}

export type TourEventMap = CallbackEvents<Props>
