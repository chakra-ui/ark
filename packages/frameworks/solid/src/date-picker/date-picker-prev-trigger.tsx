import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerViewContext } from './date-picker-view-context'

export interface DatePickerPrevTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerPrevTrigger: ArkComponent<'button'> = (
  props: DatePickerPrevTriggerProps,
) => {
  const api = useDatePickerContext()
  const viewProps = useDatePickerViewContext()
  const mergedProps = mergeProps(() => api().getPrevTriggerProps(viewProps), props)

  return <ark.button {...mergedProps} />
}
