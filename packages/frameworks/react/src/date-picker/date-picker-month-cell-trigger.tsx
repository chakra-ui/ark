import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerCellContext } from './date-picker-cell-context'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerMonthCellTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerMonthCellTrigger = forwardRef<
  HTMLButtonElement,
  DatePickerMonthCellTriggerProps
>((props, ref) => {
  const api = useDatePickerContext()
  const cellProps = useDatePickerCellContext()
  const mergedProps = mergeProps(api.getMonthCellTriggerProps(cellProps), props)

  return <ark.button {...mergedProps} ref={ref} />
})

DatePickerMonthCellTrigger.displayName = 'DatePickerMonthCellTrigger'
