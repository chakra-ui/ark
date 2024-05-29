import * as pagination from '@zag-js/pagination'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps, useId } from '../../utils'
import type { RootEmits } from './pagination'

export interface UsePaginationProps
  extends Optional<Omit<pagination.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial page of the pagination when it is first rendered.
   * Use when you do not need to control the state of the pagination.
   */
  defaultPage?: pagination.Context['page']
}
export interface UsePaginationReturn extends ComputedRef<pagination.Api<PropTypes>> {}

export const usePagination = (
  props: UsePaginationProps,
  emit: EmitFn<RootEmits>,
): UsePaginationReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<pagination.Context>(() => ({
    id,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    onPageChange: (details) => emit('pageChange', details),
    value: props.defaultPage,
    ...cleanProps(props),
  }))

  const [state, send] = useMachine(pagination.machine(context.value), { context })

  return computed(() => pagination.connect(state.value, send, normalizeProps))
}
