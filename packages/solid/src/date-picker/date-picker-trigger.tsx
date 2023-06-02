import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerTriggerProps = HTMLArkProps<'button'>

export const DatePickerTrigger = (props: DatePickerTriggerProps) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(() => datePicker().triggerProps, props)

  return <ark.button {...mergedProps} />
}
