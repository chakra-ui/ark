import type { JSX } from 'solid-js'
import {
  useSegmentGroupItemContext,
  type UseSegmentGroupItemContext,
} from './use-segment-group-item-context'

export interface SegmentGroupItemContextProps {
  children: (context: UseSegmentGroupItemContext) => JSX.Element
}

export const SegmentGroupItemContext = (props: SegmentGroupItemContextProps) =>
  props.children(useSegmentGroupItemContext())
