import type { JSX } from 'solid-js'
import { type UseSegmentGroupContext, useSegmentGroupContext } from './use-segment-group-context'

export interface SegmentGroupContextProps {
  children: (context: UseSegmentGroupContext) => JSX.Element
}

export const SegmentGroupContext = (props: SegmentGroupContextProps) =>
  props.children(useSegmentGroupContext())
