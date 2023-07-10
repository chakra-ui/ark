import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import type { ComponentWithProps } from '../utils'
import { useCarouselContext } from './carousel-context'

export type CarouselIndicatorProps = Assign<HTMLArkProps<'button'>, { index: number }>

export const CarouselIndicator: ComponentWithProps<CarouselIndicatorProps> = defineComponent({
  name: 'CarouselIndicator',
  props: {
    index: {
      type: Number as PropType<CarouselIndicatorProps['index']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useCarouselContext()

    return () => (
      <ark.button {...api.value.getIndicatorProps({ index: props.index })} {...attrs} onClick={() => api.value.scrollTo(props.index)}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
