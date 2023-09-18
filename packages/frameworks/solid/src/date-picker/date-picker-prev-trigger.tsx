import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerPrevTriggerProps = HTMLArkProps<'button'>

export const DatePickerPrevTrigger = (props: DatePickerPrevTriggerProps) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(
    datePicker().getPrevTriggerProps({ view: datePicker().view }),
    props,
  )

  return <ark.button {...mergedProps} />
}
