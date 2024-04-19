import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseSegmentGroupContext, useSegmentGroupContext } from './use-segment-group-context'

export type SegmentGroupContextProps = SlotsType<{
  default: UnwrapRef<UseSegmentGroupContext>
}>

export const SegmentGroupContext = defineComponent(
  (_, { slots }) => {
    const segmentgroup = useSegmentGroupContext()

    return () => slots.default(segmentgroup.value)
  },
  {
    name: 'SegmentGroupContext',
    slots: Object as SegmentGroupContextProps,
  },
)
