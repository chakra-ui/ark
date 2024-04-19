import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewContext } from './use-date-picker-view-props-context'

export interface DatePickerViewControlProps extends HTMLArkProps<'div'> {}

export const DatePickerViewControl = (props: DatePickerViewControlProps) => {
  const api = useDatePickerContext()
  const viewProps = useDatePickerViewContext()
  const mergedProps = mergeProps(() => api().getViewControlProps(viewProps), props)

  return <ark.div {...mergedProps} />
}
