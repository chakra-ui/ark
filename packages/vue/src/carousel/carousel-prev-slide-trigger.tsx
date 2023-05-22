import { computed, defineComponent, mergeProps } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useCarouselContext } from './carousel-context'

export type CarouselPrevSlideTriggerProps = HTMLArkProps<'button'>

export const CarouselPrevSlideTrigger = defineComponent({
  name: 'CarouselPrevSlideTrigger',
  setup(_, { slots, attrs }) {
    const api = useCarouselContext()
    const mergedProps = computed(() => mergeProps(api.value.nextTriggerProps, attrs))
    return () => {
      return () => <ark.button {...mergedProps.value}>{slots.default?.()}</ark.button>
    }
  },
})
