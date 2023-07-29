import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useDatePickerCellContext } from './date-picker-cell-context'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerYearCellTriggerProps = ComponentPropsWithoutRef<typeof ark.button>

export const DatePickerYearCellTrigger = forwardRef<
  HTMLButtonElement,
  DatePickerYearCellTriggerProps
>((props, ref) => {
  const { getYearCellTriggerProps } = useDatePickerContext()
  const cellProps = useDatePickerCellContext()
  const mergedProps = mergeProps(getYearCellTriggerProps(cellProps), props)

  return <ark.button {...mergedProps} ref={ref} />
})

DatePickerYearCellTrigger.displayName = 'DatePickerYearCellTrigger'
