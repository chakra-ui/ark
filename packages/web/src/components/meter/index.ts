import type { Api, Props } from '@zag-js/meter'

import type { RootElement } from '../../utils/define.js'
import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { MeterLabel, MeterValueText, MeterTrack, MeterRange } from './parts.js'

export type { Api as MeterApi, MeterValueState } from '@zag-js/meter'
export interface MeterElement extends RootElement<Api, Props>, Pick<Props, 'ids' | 'formatOptions' | 'translations'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-meter': MeterElement
    'ark-meter-label': InstanceType<typeof MeterLabel>
    'ark-meter-value-text': InstanceType<typeof MeterValueText>
    'ark-meter-track': InstanceType<typeof MeterTrack>
    'ark-meter-range': InstanceType<typeof MeterRange>
  }
}

export type MeterEventMap = CallbackEvents<Props>
