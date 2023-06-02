import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerInputProps = HTMLArkProps<'input'>

export const DatePickerInput = (props: DatePickerInputProps) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(() => datePicker().inputProps, props)

  return <ark.input {...mergedProps} />
}
