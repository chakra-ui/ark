import type { SegmentProps } from '@zag-js/date-input'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'
import { useDateInputSegmentGroupPropsContext } from './use-date-input-segment-group-props-context'

export interface DateInputSegmentBaseProps extends PolymorphicProps, Pick<SegmentProps, 'segment'> {}

export interface DateInputSegmentProps extends HTMLProps<'span'>, DateInputSegmentBaseProps {}

const splitSegmentProps = createSplitProps<Pick<SegmentProps, 'segment'>>()

export const DateInputSegment = forwardRef<HTMLSpanElement, DateInputSegmentProps>((props, ref) => {
  const [segmentProps, localProps] = splitSegmentProps(props, ['segment'])
  const segmentGroupProps = useDateInputSegmentGroupPropsContext()
  const dateInput = useDateInputContext()
  const mergedProps = mergeProps(
    dateInput.getSegmentProps({ ...segmentProps, index: segmentGroupProps.index }),
    localProps,
  )
  return (
    <ark.span {...mergedProps} ref={ref}>
      {segmentProps.segment.text}
    </ark.span>
  )
})

DateInputSegment.displayName = 'DateInputSegment'
