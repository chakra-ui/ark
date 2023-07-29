import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerDayCellContext } from './date-picker-day-cell-context'

export type DatePickerDayCellTriggerProps = ComponentPropsWithoutRef<typeof ark.button>

export const DatePickerDayCellTrigger = forwardRef<
  HTMLButtonElement,
  DatePickerDayCellTriggerProps
>((props, ref) => {
  const { getDayCellTriggerProps } = useDatePickerContext()
  const cellProps = useDatePickerDayCellContext()
  const mergedProps = mergeProps(getDayCellTriggerProps(cellProps), props)

  return <ark.button {...mergedProps} ref={ref} />
})

DatePickerDayCellTrigger.displayName = 'DatePickerDayCellTrigger'
