import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselItemGroupProps = HTMLArkProps<'div'>

export const CarouselItemGroup = defineComponent({
  name: 'CarouselItemGroup',
  setup(_, { slots, attrs }) {
    const api = useCarouselContext()

    return () => (
      <ark.div {...api.value.itemGroupProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
