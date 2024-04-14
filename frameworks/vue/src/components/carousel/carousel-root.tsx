import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { CarouselProvider } from './carousel-context'
import { emits, props } from './carousel.props'
import { type UseCarouselProps, useCarousel } from './use-carousel'

export interface CarouselRootProps extends Assign<HTMLArkProps<'div'>, UseCarouselProps> {}

export const CarouselRoot = defineComponent<CarouselRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useCarousel(props, emit)
    CarouselProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
  {
    name: 'CarouselRoot',
    props,
    emits,
  },
)
