import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useCarouselContext } from './carousel-context'

export type CarouselItemProps = Assign<HTMLArkProps<'div'>, { index: number }>

export const CarouselItem = defineComponent({
  name: 'CarouselItem',
  props: {
    index: {
      type: Number as PropType<CarouselItemProps['index']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useCarouselContext()

    return () => (
      <ark.div {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
