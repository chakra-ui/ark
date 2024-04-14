import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useCarouselContext } from './carousel-context'

export interface CarouselIndicatorGroupProps extends HTMLArkProps<'div'> {}

export const CarouselIndicatorGroup = defineComponent<CarouselIndicatorGroupProps>(
  (_, { slots, attrs }) => {
    const api = useCarouselContext()

    return () => (
      <ark.div {...api.value.indicatorGroupProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'CarouselIndicatorGroup',
  },
)
