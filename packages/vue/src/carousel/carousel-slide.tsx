import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import type { ComponentWithProps } from '../utils'
import { useCarouselContext } from './carousel-context'

export type CarouselSlideProps = Assign<HTMLArkProps<'div'>, { index: number }>

export const CarouselSlide: ComponentWithProps<CarouselSlideProps> = defineComponent({
  name: 'CarouselSlide',
  props: {
    index: {
      type: Number as PropType<CarouselSlideProps['index']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useCarouselContext()

    return () => (
      <ark.div {...api.value.getSlideProps({ index: props.index })} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
