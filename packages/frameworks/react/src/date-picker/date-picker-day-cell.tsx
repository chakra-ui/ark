import type { DayCellProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'
import { DatePickerDayCellProvider } from './date-picker-day-cell-context'

export interface DatePickerDayCellProps extends Assign<HTMLArkProps<'div'>, DayCellProps> {}

export const DatePickerDayCell = forwardRef<HTMLDivElement, DatePickerDayCellProps>(
  (props, ref) => {
    const api = useDatePickerContext()

    const [cellProps, localProps] = createSplitProps<DayCellProps>()(props, [
      'value',
      'disabled',
      'offset',
    ])

    const mergedProps = mergeProps(api.getDayCellProps(cellProps), localProps)

    return (
      <DatePickerDayCellProvider value={cellProps}>
        <ark.div {...mergedProps} ref={ref} />
      </DatePickerDayCellProvider>
    )
  },
)

DatePickerDayCell.displayName = 'DatePickerDayCell'
