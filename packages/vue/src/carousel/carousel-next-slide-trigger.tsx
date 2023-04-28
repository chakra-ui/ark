import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useCarouselContext } from './carousel-context'

export const CarouselNextSlideTrigger = defineComponent({
  name: 'CarouselNextSlideTrigger',
  setup(_, { slots, attrs }) {
    const api = useCarouselContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'CarouselNextSlideTrigger')

      return h(DefaultSlot, { ...api.value.nextTriggerProps, ...attrs })
    }
  },
})
