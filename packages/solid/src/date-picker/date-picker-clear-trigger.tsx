import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerClearTriggerProps = HTMLArkProps<'button'>

export const DatePickerClearTrigger = (props: DatePickerClearTriggerProps) => {
  const datePicker = useDatePickerContext()
  const triggerProps = mergeProps(() => datePicker().clearTriggerProps, props)

  return <ark.button {...triggerProps} />
}
