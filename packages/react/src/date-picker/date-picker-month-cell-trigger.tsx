import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useDatePickerCellContext } from './date-picker-cell-context'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerMonthCellTriggerProps = ComponentPropsWithoutRef<typeof ark.button>

export const DatePickerMonthCellTrigger = forwardRef<
  HTMLButtonElement,
  DatePickerMonthCellTriggerProps
>((props, ref) => {
  const { getMonthCellTriggerProps } = useDatePickerContext()
  const cellProps = useDatePickerCellContext()
  const mergedProps = mergeProps(getMonthCellTriggerProps(cellProps), props)

  return <ark.button {...mergedProps} ref={ref} />
})

DatePickerMonthCellTrigger.displayName = 'DatePickerMonthCellTrigger'
