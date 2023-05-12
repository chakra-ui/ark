import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'
import { DatePickerMonthCellProvider } from './date-picker-month-cell-context'

type MonthCellProps = {
  value: number
}

export type DatePickerMonthCellProps = Assign<HTMLArkProps<'div'>, MonthCellProps>

export const DatePickerMonthCell = forwardRef<'div', MonthCellProps>((props, ref) => {
  const [monthCellProps, localProps] = createSplitProps<MonthCellProps>()(props, ['value'])
  const { getMonthCellProps } = useDatePickerContext()
  const mergedProps = mergeProps(getMonthCellProps(monthCellProps), localProps)

  return (
    <DatePickerMonthCellProvider value={monthCellProps}>
      <ark.div {...mergedProps} ref={ref} />
    </DatePickerMonthCellProvider>
  )
})
