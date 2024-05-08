import * as pagination from '@zag-js/pagination'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './pagination'

export interface UsePaginationProps
  extends Optional<Omit<pagination.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UsePaginationReturn extends ComputedRef<pagination.Api<PropTypes>> {}

export const usePagination = (
  props: UsePaginationProps,
  emit: EmitFn<RootEmits>,
): UsePaginationReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<pagination.Context>(() => ({
    id: id.value,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    onPageChange: (details) => emit('pageChange', details),
    ...props,
  }))

  const [state, send] = useMachine(pagination.machine(context.value), { context })

  return computed(() => pagination.connect(state.value, send, normalizeProps))
}
