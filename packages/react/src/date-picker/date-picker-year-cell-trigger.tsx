import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useDatePickerCellContext } from './date-picker-cell-context'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerYearCellTriggerProps = HTMLArkProps<'button'>

export const DatePickerYearCellTrigger = forwardRef<'button'>((props, ref) => {
  const { getYearCellTriggerProps } = useDatePickerContext()
  const cellProps = useDatePickerCellContext()
  const mergedProps = mergeProps(getYearCellTriggerProps(cellProps), props)

  return <ark.button {...mergedProps} ref={ref} />
})
