import type { SegmentProps } from '@zag-js/date-input'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'

export interface DateInputSegmentBaseProps extends PolymorphicProps<'span'>, SegmentProps {}
export interface DateInputSegmentProps extends HTMLProps<'span'>, DateInputSegmentBaseProps {}

const splitSegmentProps = createSplitProps<SegmentProps>()

export const DateInputSegment = (props: DateInputSegmentProps) => {
  const [segmentProps, localProps] = splitSegmentProps(props, ['segment', 'index'])
  const api = useDateInputContext()
  const mergedProps = mergeProps(() => api().getSegmentProps(segmentProps), localProps)
  return <ark.span {...mergedProps}>{segmentProps.segment.text}</ark.span>
}
