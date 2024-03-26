import {
  useSegmentGroupItemContext,
  type UseSegmentGroupItemContext,
} from './use-segment-group-item-context'

export interface SegmentGroupItemContextProps {
  children: (context: UseSegmentGroupItemContext) => React.ReactNode
}

export const SegmentGroupItemContext = (props: SegmentGroupItemContextProps) =>
  props.children(useSegmentGroupItemContext())
