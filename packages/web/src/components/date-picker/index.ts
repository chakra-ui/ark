import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, DateView, Props } from '@zag-js/date-picker'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'
import type {
  DatePickerClearTrigger,
  DatePickerContent,
  DatePickerControl,
  DatePickerInput,
  DatePickerLabel,
  DatePickerNextTrigger,
  DatePickerPositioner,
  DatePickerPresetTrigger,
  DatePickerPrevTrigger,
  DatePickerRangeText,
  DatePickerTable,
  DatePickerTableBody,
  DatePickerTableCell,
  DatePickerTableCellTrigger,
  DatePickerTableHead,
  DatePickerTableHeader,
  DatePickerTableRow,
  DatePickerTrigger,
  DatePickerView,
  DatePickerViewControl,
  DatePickerViewTrigger,
} from './parts.js'

export type { Api as DatePickerApi } from '@zag-js/date-picker'
export interface DatePickerElement
  extends
    RootElement<Api, Props>,
    FunctionProperties<Props>,
    Pick<Props, 'ids' | 'translations' | 'positioning'>,
    StateProperties<Props, 'open'> {
  value: string[]
  view: DateView
}

declare global {
  interface HTMLElementTagNameMap {
    'ark-date-picker': DatePickerElement
    'ark-date-picker-label': InstanceType<typeof DatePickerLabel>
    'ark-date-picker-input': InstanceType<typeof DatePickerInput>
    'ark-date-picker-trigger': InstanceType<typeof DatePickerTrigger>
    'ark-date-picker-clear-trigger': InstanceType<typeof DatePickerClearTrigger>
    'ark-date-picker-preset-trigger': InstanceType<typeof DatePickerPresetTrigger>
    'ark-date-picker-positioner': InstanceType<typeof DatePickerPositioner>
    'ark-date-picker-view': InstanceType<typeof DatePickerView>
    'ark-date-picker-view-control': InstanceType<typeof DatePickerViewControl>
    'ark-date-picker-prev-trigger': InstanceType<typeof DatePickerPrevTrigger>
    'ark-date-picker-next-trigger': InstanceType<typeof DatePickerNextTrigger>
    'ark-date-picker-view-trigger': InstanceType<typeof DatePickerViewTrigger>
    'ark-date-picker-range-text': InstanceType<typeof DatePickerRangeText>
    'ark-date-picker-table': InstanceType<typeof DatePickerTable>
    'ark-date-picker-table-head': InstanceType<typeof DatePickerTableHead>
    'ark-date-picker-table-body': InstanceType<typeof DatePickerTableBody>
    'ark-date-picker-table-row': InstanceType<typeof DatePickerTableRow>
    'ark-date-picker-table-header': InstanceType<typeof DatePickerTableHeader>
    'ark-date-picker-table-cell': InstanceType<typeof DatePickerTableCell>
    'ark-date-picker-table-cell-trigger': InstanceType<typeof DatePickerTableCellTrigger>
    'ark-date-picker-control': InstanceType<typeof DatePickerControl>
    'ark-date-picker-content': InstanceType<typeof DatePickerContent>
  }
}

export type DatePickerEventMap = CallbackEvents<Props>
