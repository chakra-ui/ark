import { DatePicker } from '@ark-ui/react/date-picker'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { datePicker } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(datePicker)

export const Root = withProvider(styled(DatePicker.Root), 'root')
export const ClearTrigger = withContext(styled(DatePicker.ClearTrigger), 'clearTrigger')
export const Content = withContext(styled(DatePicker.Content), 'content')
export const Control = withContext(styled(DatePicker.Control), 'control')
export const Input = withContext(styled(DatePicker.Input), 'input')
export const Label = withContext(styled(DatePicker.Label), 'label')
export const MonthSelect = withContext(styled(DatePicker.MonthSelect), 'monthSelect')
export const NextTrigger = withContext(styled(DatePicker.NextTrigger), 'nextTrigger')
export const Positioner = withContext(styled(DatePicker.Positioner), 'positioner')
export const PrevTrigger = withContext(styled(DatePicker.PrevTrigger), 'prevTrigger')
export const RangeText = withContext(styled(DatePicker.RangeText), 'rangeText')
export const Table = withContext(styled(DatePicker.Table), 'table')
export const TableBody = withContext(styled(DatePicker.TableBody), 'tableBody')
export const TableCell = withContext(styled(DatePicker.TableCell), 'tableCell')
export const TableCellTrigger = withContext(styled(DatePicker.TableCellTrigger), 'tableCellTrigger')
export const TableHead = withContext(styled(DatePicker.TableHead), 'tableHead')
export const TableHeader = withContext(styled(DatePicker.TableHeader), 'tableHeader')
export const TableRow = withContext(styled(DatePicker.TableRow), 'tableRow')
export const Trigger = withContext(styled(DatePicker.Trigger), 'trigger')
export const View = withContext(styled(DatePicker.View), 'view')
export const ViewControl = withContext(styled(DatePicker.ViewControl), 'viewControl')
export const ViewTrigger = withContext(styled(DatePicker.ViewTrigger), 'viewTrigger')
export const YearSelect = withContext(styled(DatePicker.YearSelect), 'yearSelect')
export const Context = DatePicker.Context

export interface RootProps extends ComponentProps<typeof Root> {}
export interface ClearTriggerProps extends ComponentProps<typeof ClearTrigger> {}
export interface ContentProps extends ComponentProps<typeof Content> {}
export interface ControlProps extends ComponentProps<typeof Control> {}
export interface InputProps extends ComponentProps<typeof Input> {}
export interface LabelProps extends ComponentProps<typeof Label> {}
export interface MonthSelectProps extends ComponentProps<typeof MonthSelect> {}
export interface NextTriggerProps extends ComponentProps<typeof NextTrigger> {}
export interface PositionerProps extends ComponentProps<typeof Positioner> {}
export interface PrevTriggerProps extends ComponentProps<typeof PrevTrigger> {}
export interface RangeTextProps extends ComponentProps<typeof RangeText> {}
export interface TableProps extends ComponentProps<typeof Table> {}
export interface TableBodyProps extends ComponentProps<typeof TableBody> {}
export interface TableCellProps extends ComponentProps<typeof TableCell> {}
export interface TableCellTriggerProps extends ComponentProps<typeof TableCellTrigger> {}
export interface TableHeadProps extends ComponentProps<typeof TableHead> {}
export interface TableHeaderProps extends ComponentProps<typeof TableHeader> {}
export interface TableRowProps extends ComponentProps<typeof TableRow> {}
export interface TriggerProps extends ComponentProps<typeof Trigger> {}
export interface ViewProps extends ComponentProps<typeof View> {}
export interface ViewControlProps extends ComponentProps<typeof ViewControl> {}
export interface ViewTriggerProps extends ComponentProps<typeof ViewTrigger> {}
export interface YearSelectProps extends ComponentProps<typeof YearSelect> {}
