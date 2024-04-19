import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import {
  DatePickerTableCellProvider,
  type UseDatePickerTableCellContext,
} from './use-date-picker-table-cell-props-context'
import { useDatePickerViewContext } from './use-date-picker-view-props-context'

export interface DatePickerTableCellProps
  extends HTMLArkProps<'td'>,
    UseDatePickerTableCellContext {}

export const DatePickerTableCell = (props: DatePickerTableCellProps) => {
  const [cellProps, localProps] = createSplitProps<UseDatePickerTableCellContext>()(props, [
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
