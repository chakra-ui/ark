import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseRatingGroupContext, useRatingGroupContext } from './use-rating-group-context'

export type RatingGroupContextProps = SlotsType<{
  default: UnwrapRef<UseRatingGroupContext>
}>

export const RatingGroupContext = defineComponent(
  (_, { slots }) => {
    const ratinggroup = useRatingGroupContext()

    return () => slots.default(ratinggroup.value)
  },
  {
    name: 'RatingGroupContext',
    slots: Object as RatingGroupContextProps,
  },
)
