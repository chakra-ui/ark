import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewContext } from './use-date-picker-view-context'

export interface DatePickerViewTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerViewTrigger = (props: DatePickerViewTriggerProps) => {
  const api = useDatePickerContext()
  const viewProps = useDatePickerViewContext()
  const mergedProps = mergeProps(() => api().getViewTriggerProps(viewProps), props)

  return <ark.button {...mergedProps()} />
}
