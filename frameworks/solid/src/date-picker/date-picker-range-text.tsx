import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerRangeTextProps extends HTMLArkProps<'div'> {}

export const DatePickerRangeText = (props: DatePickerRangeTextProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().rangeTextProps, props)

  return <ark.div {...mergedProps()}>{api().visibleRangeText.start}</ark.div>
}
