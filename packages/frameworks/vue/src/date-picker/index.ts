import { DatePicker as DatePickerRoot, type DatePickerProps } from './date-picker'
import {
  DatePickerClearTrigger,
  type DatePickerClearTriggerProps,
} from './date-picker-clear-trigger'
import { DatePickerContent, type DatePickerContentProps } from './date-picker-content'
import { useDatePickerContext, type DatePickerContext } from './date-picker-context'
import { DatePickerControl, type DatePickerControlProps } from './date-picker-control'
import { DatePickerInput, type DatePickerInputProps } from './date-picker-input'
import { DatePickerLabel, type DatePickerLabelProps } from './date-picker-label'
import { DatePickerMonthSelect, type DatePickerMonthSelectProps } from './date-picker-month-select'
import { DatePickerNextTrigger, type DatePickerNextTriggerProps } from './date-picker-next-trigger'
import { DatePickerPositioner, type DatePickerPositionerProps } from './date-picker-positioner'
import { DatePickerPrevTrigger, type DatePickerPrevTriggerProps } from './date-picker-prev-trigger'
import { DatePickerRangeText, type DatePickerRangeTextProps } from './date-picker-range-text'
import { DatePickerTable, type DatePickerTableProps } from './date-picker-table'
import { DatePickerTableBody, type DatePickerTableBodyProps } from './date-picker-table-body'
import { DatePickerTableCell, type DatePickerTableCellProps } from './date-picker-table-cell'
import {
  useDatePickerTableCellContext,
  type DatePickerTableCellContext,
} from './date-picker-table-cell-context'
import {
  DatePickerTableCellTrigger,
  type DatePickerTableCellTriggerProps,
} from './date-picker-table-cell-trigger'
import { useDatePickerTableContext, type DatePickerTableContext } from './date-picker-table-context'
import { DatePickerTableHead, type DatePickerTableHeadProps } from './date-picker-table-head'
import { DatePickerTableHeader, type DatePickerTableHeaderProps } from './date-picker-table-header'
import { DatePickerTableRow, type DatePickerTableRowProps } from './date-picker-table-row'
import { DatePickerTrigger, type DatePickerTriggerProps } from './date-picker-trigger'
import { DatePickerView, type DatePickerViewProps } from './date-picker-view'
import { useDatePickerViewContext, type DatePickerViewContext } from './date-picker-view-context'
import { DatePickerViewControl, type DatePickerViewControlProps } from './date-picker-view-control'
import { DatePickerViewTrigger, type DatePickerViewTriggerProps } from './date-picker-view-trigger'
import { DatePickerYearSelect, type DatePickerYearSelectProps } from './date-picker-year-select'

const DatePicker = Object.assign(DatePickerRoot, {
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

export {
  DatePicker,
  DatePickerClearTrigger,
  DatePickerContent,
  DatePickerControl,
  DatePickerInput,
  DatePickerLabel,
  DatePickerMonthSelect,
  DatePickerNextTrigger,
  DatePickerPositioner,
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
  DatePickerYearSelect,
  useDatePickerContext,
  useDatePickerTableCellContext,
  useDatePickerTableContext,
  useDatePickerViewContext,
}

export type {
  DatePickerClearTriggerProps,
  DatePickerContentProps,
  DatePickerContext,
  DatePickerControlProps,
  DatePickerInputProps,
  DatePickerLabelProps,
  DatePickerMonthSelectProps,
  DatePickerNextTriggerProps,
  DatePickerPositionerProps,
  DatePickerPrevTriggerProps,
  DatePickerProps,
  DatePickerRangeTextProps,
  DatePickerTableBodyProps,
  DatePickerTableCellContext,
  DatePickerTableCellProps,
  DatePickerTableCellTriggerProps,
  DatePickerTableContext,
  DatePickerTableHeadProps,
  DatePickerTableHeaderProps,
  DatePickerTableProps,
  DatePickerTableRowProps,
  DatePickerTriggerProps,
  DatePickerViewContext,
  DatePickerViewControlProps,
  DatePickerViewProps,
  DatePickerViewTriggerProps,
  DatePickerYearSelectProps,
}
