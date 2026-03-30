import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'

export interface DateInputSegmentGroupBaseProps extends PolymorphicProps<'div'> {
  index?: number
}
export interface DateInputSegmentGroupProps extends HTMLProps<'div'>, DateInputSegmentGroupBaseProps {}

export const DateInputSegmentGroup = ({ index, ...props }: DateInputSegmentGroupProps) => {
  const api = useDateInputContext()
  const mergedProps = mergeProps(() => api().getSegmentGroupProps({ index }), props)
  return <ark.div {...mergedProps} />
}
