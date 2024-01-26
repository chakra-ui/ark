import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export interface DatePickerRangeTextProps extends HTMLArkProps<'div'> {}

export const DatePickerRangeText: ArkComponent<'div'> = (props) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().rangeTextProps, props)

  return <ark.div {...mergedProps}>{api().visibleRangeText.start}</ark.div>
}
