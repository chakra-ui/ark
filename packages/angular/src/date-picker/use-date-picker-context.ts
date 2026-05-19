import { InjectionToken, inject, signal, type Signal } from '@angular/core'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type {
  DatePickerDayTableCellProps,
  DatePickerTableCellMachineProps,
  DatePickerTableMachineProps,
  DatePickerView,
  DatePickerViewMachineProps,
} from './date-picker.types'
import type { UseDatePickerReturn } from './use-date-picker'

export const ARK_DATE_PICKER_CONTEXT = new InjectionToken<UseDatePickerReturn>('ARK_DATE_PICKER_CONTEXT')

export function injectArkDatePickerContext(): UseDatePickerReturn {
  return inject(ARK_DATE_PICKER_CONTEXT)
}

export const ARK_DATE_PICKER_CONTEXT_CARRIER = new InjectionToken<ArkContextCarrier<UseDatePickerReturn>>(
  'ARK_DATE_PICKER_CONTEXT_CARRIER',
)

export function injectArkDatePickerContextCarrier(): ArkContextCarrier<UseDatePickerReturn> {
  return inject(ARK_DATE_PICKER_CONTEXT_CARRIER)
}

export type DatePickerViewContext = Signal<Required<DatePickerViewMachineProps>>
export type DatePickerTableContext = Signal<DatePickerTableMachineProps>
export type DatePickerTableCellContext = Signal<DatePickerDayTableCellProps | DatePickerTableCellMachineProps>

const DEFAULT_VIEW_CONTEXT = signal<Required<DatePickerViewMachineProps>>({ view: 'day' })

export const ARK_DATE_PICKER_VIEW_CONTEXT = new InjectionToken<DatePickerViewContext>('ARK_DATE_PICKER_VIEW_CONTEXT')
export const ARK_DATE_PICKER_TABLE_CONTEXT = new InjectionToken<DatePickerTableContext>('ARK_DATE_PICKER_TABLE_CONTEXT')
export const ARK_DATE_PICKER_TABLE_CELL_CONTEXT = new InjectionToken<DatePickerTableCellContext>(
  'ARK_DATE_PICKER_TABLE_CELL_CONTEXT',
)

export function injectArkDatePickerViewContext(): DatePickerViewContext {
  return inject(ARK_DATE_PICKER_VIEW_CONTEXT, { optional: true }) ?? DEFAULT_VIEW_CONTEXT
}

export function injectArkDatePickerTableContext(): DatePickerTableContext {
  return inject(ARK_DATE_PICKER_TABLE_CONTEXT)
}

export function injectArkDatePickerTableCellContext(): DatePickerTableCellContext {
  return inject(ARK_DATE_PICKER_TABLE_CELL_CONTEXT)
}

export function isDatePickerView(value: unknown): value is DatePickerView {
  return value === 'day' || value === 'month' || value === 'year'
}
