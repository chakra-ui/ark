import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, DateView, Props } from '@zag-js/date-picker'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'

export type { Api as DatePickerApi } from '@zag-js/date-picker'
export type DatePickerElement = RootElement<Api, Props> &
  FunctionProperties<Props> &
  Pick<Props, 'ids' | 'translations' | 'positioning'> &
  StateProperties<Props, 'open'> & { value: string[]; view: DateView }

declare global {
  interface HTMLElementTagNameMap {
    'ark-date-picker': DatePickerElement
  }
}

export type DatePickerEventMap = CallbackEvents<Props>
