import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import {
  type UseRatingGroupItemContext,
  useRatingGroupItemContext,
} from './use-rating-group-item-context'

export type RatingGroupItemContextProps = SlotsType<{
  default: UnwrapRef<UseRatingGroupItemContext>
}>

export const RatingGroupItemContext = defineComponent(
  (_, { slots }) => {
    const item = useRatingGroupItemContext()

    return () => slots.default(item.value)
  },
  {
    name: 'RatingGroupItemContext',
    slots: Object as RatingGroupItemContextProps,
  },
)
