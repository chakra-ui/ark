import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/date-input'
import type { RootElement } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'
import type {
  DateInputLabel,
  DateInputControl,
  DateInputSegmentGroup,
  DateInputSegment,
  DateInputClearTrigger,
  DateInputHiddenInput,
} from './parts.js'

export type { Api as DateInputApi, DateSegment } from '@zag-js/date-input'
export interface DateInputElement
  extends RootElement<Api, Props>, FunctionProperties<Props>, Pick<Props, 'ids' | 'translations' | 'formatter'> {
  value: string[]
}

declare global {
  interface HTMLElementTagNameMap {
    'ark-date-input': DateInputElement
    'ark-date-input-label': InstanceType<typeof DateInputLabel>
    'ark-date-input-control': InstanceType<typeof DateInputControl>
    'ark-date-input-segment-group': InstanceType<typeof DateInputSegmentGroup>
    'ark-date-input-segment': InstanceType<typeof DateInputSegment>
    'ark-date-input-clear-trigger': InstanceType<typeof DateInputClearTrigger>
    'ark-date-input-hidden-input': InstanceType<typeof DateInputHiddenInput>
  }
}

export type DateInputEventMap = CallbackEvents<Props>
