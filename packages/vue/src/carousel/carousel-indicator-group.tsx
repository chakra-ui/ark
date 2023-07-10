import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useCarouselContext } from './carousel-context'

export type CarouselIndicatorGroupProps = HTMLArkProps<'div'>

export const CarouselIndicatorGroup: ComponentWithProps<CarouselIndicatorGroupProps> = defineComponent({
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
