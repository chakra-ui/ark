import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import {
  type UseSegmentGroupItemContext,
  useSegmentGroupItemContext,
} from './use-segment-group-item-context'

export type SegmentGroupItemContextProps = SlotsType<{
  default: UnwrapRef<UseSegmentGroupItemContext>
}>

export const SegmentGroupItemContext = defineComponent(
  (_, { slots }) => {
    const item = useSegmentGroupItemContext()

    return () => slots.default(item.value)
  },
  {
    name: 'SegmentGroupItemContext',
    slots: Object as SegmentGroupItemContextProps,
  },
)
