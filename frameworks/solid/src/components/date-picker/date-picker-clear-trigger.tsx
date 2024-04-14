import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerClearTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerClearTrigger = (props: DatePickerClearTriggerProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().clearTriggerProps, props)

  return <ark.button {...mergedProps} />
}
