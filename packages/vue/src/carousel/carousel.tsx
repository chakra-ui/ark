import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import type { ComponentWithProps } from '../utils'
import { CarouselProvider } from './carousel-context'
import { useCarousel, type UseCarouselContext } from './use-carousel'

export type CarouselProps = Assign<HTMLArkProps<'div'>, UseCarouselContext>

export const Carousel: ComponentWithProps<CarouselProps> = defineComponent({
  name: 'Carousel',
  props: {
    align: {
      type: String as PropType<CarouselProps['align']>,
    },
    dir: {
      type: String as PropType<CarouselProps['dir']>,
    },
    getRootNode: {
      type: Function as PropType<CarouselProps['getRootNode']>,
    },
    id: {
      type: String as PropType<CarouselProps['id']>,
    },
    index: {
      type: Number as PropType<CarouselProps['index']>,
    },
    loop: {
      type: Boolean as PropType<CarouselProps['loop']>,
    },
    orientation: {
      type: String as PropType<CarouselProps['orientation']>,
    },
    slidesPerView: {
      type: Number as PropType<CarouselProps['slidesPerView']>,
    },
    spacing: {
      type: String as PropType<CarouselProps['spacing']>,
    },
  },
  emits: ['slide-change'],
  setup(props, { slots, attrs, emit }) {
    const api = useCarousel(emit, props)

    CarouselProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.({ ...api.value })}
      </ark.div>
    )
  },
})
