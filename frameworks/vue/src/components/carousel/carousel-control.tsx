import { carouselAnatomy } from '@ark-ui/anatomy'
import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'

export interface CarouselControlProps extends HTMLArkProps<'div'> {}

export const CarouselControl = defineComponent<CarouselControlProps>(
  (_, { slots, attrs }) => {
    return () => (
      <ark.div {...carouselAnatomy.build().control.attrs} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'CarouselControl',
  },
)
