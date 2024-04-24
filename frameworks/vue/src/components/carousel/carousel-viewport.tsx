import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useCarouselContext } from './use-carousel-context'

export interface CarouselViewportProps extends HTMLArkProps<'div'> {}

export const CarouselViewport = defineComponent<CarouselViewportProps>(
  (_, { slots, attrs }) => {
    const api = useCarouselContext()

    return () => (
      <ark.div {...api.value.viewportProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'CarouselViewport',
  },
)
