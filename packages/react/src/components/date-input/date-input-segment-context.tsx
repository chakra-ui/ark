'use client'

import type { DateSegment } from '@zag-js/date-input'
import { Fragment, type ReactNode } from 'react'
import { useDateInputContext } from './use-date-input-context'
import { useDateInputSegmentGroupPropsContext } from './use-date-input-segment-group-props-context'

export interface DateInputSegmentContextProps {
  children: (segment: DateSegment) => ReactNode
}

export const DateInputSegmentContext = (props: DateInputSegmentContextProps) => {
  const dateInput = useDateInputContext()
  const segmentGroupProps = useDateInputSegmentGroupPropsContext()
  return dateInput
    .getSegments(segmentGroupProps)
    .map((segment, index) => <Fragment key={`${segment.type}-${index}`}>{props.children(segment)}</Fragment>)
}
