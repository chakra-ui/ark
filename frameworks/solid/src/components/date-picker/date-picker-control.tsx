import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerControlProps extends HTMLArkProps<'div'> {}

export const DatePickerControl = (props: DatePickerControlProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().controlProps, props)

  return <ark.div {...mergedProps} />
}
