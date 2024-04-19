import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { emits, props } from './carousel.props'
import { type UseCarouselProps, useCarousel } from './use-carousel'
import { CarouselProvider } from './use-carousel-context'

export interface CarouselRootProps extends Assign<HTMLArkProps<'div'>, UseCarouselProps> {}

export const CarouselRoot = defineComponent<CarouselRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useCarousel(props, emit)
    CarouselProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'CarouselRoot',
    props,
    emits,
  },
)
