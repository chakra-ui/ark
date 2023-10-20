import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerClearTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerClearTrigger = (props: DatePickerClearTriggerProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().clearTriggerProps, props)

  return <ark.button {...mergedProps} />
}
