import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useCarouselContext } from './carousel-context'

export interface CarouselPrevTriggerProps extends HTMLArkProps<'button'> {}

export const CarouselPrevTrigger = defineComponent<CarouselPrevTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useCarouselContext()

    return () => (
      <ark.button {...api.value.prevTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'CarouselPrevTrigger',
  },
)
