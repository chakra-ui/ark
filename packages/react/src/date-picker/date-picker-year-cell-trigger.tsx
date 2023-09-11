import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerCellContext } from './date-picker-cell-context'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerYearCellTriggerProps = HTMLArkProps<'button'>

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
