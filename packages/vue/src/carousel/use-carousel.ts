import * as carousel from '@zag-js/carousel'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { generateEventMap, useId } from '../utils'
import { emits } from './carousel.props'

export type UseCarouselProps = Optional<carousel.Context, 'id'>
export type UseCarouselReturn = ComputedRef<carousel.Api<PropTypes>>

export const useCarousel = (props: UseCarouselProps, emit: CallableFunction): UseCarouselReturn => {
  const getRootNode = useEnvironmentContext()
  const context = ref(props)
  const eventMap = generateEventMap(emits, emit)

  const [state, send] = useMachine(
    carousel.machine({
      id: useId().value,
      getRootNode,
      ...context.value,
      ...eventMap,
    }),
    { context },
  )
  return computed(() => carousel.connect(state.value, send, normalizeProps))
}
