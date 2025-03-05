import * as pagination from '@zag-js/pagination'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './pagination'

export interface UsePaginationProps extends Optional<Omit<pagination.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UsePaginationReturn extends ComputedRef<pagination.Api<PropTypes>> {}

export const usePagination = (props: UsePaginationProps, emit?: EmitFn<RootEmits>): UsePaginationReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<pagination.Props>(() => ({
    id,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    ...cleanProps(props),
    onPageChange: (details) => {
      emit?.('pageChange', details)
      emit?.('update:page', details.page)
      props.onPageChange?.(details)
    },
    onPageSizeChange: (details) => {
      emit?.('pageSizeChange', details)
      emit?.('update:pageSize', details.pageSize)
      props.onPageSizeChange?.(details)
    },
  }))

  const service = useMachine(pagination.machine, context)

  return computed(() => pagination.connect(service, normalizeProps))
}
