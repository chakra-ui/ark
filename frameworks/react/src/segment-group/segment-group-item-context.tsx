import type { ReactNode } from 'react'
import {
  useSegmentGroupItemContext,
  type UseSegmentGroupItemContext,
} from './use-segment-group-item-context'

export interface SegmentGroupItemContextProps {
  children: (context: UseSegmentGroupItemContext) => ReactNode
}

export const SegmentGroupItemContext = (props: SegmentGroupItemContextProps) =>
  props.children(useSegmentGroupItemContext())
