import * as carousel from '@zag-js/carousel'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './carousel.types'

export interface UseCarouselProps extends Optional<carousel.Context, 'id'> {}
export interface UseCarouselReturn extends ComputedRef<carousel.Api<PropTypes>> {}

export const useCarousel = (
  props: UseCarouselProps,
  emit: EmitFn<RootEmits>,
): UseCarouselReturn => {
  const env = useEnvironmentContext()
  const context = ref(props)

  const [state, send] = useMachine(
    carousel.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode: env?.value.getRootNode,
      onIndexChange: (details) => {
        emit('indexChange', details)
      },
    }),
    { context },
  )
  return computed(() => carousel.connect(state.value, send, normalizeProps))
}
