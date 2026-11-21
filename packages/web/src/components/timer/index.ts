import type { Api, Props } from '@zag-js/timer'

import type { ActionMethods, RootElement } from '../../utils/define.js'
import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { TimerArea, TimerItem, TimerSeparator, TimerControl, TimerActionTrigger } from './parts.js'

export type { Api as TimerApi } from '@zag-js/timer'
export interface TimerElement
  extends
    ActionMethods<Api, 'start' | 'pause' | 'resume' | 'reset' | 'restart'>,
    RootElement<Api, Props>,
    Pick<Props, 'ids' | 'translations'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-timer': TimerElement
    'ark-timer-area': InstanceType<typeof TimerArea>
    'ark-timer-item': InstanceType<typeof TimerItem>
    'ark-timer-separator': InstanceType<typeof TimerSeparator>
    'ark-timer-control': InstanceType<typeof TimerControl>
    'ark-timer-action-trigger': InstanceType<typeof TimerActionTrigger>
  }
}

export type TimerEventMap = CallbackEvents<Props>
