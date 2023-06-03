import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerCellContext } from './date-picker-cell-context'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerMonthCellTriggerProps = HTMLArkProps<'button'>

export const DatePickerMonthCellTrigger = (props: DatePickerMonthCellTriggerProps) => {
  const datePicker = useDatePickerContext()
  const cellProps = useDatePickerCellContext()
  const mergedProps = mergeProps(() => datePicker().getMonthCellTriggerProps(cellProps), props)

  return <ark.button {...mergedProps} />
}
