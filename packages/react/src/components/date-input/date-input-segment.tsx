import type { SegmentProps } from '@zag-js/date-input'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'

export interface DateInputSegmentBaseProps extends PolymorphicProps, SegmentProps {}

export interface DateInputSegmentProps extends HTMLProps<'span'>, DateInputSegmentBaseProps {}

const splitSegmentProps = createSplitProps<SegmentProps>()

export const DateInputSegment = forwardRef<HTMLSpanElement, DateInputSegmentProps>((props, ref) => {
  const [segmentProps, localProps] = splitSegmentProps(props, ['segment', 'index'])
  const dateInput = useDateInputContext()
  const mergedProps = mergeProps(dateInput.getSegmentProps(segmentProps), localProps)
  return (
    <ark.span {...mergedProps} ref={ref}>
      {segmentProps.segment.text}
    </ark.span>
  )
})

DateInputSegment.displayName = 'DateInputSegment'
