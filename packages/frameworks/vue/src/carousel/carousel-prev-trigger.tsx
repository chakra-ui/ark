import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselPrevTriggerProps = HTMLArkProps<'button'>

export const CarouselPrevTrigger = defineComponent({
  name: 'CarouselPrevTrigger',
  setup(_, { slots, attrs }) {
    const api = useCarouselContext()

    return () => (
      <ark.button {...api.value.prevTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
