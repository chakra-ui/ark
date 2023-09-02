import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselNextSlideTriggerProps = HTMLArkProps<'button'>

export const CarouselNextSlideTrigger = defineComponent({
  name: 'CarouselNextSlideTrigger',
  setup(_, { slots, attrs }) {
    const api = useCarouselContext()

    return () => (
      <ark.button {...api.value.nextSlideTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
