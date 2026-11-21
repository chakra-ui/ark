import type { Api, Props } from '@zag-js/steps'

import type { RootElement, StateProperties } from '../../utils/define.js'
import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type {
  StepsList,
  StepsItem,
  StepsTrigger,
  StepsIndicator,
  StepsSeparator,
  StepsContent,
  StepsCompletedContent,
  StepsPrevTrigger,
  StepsNextTrigger,
  StepsSkipTrigger,
  StepsProgress,
} from './parts.js'

export type { Api as StepsApi, StepItem } from '@zag-js/steps'
export interface StepsElement
  extends
    RootElement<Api, Props>,
    Partial<Pick<Props, 'items' | 'ids' | 'translations'>>,
    StateProperties<Props, 'completedValues'> {
  value: string | null
}

declare global {
  interface HTMLElementTagNameMap {
    'ark-steps': StepsElement
    'ark-steps-list': InstanceType<typeof StepsList>
    'ark-steps-item': InstanceType<typeof StepsItem>
    'ark-steps-trigger': InstanceType<typeof StepsTrigger>
    'ark-steps-indicator': InstanceType<typeof StepsIndicator>
    'ark-steps-separator': InstanceType<typeof StepsSeparator>
    'ark-steps-content': InstanceType<typeof StepsContent>
    'ark-steps-completed-content': InstanceType<typeof StepsCompletedContent>
    'ark-steps-prev-trigger': InstanceType<typeof StepsPrevTrigger>
    'ark-steps-next-trigger': InstanceType<typeof StepsNextTrigger>
    'ark-steps-skip-trigger': InstanceType<typeof StepsSkipTrigger>
    'ark-steps-progress': InstanceType<typeof StepsProgress>
  }
}

export type StepsEventMap = CallbackEvents<Props>
