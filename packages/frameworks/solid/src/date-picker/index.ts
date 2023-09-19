import { DatePicker as DatePickerRoot, type DatePickerProps } from './date-picker'
import { useDatePickerCellContext, type DatePickerCellContext } from './date-picker-cell-context'
import {
  DatePickerClearTrigger,
  type DatePickerClearTriggerProps,
} from './date-picker-clear-trigger'
import {
  DatePickerColumnHeader,
  type DatePickerColumnHeaderProps,
} from './date-picker-column-header'
import { DatePickerContent, type DatePickerContentProps } from './date-picker-content'
import { useDatePickerContext, type DatePickerContext } from './date-picker-context'
import { DatePickerControl, type DatePickerControlProps } from './date-picker-control'
import { DatePickerDayCell, type DatePickerDayCellProps } from './date-picker-day-cell'
import {
  useDatePickerDayCellContext,
  type DatePickerDayCellContext,
} from './date-picker-day-cell-context'
import {
  DatePickerDayCellTrigger,
  type DatePickerDayCellTriggerProps,
} from './date-picker-day-cell-trigger'
import { DatePickerGrid, type DatePickerGridProps } from './date-picker-grid'
import { DatePickerInput, type DatePickerInputProps } from './date-picker-input'
import { DatePickerMonthCell, type DatePickerMonthCellProps } from './date-picker-month-cell'
import {
  DatePickerMonthCellTrigger,
  type DatePickerMonthCellTriggerProps,
} from './date-picker-month-cell-trigger'
import { DatePickerMonthSelect, type DatePickerMonthSelectProps } from './date-picker-month-select'
import { DatePickerNextTrigger, type DatePickerNextTriggerProps } from './date-picker-next-trigger'
import { DatePickerPositioner, type DatePickerPositionerProps } from './date-picker-positioner'
import { DatePickerPrevTrigger, type DatePickerPrevTriggerProps } from './date-picker-prev-trigger'
import { DatePickerRow, type DatePickerRowProps } from './date-picker-row'
import { DatePickerRowGroup, type DatePickerRowGroupProps } from './date-picker-row-group'
import { DatePickerRowHeader, type DatePickerRowHeaderProps } from './date-picker-row-header'
import { DatePickerTrigger, type DatePickerTriggerProps } from './date-picker-trigger'
import { DatePickerViewTrigger, type DatePickerViewTriggerProps } from './date-picker-view-trigger'
import { DatePickerYearCell, type DatePickerYearCellProps } from './date-picker-year-cell'
import {
  DatePickerYearCellTrigger,
  type DatePickerYearCellTriggerProps,
} from './date-picker-year-cell-trigger'
import { DatePickerYearSelect, type DatePickerYearSelectProps } from './date-picker-year-select'

const DatePicker = Object.assign(DatePickerRoot, {
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

export {
  DatePicker,
  DatePickerClearTrigger,
  DatePickerColumnHeader,
  DatePickerContent,
  DatePickerControl,
  DatePickerDayCell,
  DatePickerDayCellTrigger,
  DatePickerGrid,
  DatePickerInput,
  DatePickerMonthCell,
  DatePickerMonthCellTrigger,
  DatePickerMonthSelect,
  DatePickerNextTrigger,
  DatePickerPositioner,
  DatePickerPrevTrigger,
  DatePickerRow,
  DatePickerRowGroup,
  DatePickerRowHeader,
  DatePickerTrigger,
  DatePickerViewTrigger,
  DatePickerYearCell,
  DatePickerYearCellTrigger,
  DatePickerYearSelect,
  useDatePickerCellContext,
  useDatePickerContext,
  useDatePickerDayCellContext,
}

export type {
  DatePickerCellContext,
  DatePickerClearTriggerProps,
  DatePickerColumnHeaderProps,
  DatePickerContentProps,
  DatePickerContext,
  DatePickerControlProps,
  DatePickerDayCellContext,
  DatePickerDayCellProps,
  DatePickerDayCellTriggerProps,
  DatePickerGridProps,
  DatePickerInputProps,
  DatePickerMonthCellProps,
  DatePickerMonthCellTriggerProps,
  DatePickerMonthSelectProps,
  DatePickerNextTriggerProps,
  DatePickerPositionerProps,
  DatePickerPrevTriggerProps,
  DatePickerProps,
  DatePickerRowGroupProps,
  DatePickerRowHeaderProps,
  DatePickerRowProps,
  DatePickerTriggerProps,
  DatePickerViewTriggerProps,
  DatePickerYearCellProps,
  DatePickerYearCellTriggerProps,
  DatePickerYearSelectProps,
}
