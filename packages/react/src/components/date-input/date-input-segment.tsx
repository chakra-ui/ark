import type { SegmentProps } from '@zag-js/date-input'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'

export interface DateInputSegmentBaseProps extends PolymorphicProps, SegmentProps {}

export interface DateInputSegmentProps extends HTMLProps<'span'>, DateInputSegmentBaseProps {}

export const DateInputSegment = forwardRef<HTMLSpanElement, DateInputSegmentProps>(
  ({ segment, index, ...props }, ref) => {
    const dateInput = useDateInputContext()
    const mergedProps = mergeProps(dateInput.getSegmentProps({ segment, index }), props)
    return (
      <ark.span {...mergedProps} ref={ref}>
        {segment.text}
      </ark.span>
    )
  },
)

DateInputSegment.displayName = 'DateInputSegment'
