import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewContext } from './use-date-picker-view-context'

export interface DatePickerPrevTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerPrevTrigger = (props: DatePickerPrevTriggerProps) => {
  const api = useDatePickerContext()
  const viewProps = useDatePickerViewContext()
  const mergedProps = mergeProps(() => api().getPrevTriggerProps(viewProps), props)

  return <ark.button {...mergedProps} />
}
