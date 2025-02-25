import * as carousel from '@zag-js/carousel'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './carousel.types'

export interface UseCarouselProps extends Optional<Omit<carousel.Props, 'dir' | 'getRootNode' | 'page'>, 'id'> {
  /**
   * The model value of the carousel
   */
  modelValue?: carousel.Props['page']
}
export interface UseCarouselReturn extends ComputedRef<carousel.Api<PropTypes>> {}

export const useCarousel = (props: UseCarouselProps, emit?: EmitFn<RootEmits>): UseCarouselReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const context = computed<carousel.Props>(() => ({
    id,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    page: props.modelValue,
    onAutoplayStatusChange: (details) => emit?.('autoplayStatusChange', details),
    onDragStatusChange: (details) => emit?.('dragStatusChange', details),
    onPageChange: (details) => {
      emit?.('pageChange', details)
      emit?.('update:page', details.page) // TODO: remove this
      emit?.('update:modelValue', details.page)
    },
    ...cleanProps(props),
  }))

  const service = useMachine(carousel.machine, context)
  return computed(() => carousel.connect(service, normalizeProps))
}
