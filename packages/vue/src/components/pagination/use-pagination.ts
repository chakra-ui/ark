import * as pagination from '@zag-js/pagination'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ComputedRef,
  type MaybeRefOrGetter,
  computed,
  toValue,
  useId,
} from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers/index.ts'
import type { EmitFn, Optional } from '../../types.ts'
import { cleanProps } from '../../utils/clean-props.ts'
import type { RootEmits } from './pagination.ts'

/**
 * The anchor attributes the items and triggers accept, since they render as links under `type="link"`.
 */
export type PaginationAnchorProps = Omit<AnchorHTMLAttributes, keyof ButtonHTMLAttributes>

export interface UsePaginationProps extends Optional<Omit<pagination.Props, 'dir' | 'getRootNode'>, 'id'> {}
// zag v2 dropped `type` from the api; the items and triggers read it to pick their element
export interface UsePaginationApi extends pagination.Api<PropTypes> {
  type: NonNullable<pagination.Props['type']>
}
export interface UsePaginationReturn extends ComputedRef<UsePaginationApi> {}

export const usePagination = (
  props: MaybeRefOrGetter<UsePaginationProps> = {},
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
  return computed(() => ({ ...pagination.connect(service, normalizeProps), type: service.prop('type') }))
}
