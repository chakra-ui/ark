import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useCarouselContext } from './carousel-context'

export type CarouselViewportProps = HTMLArkProps<'div'>

export const CarouselViewport: ComponentWithProps<CarouselViewportProps> = defineComponent({
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
