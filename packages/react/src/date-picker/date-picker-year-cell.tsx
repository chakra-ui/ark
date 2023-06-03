import type { CellProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { DatePickerCellProvider } from './date-picker-cell-context'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerYearCellProps = Assign<HTMLArkProps<'div'>, CellProps>

export const DatePickerYearCell = forwardRef<'div', CellProps>((props, ref) => {
  const { getYearCellProps } = useDatePickerContext()
  const [cellProps, localProps] = createSplitProps<CellProps>()(props, ['value', 'disabled'])

  const mergedProps = mergeProps(getYearCellProps(cellProps), localProps)

  return (
    <DatePickerCellProvider value={cellProps}>
      <ark.div {...mergedProps} ref={ref} />
    </DatePickerCellProvider>
  )
})
