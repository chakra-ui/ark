import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useCarouselContext } from './carousel-context'

export interface CarouselNextTriggerProps extends HTMLArkProps<'button'> {}

export const CarouselNextTrigger = defineComponent<CarouselNextTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useCarouselContext()

    return () => (
      <ark.button {...api.value.nextTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'CarouselNextTrigger',
  },
)
