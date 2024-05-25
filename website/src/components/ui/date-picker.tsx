'use client'
import type { Assign } from '@ark-ui/react'
import { DatePicker } from '@ark-ui/react/date-picker'
import { type DatePickerVariantProps, datePicker } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(datePicker)

export interface RootProps
  extends Assign<JsxStyleProps, DatePicker.RootProps>,
    DatePickerVariantProps {}
export const Root = withProvider<HTMLDivElement, RootProps>(DatePicker.Root, 'root')

export const ClearTrigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, DatePicker.ClearTriggerProps>
>(DatePicker.ClearTrigger, 'clearTrigger')

export const Content = withContext<HTMLDivElement, Assign<JsxStyleProps, DatePicker.ContentProps>>(
  DatePicker.Content,
  'content',
)

export const Control = withContext<HTMLDivElement, Assign<JsxStyleProps, DatePicker.ControlProps>>(
  DatePicker.Control,
  'control',
)

export const Input = withContext<HTMLInputElement, Assign<JsxStyleProps, DatePicker.InputProps>>(
  DatePicker.Input,
  'input',
)

export const Label = withContext<HTMLLabelElement, Assign<JsxStyleProps, DatePicker.LabelProps>>(
  DatePicker.Label,
  'label',
)

export const MonthSelect = withContext<
  HTMLSelectElement,
  Assign<JsxStyleProps, DatePicker.MonthSelectProps>
>(DatePicker.MonthSelect, 'monthSelect')

export const NextTrigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, DatePicker.NextTriggerProps>
>(DatePicker.NextTrigger, 'nextTrigger')

export const Positioner = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, DatePicker.MonthSelectProps>
>(DatePicker.Positioner, 'positioner')

export const PresetTrigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, DatePicker.PresetTriggerProps>
>(DatePicker.PresetTrigger, 'presetTrigger')

export const PrevTrigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, DatePicker.PrevTriggerProps>
>(DatePicker.PrevTrigger, 'prevTrigger')

export const RangeText = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, DatePicker.RangeTextProps>
>(DatePicker.RangeText, 'rangeText')

export const TableBody = withContext<
  HTMLTableSectionElement,
  Assign<JsxStyleProps, DatePicker.TableBodyProps>
>(DatePicker.TableBody, 'tableBody')

export const TableCell = withContext<
  HTMLTableCellElement,
  Assign<JsxStyleProps, DatePicker.TableCellProps>
>(DatePicker.TableCell, 'tableCell')

export const TableCellTrigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, DatePicker.TableCellTriggerProps>
>(DatePicker.TableCellTrigger, 'tableCellTrigger')

export const TableHead = withContext<
  HTMLTableSectionElement,
  Assign<JsxStyleProps, DatePicker.TableHeadProps>
>(DatePicker.TableHead, 'tableHead')

export const TableHeader = withContext<
  HTMLTableCellElement,
  Assign<JsxStyleProps, DatePicker.TableHeaderProps>
>(DatePicker.TableHeader, 'tableHeader')

export const Table = withContext<HTMLTableElement, Assign<JsxStyleProps, DatePicker.TableProps>>(
  DatePicker.Table,
  'table',
)

export const TableRow = withContext<
  HTMLTableRowElement,
  Assign<JsxStyleProps, DatePicker.TableRowProps>
>(DatePicker.TableRow, 'tableRow')

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, DatePicker.TriggerProps>
>(DatePicker.Trigger, 'trigger')

export const ViewControl = withContext<
  HTMLDivElement,
  Assign<JsxStyleProps, DatePicker.ViewControlProps>
>(DatePicker.ViewControl, 'viewControl')

export const View = withContext<HTMLDivElement, Assign<JsxStyleProps, DatePicker.ViewProps>>(
  DatePicker.View,
  'view',
)

export const ViewTrigger = withContext<
  HTMLButtonElement,
  Assign<JsxStyleProps, DatePicker.ViewTriggerProps>
>(DatePicker.ViewTrigger, 'viewTrigger')

export const YearSelect = withContext<
  HTMLSelectElement,
  Assign<JsxStyleProps, DatePicker.YearSelectProps>
>(DatePicker.YearSelect, 'yearSelect')

export {
  DatePickerContext as Context,
  type DatePickerContextProps as ContextProps,
} from '@ark-ui/react/date-picker'
