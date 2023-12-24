import type { ItemProps } from '@zag-js/carousel'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useCarouselContext } from './carousel-context'

export interface CarouselItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const CarouselItem = defineComponent<CarouselItemProps>(
  (props, { slots, attrs }) => {
    const api = useCarouselContext()

    return () => (
      <ark.div {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'CarouselItem',
    props: {
      index: {
        type: Number as PropType<CarouselItemProps['index']>,
        required: true,
      },
    },
  },
)
