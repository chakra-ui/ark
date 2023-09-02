import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useCarouselContext } from './carousel-context'

export type CarouselSlideProps = Assign<HTMLArkProps<'div'>, { index: number }>

export const CarouselSlide = defineComponent({
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
      <ark.div {...api.value.getSlideProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
