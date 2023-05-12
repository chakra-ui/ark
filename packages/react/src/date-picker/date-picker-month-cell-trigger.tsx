import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerMonthCellContext } from './date-picker-month-cell-context'

export type DatePickerMonthCellTriggerProps = HTMLArkProps<'button'>

export const DatePickerMonthCellTrigger = forwardRef<'button'>((props, ref) => {
  const { getMonthCellTriggerProps } = useDatePickerContext()
  const monthCellProps = useDatePickerMonthCellContext()
  const mergedProps = mergeProps(getMonthCellTriggerProps(monthCellProps), props)

  return <ark.button {...mergedProps} ref={ref} />
})
