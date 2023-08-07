import { mergeProps } from '@zag-js/vue'
import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { carouselAnatomy } from './carousel.anatomy'

export type CarouselControlProps = HTMLArkProps<'div'>

export const CarouselControl = defineComponent({
  name: 'CarouselControl',
  setup(_, { slots, attrs }) {
    const mergedProps = computed(() => mergeProps(attrs, carouselAnatomy.build().control.attrs))

    return () => <ark.div {...mergedProps.value}>{slots.default?.()}</ark.div>
  },
})
