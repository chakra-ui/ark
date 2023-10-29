import * as Ark from '@ark-ui/react/src/date-picker'
import { styled } from 'styled-system/jsx'
import { datePicker, type DatePickerVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(datePicker)

export * from '@ark-ui/react/src/date-picker'
export type DatePickerProps = Ark.DatePickerProps & DatePickerVariantProps

const DatePickerRoot = withProvider(styled(Ark.DatePicker.Root), 'root')
export const DatePickerClearTrigger = withContext(
  styled(Ark.DatePicker.ClearTrigger),
  'clearTrigger',
)
export const DatePickerContent = withContext(styled(Ark.DatePicker.Content), 'content')
export const DatePickerControl = withContext(styled(Ark.DatePicker.Control), 'control')
export const DatePickerInput = withContext(styled(Ark.DatePicker.Input), 'input')
export const DatePickerLabel = withContext(styled(Ark.DatePicker.Label), 'label')
export const DatePickerMonthSelect = withContext(styled(Ark.DatePicker.MonthSelect), 'monthSelect')
export const DatePickerNextTrigger = withContext(styled(Ark.DatePicker.NextTrigger), 'nextTrigger')
export const DatePickerPositioner = withContext(styled(Ark.DatePicker.Positioner), 'positioner')
export const DatePickerPrevTrigger = withContext(styled(Ark.DatePicker.PrevTrigger), 'prevTrigger')
export const DatePickerRangeText = withContext(styled(Ark.DatePicker.RangeText), 'rangeText')
export const DatePickerTable = withContext(styled(Ark.DatePicker.Table), 'table')
export const DatePickerTableBody = withContext(styled(Ark.DatePicker.TableBody), 'tableBody')
export const DatePickerTableCell = withContext(styled(Ark.DatePicker.TableCell), 'tableCell')
export const DatePickerTableCellTrigger = withContext(
  styled(Ark.DatePicker.TableCellTrigger),
  'tableCellTrigger',
)
export const DatePickerTableHead = withContext(styled(Ark.DatePicker.TableHead), 'tableHead')
export const DatePickerTableHeader = withContext(styled(Ark.DatePicker.TableHeader), 'tableHeader')
export const DatePickerTableRow = withContext(styled(Ark.DatePicker.TableRow), 'tableRow')
export const DatePickerTrigger = withContext(styled(Ark.DatePicker.Trigger), 'trigger')
export const DatePickerView = withContext(styled(Ark.DatePicker.View), 'view')
export const DatePickerViewControl = withContext(styled(Ark.DatePicker.ViewControl), 'viewControl')
export const DatePickerViewTrigger = withContext(styled(Ark.DatePicker.ViewTrigger), 'viewTrigger')
export const DatePickerYearSelect = withContext(styled(Ark.DatePicker.YearSelect), 'yearSelect')

export const DatePicker = Object.assign(DatePickerRoot, {
  Root: DatePickerRoot,
  ClearTrigger: DatePickerClearTrigger,
  Content: DatePickerContent,
  Control: DatePickerControl,
  Input: DatePickerInput,
  Label: DatePickerLabel,
  MonthSelect: DatePickerMonthSelect,
  NextTrigger: DatePickerNextTrigger,
  Positioner: DatePickerPositioner,
  PrevTrigger: DatePickerPrevTrigger,
  RangeText: DatePickerRangeText,
  Table: DatePickerTable,
  TableBody: DatePickerTableBody,
  TableCell: DatePickerTableCell,
  TableCellTrigger: DatePickerTableCellTrigger,
  TableHead: DatePickerTableHead,
  TableHeader: DatePickerTableHeader,
  TableRow: DatePickerTableRow,
  Trigger: DatePickerTrigger,
  View: DatePickerView,
  ViewControl: DatePickerViewControl,
  ViewTrigger: DatePickerViewTrigger,
  YearSelect: DatePickerYearSelect,
})
