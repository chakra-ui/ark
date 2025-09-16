import * as pagination from '@zag-js/pagination'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils/clean-props'
import type { RootEmits } from './pagination'

export interface UsePaginationProps extends Optional<Omit<pagination.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UsePaginationReturn extends ComputedRef<pagination.Api<PropTypes>> {}

export const usePagination = (
  props: MaybeRef<UsePaginationProps> = {},
  emit?: EmitFn<RootEmits>,
): UsePaginationReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<pagination.Props>(() => {
    const localeProps = toValue<UsePaginationProps>(props)

    return {
      id,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localeProps),
      onPageChange: (details) => {
        emit?.('pageChange', details)
        emit?.('update:page', details.page)
        localeProps.onPageChange?.(details)
      },
      onPageSizeChange: (details) => {
        emit?.('pageSizeChange', details)
        emit?.('update:pageSize', details.pageSize)
        localeProps.onPageSizeChange?.(details)
      },
    }
  })

  const service = useMachine(pagination.machine, context)
  return computed(() => pagination.connect(service, normalizeProps))
}
