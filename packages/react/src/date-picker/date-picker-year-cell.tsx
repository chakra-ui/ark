import type { CellProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HtmlArkProps } from '../factory'
import type { Assign } from '../types'
import { DatePickerCellProvider } from './date-picker-cell-context'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerYearCellProps = Assign<HtmlArkProps<'div'>, CellProps>

export const DatePickerYearCell = forwardRef<HTMLDivElement, DatePickerYearCellProps>(
  (props, ref) => {
    const { getYearCellProps } = useDatePickerContext()
    const [cellProps, localProps] = createSplitProps<CellProps>()(props, ['value', 'disabled'])

    const mergedProps = mergeProps(getYearCellProps(cellProps), localProps)

    return (
      <DatePickerCellProvider value={cellProps}>
        <ark.div {...mergedProps} ref={ref} />
      </DatePickerCellProvider>
    )
  },
)

DatePickerYearCell.displayName = 'DatePickerYearCell'
