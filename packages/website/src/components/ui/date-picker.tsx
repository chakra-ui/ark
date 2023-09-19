import * as Ark from '@ark-ui/react/date-picker'
import { styled } from 'styled-system/jsx'
import { datePicker, type DatePickerVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(datePicker)

export * from '@ark-ui/react/date-picker'
export type DatePickerProps = Ark.DatePickerProps & DatePickerVariantProps

const DatePickerRoot = withProvider(styled(Ark.DatePicker.Root))
export const DatePickerClearTrigger = withContext(
  styled(Ark.DatePicker.ClearTrigger),
  'clearTrigger',
)
export const DatePickerColumnHeader = withContext(
  styled(Ark.DatePicker.ColumnHeader),
  'columnHeader',
)
export const DatePickerContent = withContext(styled(Ark.DatePicker.Content), 'content')
export const DatePickerControl = withContext(styled(Ark.DatePicker.Control), 'control')
export const DatePickerDayCell = withContext(styled(Ark.DatePicker.DayCell), 'cellTrigger')
export const DatePickerDayCellTrigger = withContext(
  styled(Ark.DatePicker.DayCellTrigger),
  'cellTrigger',
)
export const DatePickerGrid = withContext(styled(Ark.DatePicker.Grid), 'grid')
export const DatePickerInput = withContext(styled(Ark.DatePicker.Input), 'input')
export const DatePickerMonthCell = withContext(styled(Ark.DatePicker.MonthCell))
export const DatePickerMonthCellTrigger = withContext(
  styled(Ark.DatePicker.MonthCellTrigger),
  'cellTrigger',
)
export const DatePickerMonthSelect = withContext(styled(Ark.DatePicker.MonthSelect), 'monthSelect')
export const DatePickerNextTrigger = withContext(styled(Ark.DatePicker.NextTrigger), 'nextTrigger')
export const DatePickerPositioner = withContext(styled(Ark.DatePicker.Positioner), 'positioner')
export const DatePickerPrevTrigger = withContext(styled(Ark.DatePicker.PrevTrigger), 'prevTrigger')
export const DatePickerRow = withContext(styled(Ark.DatePicker.Row), 'row')
export const DatePickerRowGroup = withContext(styled(Ark.DatePicker.RowGroup), 'rowGroup')
export const DatePickerRowHeader = withContext(styled(Ark.DatePicker.RowHeader), 'rowHeader')
export const DatePickerTrigger = withContext(styled(Ark.DatePicker.Trigger), 'trigger')
export const DatePickerViewTrigger = withContext(styled(Ark.DatePicker.ViewTrigger), 'viewTrigger')
export const DatePickerYearCell = withContext(styled(Ark.DatePicker.YearCell))
export const DatePickerYearCellTrigger = withContext(
  styled(Ark.DatePicker.YearCellTrigger),
  'cellTrigger',
)
export const DatePickerYearSelect = withContext(styled(Ark.DatePicker.YearSelect), 'yearSelect')

export const DatePicker = Object.assign(DatePickerRoot, {
  Root: DatePickerRoot,
  ClearTrigger: DatePickerClearTrigger,
  ColumnHeader: DatePickerColumnHeader,
  Content: DatePickerContent,
  Control: DatePickerControl,
  DayCell: DatePickerDayCell,
  DayCellTrigger: DatePickerDayCellTrigger,
  Grid: DatePickerGrid,
  Input: DatePickerInput,
  MonthCell: DatePickerMonthCell,
  MonthCellTrigger: DatePickerMonthCellTrigger,
  MonthSelect: DatePickerMonthSelect,
  NextTrigger: DatePickerNextTrigger,
  Positioner: DatePickerPositioner,
  PrevTrigger: DatePickerPrevTrigger,
  Row: DatePickerRow,
  RowGroup: DatePickerRowGroup,
  RowHeader: DatePickerRowHeader,
  Trigger: DatePickerTrigger,
  ViewTrigger: DatePickerViewTrigger,
  YearCell: DatePickerYearCell,
  YearCellTrigger: DatePickerYearCellTrigger,
  YearSelect: DatePickerYearSelect,
})
