import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerDayCellContext } from './date-picker-day-cell-context'

export type DatePickerDayCellTriggerProps = HTMLArkProps<'button'>

export const DatePickerDayCellTrigger = forwardRef<'button'>((props, ref) => {
  const { getDayCellTriggerProps } = useDatePickerContext()
  const dayCellProps = useDatePickerDayCellContext()
  const mergedProps = mergeProps(getDayCellTriggerProps(dayCellProps), props)

  return <ark.button {...mergedProps} ref={ref} />
})
