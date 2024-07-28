'use client'
import type { Assign } from '@ark-ui/react'
import { DatePicker } from '@ark-ui/react/date-picker'
import { type DatePickerVariantProps, datePicker } from 'styled-system/recipes'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(datePicker)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, DatePicker.RootProviderBaseProps>, DatePickerVariantProps>
>(DatePicker.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<Assign<HTMLStyledProps<'div'>, DatePicker.RootBaseProps>, DatePickerVariantProps>
>(DatePicker.Root, 'root')

export const ClearTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, DatePicker.ClearTriggerBaseProps>
>(DatePicker.ClearTrigger, 'clearTrigger')

export const Content = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, DatePicker.ContentBaseProps>
>(DatePicker.Content, 'content')

export const Control = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, DatePicker.ControlBaseProps>
>(DatePicker.Control, 'control')

export const Input = withContext<
  HTMLInputElement,
  Assign<HTMLStyledProps<'input'>, DatePicker.InputBaseProps>
>(DatePicker.Input, 'input')

export const Label = withContext<
  HTMLLabelElement,
  Assign<HTMLStyledProps<'label'>, DatePicker.LabelBaseProps>
>(DatePicker.Label, 'label')

export const MonthSelect = withContext<
  HTMLSelectElement,
  Assign<HTMLStyledProps<'select'>, DatePicker.MonthSelectBaseProps>
>(DatePicker.MonthSelect, 'monthSelect')

export const NextTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, DatePicker.NextTriggerBaseProps>
>(DatePicker.NextTrigger, 'nextTrigger')

export const Positioner = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, DatePicker.PositionerBaseProps>
>(DatePicker.Positioner, 'positioner')

export const PresetTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, DatePicker.PresetTriggerBaseProps>
>(DatePicker.PresetTrigger, 'presetTrigger')

export const PrevTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, DatePicker.PrevTriggerBaseProps>
>(DatePicker.PrevTrigger, 'prevTrigger')

export const RangeText = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, DatePicker.RangeTextBaseProps>
>(DatePicker.RangeText, 'rangeText')

export const TableBody = withContext<
  HTMLTableSectionElement,
  Assign<HTMLStyledProps<'tbody'>, DatePicker.TableBodyBaseProps>
>(DatePicker.TableBody, 'tableBody')

export const TableCell = withContext<
  HTMLTableCellElement,
  Assign<HTMLStyledProps<'td'>, DatePicker.TableCellBaseProps>
>(DatePicker.TableCell, 'tableCell')

export const TableCellTrigger = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, DatePicker.TableCellTriggerBaseProps>
>(DatePicker.TableCellTrigger, 'tableCellTrigger')

export const TableHead = withContext<
  HTMLTableSectionElement,
  Assign<HTMLStyledProps<'thead'>, DatePicker.TableHeadBaseProps>
>(DatePicker.TableHead, 'tableHead')

export const TableHeader = withContext<
  HTMLTableCellElement,
  Assign<HTMLStyledProps<'th'>, DatePicker.TableHeaderBaseProps>
>(DatePicker.TableHeader, 'tableHeader')

export const Table = withContext<
  HTMLTableElement,
  Assign<HTMLStyledProps<'table'>, DatePicker.TableBaseProps>
>(DatePicker.Table, 'table')

export const TableRow = withContext<
  HTMLTableRowElement,
  Assign<HTMLStyledProps<'tr'>, DatePicker.TableRowBaseProps>
>(DatePicker.TableRow, 'tableRow')

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, DatePicker.TriggerBaseProps>
>(DatePicker.Trigger, 'trigger')

export const ViewControl = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, DatePicker.ViewControlBaseProps>
>(DatePicker.ViewControl, 'viewControl')

export const View = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, DatePicker.ViewBaseProps>
>(DatePicker.View, 'view')

export const ViewTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, DatePicker.ViewTriggerBaseProps>
>(DatePicker.ViewTrigger, 'viewTrigger')

export const YearSelect = withContext<
  HTMLSelectElement,
  Assign<HTMLStyledProps<'select'>, DatePicker.YearSelectBaseProps>
>(DatePicker.YearSelect, 'yearSelect')

export { DatePickerContext as Context } from '@ark-ui/react/date-picker'
