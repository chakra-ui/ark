import * as carousel from '@zag-js/carousel'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './carousel.types'

export interface UseCarouselProps
  extends Optional<Omit<carousel.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial page of the carousel when it is first rendered.
   * Use this when you do not need to control the state of the carousel.
   */
  defaultPage?: carousel.Context['page']
}
export interface UseCarouselReturn extends ComputedRef<carousel.Api<PropTypes>> {}

export const useCarousel = (
  props: UseCarouselProps = {},
  emit?: EmitFn<RootEmits>,
): UseCarouselReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const context = computed<carousel.Context>(() => ({
    id,
    dir: locale.value.dir,
    index: props.defaultPage,
    getRootNode: env?.value.getRootNode,
    onAutoplayStatusChange: (details) => emit?.('autoplayStatusChange', details),
    onDragStatusChange: (details) => emit?.('dragStatusChange', details),
    onPageChange: (details) => {
      emit?.('pageChange', details)
      emit?.('update:page', details.page)
    },
    ...cleanProps(props),
  }))

  const [state, send] = useMachine(carousel.machine(context.value), { context })
  return computed(() => carousel.connect(state.value, send, normalizeProps))
}
