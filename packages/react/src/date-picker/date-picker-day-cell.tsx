import type { DayCellProps } from '@zag-js/date-picker/dist/date-picker.types'
import { mergeProps } from '@zag-js/react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'
import { DatePickerDayCellProvider } from './date-picker-day-cell-context'

export type DatePickerDayCellProps = Assign<HTMLArkProps<'div'>, DayCellProps>

export const DatePickerDayCell = forwardRef<'div', DayCellProps>((props, ref) => {
  const [dayCellProps, localProps] = createSplitProps<DayCellProps>()(props, [
    'disabled',
    'offset',
    'value',
  ])
  const { getDayCellProps } = useDatePickerContext()
  const mergedProps = mergeProps(getDayCellProps(dayCellProps), localProps)

  return (
    <DatePickerDayCellProvider value={dayCellProps}>
      <ark.div {...mergedProps} ref={ref} />
    </DatePickerDayCellProvider>
  )
})
