import type { SegmentProps } from '@zag-js/date-input'
import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'
import { useDateInputSegmentGroupPropsContext } from './use-date-input-segment-group-props-context'

export interface DateInputSegmentBaseProps extends PolymorphicProps<'span'>, Pick<SegmentProps, 'segment'> {}
export interface DateInputSegmentProps extends HTMLProps<'span'>, DateInputSegmentBaseProps {}

const splitSegmentProps = createSplitProps<Pick<SegmentProps, 'segment'>>()

export const DateInputSegment = (props: DateInputSegmentProps) => {
  const [segmentProps, localProps] = splitSegmentProps(props, ['segment'])
  const segmentGroupProps = useDateInputSegmentGroupPropsContext()
  const api = useDateInputContext()

  const currentSegment = createMemo(() => {
    const segments = api().getSegments(segmentGroupProps)
    return segments.find((s) => s.type === segmentProps.segment.type) ?? segmentProps.segment
  })

  const mergedProps = mergeProps(
    () => api().getSegmentProps({ segment: currentSegment(), index: segmentGroupProps.index }),
    localProps,
  )
  return <ark.span {...mergedProps}>{currentSegment().text}</ark.span>
}
