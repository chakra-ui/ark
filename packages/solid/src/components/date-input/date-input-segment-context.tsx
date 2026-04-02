import type { DateSegment } from '@zag-js/date-input'
import { Index, type JSX } from 'solid-js'
import { useDateInputContext } from './use-date-input-context'
import { useDateInputSegmentGroupPropsContext } from './use-date-input-segment-group-props-context'

export interface DateInputSegmentContextProps {
  children: (segment: DateSegment) => JSX.Element
}

export const DateInputSegmentContext = (props: DateInputSegmentContextProps) => {
  const api = useDateInputContext()
  const segmentGroupProps = useDateInputSegmentGroupPropsContext()
  return <Index each={api().getSegments(segmentGroupProps)}>{(segment) => props.children(segment())}</Index>
}
