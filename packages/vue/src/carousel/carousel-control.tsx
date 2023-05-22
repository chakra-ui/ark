import { mergeProps } from '@zag-js/vue'
import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'
import { carouselAnatomy } from './carousel.anatomy'

export type CarouselControlProps = HTMLArkProps<'div'>

export const CarouselControl = defineComponent({
  name: 'CarouselControl',
  setup(_, { slots, attrs }) {
    const api = useCarouselContext()

    const mergedProps = computed(() =>
      mergeProps(api.value.nextTriggerProps, attrs, carouselAnatomy.build().control.attrs),
    )

    return () => {
      return () => <ark.div {...mergedProps.value}>{slots.default?.()}</ark.div>
    }
  },
})
