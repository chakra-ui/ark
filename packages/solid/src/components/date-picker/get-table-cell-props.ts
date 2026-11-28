import type { DateValue, DateView, DayTableCellProps, TableCellProps, VisibleRange } from '@zag-js/date-picker'

interface CellProps {
  value: DateValue | number
  disabled?: boolean | undefined
  visibleRange?: VisibleRange | undefined
  columns?: number | undefined
}

interface CellGetters<T> {
  day: (props: DayTableCellProps) => T
  month: (props: TableCellProps) => T
  year: (props: TableCellProps) => T
}

export const getTableCellProps = <T>(view: DateView, props: CellProps, getters: CellGetters<T>): T => {
  const { value } = props
  if (typeof value === 'number') return getters[view === 'year' ? 'year' : 'month']({ ...props, value })
  return getters.day({ ...props, value })
}
