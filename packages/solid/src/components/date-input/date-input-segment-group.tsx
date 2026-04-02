import type { SegmentGroupProps } from '@zag-js/date-input'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'
import { DateInputSegmentGroupPropsProvider } from './use-date-input-segment-group-props-context'

export interface DateInputSegmentGroupBaseProps extends PolymorphicProps<'div'>, SegmentGroupProps {}
export interface DateInputSegmentGroupProps extends HTMLProps<'div'>, DateInputSegmentGroupBaseProps {}

const splitSegmentGroupProps = createSplitProps<SegmentGroupProps>()

export const DateInputSegmentGroup = (props: DateInputSegmentGroupProps) => {
  const api = useDateInputContext()
  const [segmentGroupProps, localProps] = splitSegmentGroupProps(props, ['index'])
  const mergedProps = mergeProps(() => api().getSegmentGroupProps(segmentGroupProps), localProps)
  return (
    <DateInputSegmentGroupPropsProvider value={segmentGroupProps}>
      <ark.div {...mergedProps} />
    </DateInputSegmentGroupPropsProvider>
  )
}
