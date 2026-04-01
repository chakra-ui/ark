import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'
import type { SegmentGroupProps } from '@zag-js/date-input'
import { createSplitProps } from '../../utils/create-split-props'

export interface DateInputSegmentGroupBaseProps extends PolymorphicProps<'div'>, SegmentGroupProps {}
export interface DateInputSegmentGroupProps extends HTMLProps<'div'>, DateInputSegmentGroupBaseProps {}

const splitSegmentGroupProps = createSplitProps<SegmentGroupProps>()

export const DateInputSegmentGroup = (props: DateInputSegmentGroupProps) => {
  const api = useDateInputContext()
  const [segmentGroupProps, localProps] = splitSegmentGroupProps(props, ['index'])
  const mergedProps = mergeProps(() => api().getSegmentGroupProps(segmentGroupProps), localProps)
  return <ark.div {...mergedProps} />
}
