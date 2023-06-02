import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerControlProps = HTMLArkProps<'div'>

export const DatePickerControl = (props: DatePickerControlProps) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(() => datePicker().controlProps, props)

  return <ark.div {...mergedProps} />
}
