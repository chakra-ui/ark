import type { Api, Props } from '@zag-js/steps'

import type { RootElement } from '../../utils/define.js'
import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'

export type { Api as StepsApi, StepItem } from '@zag-js/steps'
export type StepsElement = RootElement<Api, Props> & Partial<Pick<Props, 'items' | 'ids' | 'translations'>>

declare global {
  interface HTMLElementTagNameMap {
    'ark-steps': StepsElement
  }
}

export type StepsEventMap = CallbackEvents<Props>
