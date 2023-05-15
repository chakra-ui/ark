import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDatePickerCellContext } from './date-picker-cell-context'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerCellTriggerProps = HTMLArkProps<'button'>

export const DatePickerCellTrigger = forwardRef<'button'>((props, ref) => {
  const { getMonthCellTriggerProps } = useDatePickerContext()
  const cellProps = useDatePickerCellContext()
  const mergedProps = mergeProps(getMonthCellTriggerProps(cellProps), props)

  return <ark.button {...mergedProps} ref={ref} />
})
