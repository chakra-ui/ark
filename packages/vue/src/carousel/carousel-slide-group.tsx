import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useCarouselContext } from './carousel-context'

export type CarouselSlideGroupProps = HTMLArkProps<'div'>

export const CarouselSlideGroup: ComponentWithProps<CarouselSlideGroupProps> = defineComponent({
  name: 'CarouselSlideGroup',
  setup(_, { slots, attrs }) {
    const api = useCarouselContext()

    return () => (
      <ark.div {...api.value.slideGroupProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
