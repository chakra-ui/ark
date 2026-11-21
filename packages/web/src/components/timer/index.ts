import type { Api, Props } from '@zag-js/timer'

import type { RootElement } from '../../utils/define.js'
import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'

export type { Api as TimerApi } from '@zag-js/timer'
export type TimerElement = RootElement<Api, Props> & Pick<Props, 'ids' | 'translations'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-timer': TimerElement
  }
}

export type TimerEventMap = CallbackEvents<Props>
