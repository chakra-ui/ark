import type { DateSegment } from '@zag-js/date-input'
import { For } from 'solid-js'
import type { JSX } from '@solidjs/web'
import { useDateInputContext } from './use-date-input-context.ts'
import { useDateInputSegmentGroupPropsContext } from './use-date-input-segment-group-props-context.ts'

export interface DateInputSegmentContextProps {
  children: (segment: DateSegment) => JSX.Element
}

export const DateInputSegmentContext = (props: DateInputSegmentContextProps) => {
  const api = useDateInputContext()
  const segmentGroupProps = useDateInputSegmentGroupPropsContext()
  return (
    <For each={api().getSegments(segmentGroupProps)} keyed={false}>
      {(segment, index) => props.children({ ...segment(), index } as DateSegment)}
    </For>
  )
}
