import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/date-input'
import type { RootElement } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'

export type { Api as DateInputApi, DateSegment } from '@zag-js/date-input'
export interface DateInputElement
  extends RootElement<Api, Props>, FunctionProperties<Props>, Pick<Props, 'ids' | 'translations' | 'formatter'> {
  value: string[]
}

declare global {
  interface HTMLElementTagNameMap {
    'ark-date-input': DateInputElement
  }
}

export type DateInputEventMap = CallbackEvents<Props>
