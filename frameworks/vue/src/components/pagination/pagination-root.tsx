import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import type { Assign } from '../../types'
import { PaginationProvider } from './pagination-context'
import { emits, props } from './pagination.props'
import { type UsePaginationProps, usePagination } from './use-pagination'

export interface PaginationRootProps extends Assign<HTMLArkProps<'nav'>, UsePaginationProps> {}

export const PaginationRoot = defineComponent<PaginationRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = usePagination(props, emit)
    PaginationProvider(api)

    return () => (
      <ark.nav {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.nav>
    )
  },
  {
    name: 'PaginationRoot',
    props,
    emits,
  },
)
