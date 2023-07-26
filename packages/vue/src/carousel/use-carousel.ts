import * as carousel from '@zag-js/carousel'
import { normalizeProps, useMachine } from '@zag-js/vue'
import { computed, reactive } from 'vue'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseCarouselContext = Optional<carousel.Context, 'id'>

export const useCarousel = (emit: CallableFunction, context: UseCarouselContext) => {
  const reactiveContext = reactive(context)

  const [state, send] = useMachine(
    carousel.machine({
      ...reactiveContext,
      getRootNode: reactiveContext.getRootNode,
      id: reactiveContext.id || useId().value,
      onSlideChange(details) {
        emit('slide-change', details)
      },
    }),
  )

  return computed(() => carousel.connect(state.value, send, normalizeProps))
}

export type UseCarouselReturn = ReturnType<typeof useCarousel>
