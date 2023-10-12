import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerContentProps extends HTMLArkProps<'div'> {}

export const DatePickerContent = (props: DatePickerContentProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(api().contentProps, props)

  return <ark.div {...mergedProps} />
}
