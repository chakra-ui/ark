import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTableCellContext } from './use-date-picker-table-cell-context'
import { useDatePickerViewContext } from './use-date-picker-view-context'

export interface DatePickerTableCellTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerTableCellTrigger = forwardRef<
  HTMLButtonElement,
  DatePickerTableCellTriggerProps
>((props, ref) => {
  const context = useDatePickerContext()
  const cellContext = useDatePickerTableCellContext()
  const viewContext = useDatePickerViewContext()

  const triggerProps = {
    day: context.getDayTableCellTriggerProps,
    month: context.getMonthTableCellTriggerProps,
    year: context.getYearTableCellTriggerProps,
    // @ts-expect-error value is number filter
  }[viewContext.view](cellContext)

  const mergedProps = mergeProps(triggerProps, props)

  return <ark.button ref={ref} {...mergedProps} />
})

DatePickerTableCellTrigger.displayName = 'DatePickerTableCellTrigger'
