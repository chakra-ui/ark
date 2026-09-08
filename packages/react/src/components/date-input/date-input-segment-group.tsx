'use client'

import type { SegmentGroupProps, SegmentGroupState } from '@zag-js/date-input'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useDateInputContext } from './use-date-input-context.ts'
import { DateInputSegmentGroupPropsProvider } from './use-date-input-segment-group-props-context.ts'

export interface DateInputSegmentGroupState extends SegmentGroupState {}

export interface DateInputSegmentGroupBaseProps
  extends PolymorphicProps<DateInputSegmentGroupState>, SegmentGroupProps {}
export interface DateInputSegmentGroupProps extends HTMLProps<'div'>, DateInputSegmentGroupBaseProps {}

const splitSegmentGroupProps = createSplitProps<SegmentGroupProps>()

export const DateInputSegmentGroup = forwardRef<HTMLDivElement, DateInputSegmentGroupProps>((props, ref) => {
  const [segmentGroupProps, localProps] = splitSegmentGroupProps(props, ['index'])
  const dateInput = useDateInputContext()
  const mergedProps = mergeProps(dateInput.getSegmentGroupProps(segmentGroupProps), localProps)
  return (
    <DateInputSegmentGroupPropsProvider value={segmentGroupProps}>
      <ark.div {...mergedProps} ref={ref} state={dateInput.getSegmentGroupState(segmentGroupProps)} />
    </DateInputSegmentGroupPropsProvider>
  )
})

DateInputSegmentGroup.displayName = 'DateInputSegmentGroup'
