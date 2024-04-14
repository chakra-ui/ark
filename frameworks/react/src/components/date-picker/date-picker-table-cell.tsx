import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../../factory'
import { createSplitProps } from '../../utils/create-split-props'
import { useDatePickerContext } from './use-date-picker-context'
import {
  DatePickerTableCellPropsProvider,
  type UseDatePickerTableCellPropsContext,
} from './use-date-picker-table-cell-props-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

export interface DatePickerTableCellProps
  extends HTMLArkProps<'td'>,
    UseDatePickerTableCellPropsContext {}

export const DatePickerTableCell = forwardRef<HTMLTableCellElement, DatePickerTableCellProps>(
  (props, ref) => {
    const [cellProps, localProps] = createSplitProps<UseDatePickerTableCellPropsContext>()(props, [
      'disabled',
      'value',
      'visibleRange',
      'columns',
    ])
    const datePicker = useDatePickerContext()
    const viewProps = useDatePickerViewPropsContext()
    const tableCellProps = {
      day: datePicker.getDayTableCellProps,
      month: datePicker.getMonthTableCellProps,
      year: datePicker.getYearTableCellProps,
      // @ts-expect-error value is number filter
    }[viewProps.view](cellProps)

    const mergedProps = mergeProps(tableCellProps, localProps)

    return (
      <DatePickerTableCellPropsProvider value={cellProps}>
        <ark.td ref={ref} {...mergedProps} />
      </DatePickerTableCellPropsProvider>
    )
  },
)

DatePickerTableCell.displayName = 'DatePickerTableCell'
