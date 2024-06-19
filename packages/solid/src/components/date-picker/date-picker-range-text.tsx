import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerRangeTextBaseProps extends PolymorphicProps<'div'> {}
export interface DatePickerRangeTextProps extends HTMLProps<'div'>, DatePickerRangeTextBaseProps {}

export const DatePickerRangeText = (props: DatePickerRangeTextProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getRangeTextProps(), props)

  return <ark.div {...mergedProps}>{api().visibleRangeText.start}</ark.div>
}
