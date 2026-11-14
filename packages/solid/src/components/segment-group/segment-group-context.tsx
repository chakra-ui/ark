import type { JSX } from '@solidjs/web'
import { type UseSegmentGroupContext, useSegmentGroupContext } from './use-segment-group-context.ts'

export interface SegmentGroupContextProps {
  children: (context: UseSegmentGroupContext) => JSX.Element
}

export const SegmentGroupContext = (props: SegmentGroupContextProps) => props.children(useSegmentGroupContext())
