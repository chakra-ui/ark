import type { SegmentGroupProps } from '@zag-js/date-input'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDateInputContext } from './use-date-input-context'

export interface DateInputSegmentGroupBaseProps extends PolymorphicProps, SegmentGroupProps {}
export interface DateInputSegmentGroupProps extends HTMLProps<'div'>, DateInputSegmentGroupBaseProps {}

const splitSegmentGroupProps = createSplitProps<SegmentGroupProps>()

export const DateInputSegmentGroup = forwardRef<HTMLDivElement, DateInputSegmentGroupProps>((props, ref) => {
  const [segmentGroupProps, localProps] = splitSegmentGroupProps(props, ['index'])
  const dateInput = useDateInputContext()
  const mergedProps = mergeProps(dateInput.getSegmentGroupProps(segmentGroupProps), localProps)
  return <ark.div {...mergedProps} ref={ref} />
})

DateInputSegmentGroup.displayName = 'DateInputSegmentGroup'
