import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import {
  DatePickerTableCellProvider,
  type UseDatePickerTableCellContext,
} from './use-date-picker-table-cell-context'
import { useDatePickerViewContext } from './use-date-picker-view-context'

export interface DatePickerTableCellProps
  extends HTMLArkProps<'td'>,
    UseDatePickerTableCellContext {}

export const DatePickerTableCell = forwardRef<HTMLTableCellElement, DatePickerTableCellProps>(
  (props, ref) => {
    const [cellProps, localProps] = createSplitProps<UseDatePickerTableCellContext>()(props, [
      'disabled',
      'value',
      'visibleRange',
      'columns',
    ])
    const context = useDatePickerContext()
    const viewContext = useDatePickerViewContext()
    const tableCellProps = {
      day: context.getDayTableCellProps,
      month: context.getMonthTableCellProps,
      year: context.getYearTableCellProps,
      // @ts-expect-error use filter guard
    }[viewContext.view](cellProps)

    const mergedProps = mergeProps(tableCellProps, localProps)

    return (
      <DatePickerTableCellProvider value={cellProps}>
        <ark.td ref={ref} {...mergedProps} />
      </DatePickerTableCellProvider>
    )
  },
)

DatePickerTableCell.displayName = 'DatePickerTableCell'
