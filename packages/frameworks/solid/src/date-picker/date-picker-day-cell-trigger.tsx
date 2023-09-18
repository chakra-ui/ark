import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerDayCellContext } from './date-picker-day-cell-context'

export type DatePickerDayCellTriggerProps = HTMLArkProps<'button'>

export const DatePickerDayCellTrigger = (props: DatePickerDayCellTriggerProps) => {
  const datePicker = useDatePickerContext()
  const cellProps = useDatePickerDayCellContext()
  const mergedProps = mergeProps(() => datePicker().getDayCellTriggerProps(cellProps), props)

  return <ark.button {...mergedProps} />
}
