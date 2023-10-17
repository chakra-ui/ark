import * as carousel from '@zag-js/carousel'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseCarouselProps = Optional<carousel.Context, 'id'>
export type UseCarouselReturn = ComputedRef<carousel.Api<PropTypes>>

export const useCarousel = (props: UseCarouselProps, emit: CallableFunction): UseCarouselReturn => {
  const getRootNode = useEnvironmentContext()
  const context = ref(props)

  const [state, send] = useMachine(
    carousel.machine({
      id: useId().value,
      getRootNode,
      ...context.value,
      onIndexChange: (details) => {
        emit('index-change', details)
      },
    }),
    { context },
  )
  return computed(() => carousel.connect(state.value, send, normalizeProps))
}
