import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { DatePickerCellProvider } from './date-picker-cell-context'
import { useDatePickerContext } from './date-picker-context'

type CellProps = {
  value: number
}

export type DatePickerCellProps = Assign<HTMLArkProps<'div'>, CellProps>

export const DatePickerCell = forwardRef<'div', CellProps>((props, ref) => {
  const [cellProps, localProps] = createSplitProps<CellProps>()(props, ['value'])
  const { view, getDayCellProps, getMonthCellProps, getYearCellProps } = useDatePickerContext()

  const cellPropsMap = {
    // @ts-expect-error TODO: fix this
    day: getDayCellProps(cellProps),
    month: getMonthCellProps(cellProps),
    year: getYearCellProps(cellProps),
  }

  const mergedProps = mergeProps(cellPropsMap[view], localProps)

  return (
    <DatePickerCellProvider value={cellProps}>
      <ark.div {...mergedProps} ref={ref} />
    </DatePickerCellProvider>
  )
})
