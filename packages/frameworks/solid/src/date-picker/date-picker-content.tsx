import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerContentProps = HTMLArkProps<'div'>

export const DatePickerContent = (props: DatePickerContentProps) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(() => datePicker().contentProps, props)

  return <ark.div {...mergedProps} />
}
