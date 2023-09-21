import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerDayCellContext } from './date-picker-day-cell-context'

export interface DatePickerDayCellTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerDayCellTrigger = forwardRef<
  HTMLButtonElement,
  DatePickerDayCellTriggerProps
>((props, ref) => {
  const api = useDatePickerContext()
  const cellProps = useDatePickerDayCellContext()
  const mergedProps = mergeProps(api.getDayCellTriggerProps(cellProps), props)

  return <ark.button {...mergedProps} ref={ref} />
})

DatePickerDayCellTrigger.displayName = 'DatePickerDayCellTrigger'
