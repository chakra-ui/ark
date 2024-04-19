import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseCarouselContext, useCarouselContext } from './use-carousel-context'

export type CarouselContextProps = SlotsType<{
  default: UnwrapRef<UseCarouselContext>
}>

export const CarouselContext = defineComponent(
  (_, { slots }) => {
    const carousel = useCarouselContext()

    return () => slots.default(carousel.value)
  },
  {
    name: 'CarouselContext',
    slots: Object as CarouselContextProps,
  },
)
