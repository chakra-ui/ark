import type { DayCellProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'
import { DatePickerDayCellProvider } from './date-picker-day-cell-context'

export type DatePickerDayCellProps = Assign<ComponentPropsWithoutRef<typeof ark.div>, DayCellProps>

export const DatePickerDayCell = forwardRef<HTMLDivElement, DatePickerDayCellProps>(
  (props, ref) => {
    const { getDayCellProps } = useDatePickerContext()
    const [cellProps, localProps] = createSplitProps<DayCellProps>()(props, [
      'value',
      'disabled',
      'offset',
    ])

    const mergedProps = mergeProps(getDayCellProps(cellProps), localProps)

    return (
      <DatePickerDayCellProvider value={cellProps}>
        <ark.div {...mergedProps} ref={ref} />
      </DatePickerDayCellProvider>
    )
  },
)

DatePickerDayCell.displayName = 'DatePickerDayCell'
