import * as carousel from '@zag-js/carousel'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './carousel.types'

export interface UseCarouselProps
  extends Optional<Omit<carousel.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial index of the carousel when it is first rendered.
   * Use this when you do not need to control the state of the carousel.
   */
  defaultIndex?: carousel.Context['index']
}
export interface UseCarouselReturn extends ComputedRef<carousel.Api<PropTypes>> {}

export const useCarousel = (
  props: UseCarouselProps,
  emit: EmitFn<RootEmits>,
): UseCarouselReturn => {
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const context = ref(props)

  const [state, send] = useMachine(
    carousel.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      dir: locale.value.dir,
      index: props.index ?? props.defaultIndex,
      getRootNode: env?.value.getRootNode,
      onIndexChange: (details) => emit('indexChange', details),
    }),
    { context },
  )
  return computed(() => carousel.connect(state.value, send, normalizeProps))
}
