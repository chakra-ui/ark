import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerLabelProps extends HTMLArkProps<'label'> {}

export const DatePickerLabel = (props: DatePickerLabelProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().labelProps, props)

  return <ark.label {...mergedProps} />
}
