import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerControlProps extends HTMLArkProps<'div'> {}

export const DatePickerControl = (props: DatePickerControlProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().controlProps, props)

  return <ark.div {...mergedProps} />
}
