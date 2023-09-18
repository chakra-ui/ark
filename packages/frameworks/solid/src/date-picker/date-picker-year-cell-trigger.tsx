import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerCellContext } from './date-picker-cell-context'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerYearCellTriggerProps = HTMLArkProps<'button'>

export const DatePickerYearCellTrigger = (props: DatePickerYearCellTriggerProps) => {
  const datePicker = useDatePickerContext()
  const cellProps = useDatePickerCellContext()
  const mergedProps = mergeProps(() => datePicker().getYearCellTriggerProps(cellProps), props)

  return <ark.button {...mergedProps} />
}
