import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useCarouselContext } from './carousel-context'

export interface CarouselItemGroupProps extends HTMLArkProps<'div'> {}

export const CarouselItemGroup = defineComponent<CarouselItemGroupProps>(
  (_, { slots, attrs }) => {
    const api = useCarouselContext()

    return () => (
      <ark.div {...api.value.itemGroupProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'CarouselItemGroup',
  },
)
