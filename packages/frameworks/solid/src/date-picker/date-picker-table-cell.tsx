import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import {
  DatePickerTableCellProvider,
  type DatePickerTableCellContext,
} from './date-picker-table-cell-context'
import { useDatePickerViewContext } from './date-picker-view-context'

export interface DatePickerTableCellProps extends HTMLArkProps<'td'>, DatePickerTableCellContext {}

export const DatePickerTableCell: ArkComponent<'td', DatePickerTableCellContext> = (
  props: DatePickerTableCellProps,
) => {
  const [cellProps, localProps] = createSplitProps<DatePickerTableCellContext>()(props, [
    'disabled',
    'value',
    'visibleRange',
    'columns',
  ])
  const api = useDatePickerContext()
  const viewProps = useDatePickerViewContext()
  const tableCellProps = {
    day: api().getDayTableCellProps,
    month: api().getMonthTableCellProps,
    year: api().getYearTableCellProps,
    // @ts-expect-error use filter guard
  }[viewProps.view](cellProps)

  const mergedProps = mergeProps(() => tableCellProps, localProps)

  return (
    <DatePickerTableCellProvider value={cellProps}>
      <ark.td {...mergedProps} />
    </DatePickerTableCellProvider>
  )
}
