import type { CellProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { DatePickerCellProvider } from './date-picker-cell-context'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerMonthCellProps extends Assign<HTMLArkProps<'div'>, CellProps> {}

export const DatePickerMonthCell = forwardRef<HTMLDivElement, DatePickerMonthCellProps>(
  (props, ref) => {
    const api = useDatePickerContext()

    const [cellProps, localProps] = createSplitProps<CellProps>()(props, ['value', 'disabled'])
    const mergedProps = mergeProps(api.getMonthCellProps(cellProps), localProps)

    return (
      <DatePickerCellProvider value={cellProps}>
        <ark.div {...mergedProps} ref={ref} />
      </DatePickerCellProvider>
    )
  },
)

DatePickerMonthCell.displayName = 'DatePickerMonthCell'
