import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export interface CarouselNextTriggerProps extends HTMLArkProps<'button'> {}

export const CarouselNextTrigger = defineComponent({
  name: 'CarouselNextTrigger',
  setup(_, { slots, attrs }) {
    const api = useCarouselContext()

    return () => (
      <ark.button {...api.value.nextTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
