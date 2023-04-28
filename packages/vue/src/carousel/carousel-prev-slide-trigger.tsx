import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useCarouselContext } from './carousel-context'

export const CarouselPrevSlideTrigger = defineComponent({
  name: 'CarouselPrevSlideTrigger',
  setup(_, { slots, attrs }) {
    const api = useCarouselContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'CarouselPrevSlideTrigger')

      return h(DefaultSlot, { ...api.value.previousTriggerProps, ...attrs })
    }
  },
})
