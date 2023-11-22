import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export interface CarouselIndicatorGroupProps extends HTMLArkProps<'div'> {}

export const CarouselIndicatorGroup = defineComponent({
  name: 'CarouselIndicatorGroup',
  setup(_, { slots, attrs }) {
    const api = useCarouselContext()

    return () => (
      <ark.div {...api.value.indicatorGroupProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
