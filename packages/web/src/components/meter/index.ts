import type { Api, Props } from '@zag-js/meter'

import type { RootElement } from '../../utils/define.js'
import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'

export type { Api as MeterApi, MeterValueState } from '@zag-js/meter'
export interface MeterElement extends RootElement<Api, Props>, Pick<Props, 'ids' | 'formatOptions' | 'translations'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-meter': MeterElement
  }
}

export type MeterEventMap = CallbackEvents<Props>
