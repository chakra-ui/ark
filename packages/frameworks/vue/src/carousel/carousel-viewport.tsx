import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export interface CarouselViewportProps extends HTMLArkProps<'div'> {}

export const CarouselViewport = defineComponent({
  name: 'CarouselViewport',
  setup(_, { slots, attrs }) {
    const api = useCarouselContext()

    return () => (
      <ark.div {...api.value.viewportProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
