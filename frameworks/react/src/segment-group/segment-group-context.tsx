import type { ReactNode } from 'react'
import { useSegmentGroupContext, type UseSegmentGroupContext } from './use-segment-group-context'

export interface SegmentGroupContextProps {
  children: (context: UseSegmentGroupContext) => ReactNode
}

export const SegmentGroupContext = (props: SegmentGroupContextProps) =>
  props.children(useSegmentGroupContext())
