import { carouselAnatomy } from '@ark-ui/anatomy'
import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'

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
