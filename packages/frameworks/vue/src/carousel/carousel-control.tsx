import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { carouselAnatomy } from './carousel.anatomy'

export type CarouselControlProps = HTMLArkProps<'div'>

export const CarouselControl = defineComponent({
  name: 'CarouselControl',
  setup(_, { slots, attrs }) {
    return () => (
      <ark.div {...carouselAnatomy.build().control.attrs} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
