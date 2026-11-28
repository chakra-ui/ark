import type { DateValue, DateView, DayTableCellProps, TableCellProps, VisibleRange } from '@zag-js/date-picker'
import { type Reactive, toRaw } from 'vue'

interface CellProps {
  value: number | DateValue | Reactive<number | DateValue>
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
  const value = toRaw(props.value) as number | DateValue
  if (typeof value === 'number') return getters[view === 'year' ? 'year' : 'month']({ ...props, value })
  return getters.day({ ...props, value })
}
