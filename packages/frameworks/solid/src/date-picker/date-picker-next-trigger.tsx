import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerNextTriggerProps = HTMLArkProps<'button'>

export const DatePickerNextTrigger = (props: DatePickerNextTriggerProps) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(
    datePicker().getNextTriggerProps({ view: datePicker().view }),
    props,
  )

  return <ark.button {...mergedProps} />
}
