import { mergeProps } from '@zag-js/vue'
import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselNextSlideTriggerProps = HTMLArkProps<'button'>

export const CarouselNextSlideTrigger = defineComponent({
  name: 'CarouselNextSlideTrigger',
  setup(_, { slots, attrs }) {
    const api = useCarouselContext()
    const mergedProps = computed(() => mergeProps(api.value.nextTriggerProps, attrs))
    return () => {
      return () => <ark.button {...mergedProps.value}>{slots.default?.()}</ark.button>
    }
  },
})
