import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselPrevSlideTriggerProps = HTMLArkProps<'button'>

export const CarouselPrevSlideTrigger = defineComponent({
  name: 'CarouselPrevSlideTrigger',
  setup(_, { slots, attrs }) {
    const api = useCarouselContext()

    return () => (
      <ark.button {...api.value.prevSlideTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
