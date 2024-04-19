import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { emits, props } from './pagination.props'
import { type UsePaginationProps, usePagination } from './use-pagination'
import { PaginationProvider } from './use-pagination-context'

export interface PaginationRootProps extends Assign<HTMLArkProps<'nav'>, UsePaginationProps> {}

export const PaginationRoot = defineComponent<PaginationRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = usePagination(props, emit)
    PaginationProvider(api)

    return () => (
      <ark.nav {...api.value.rootProps} {...attrs}>
        {slots.default?.()}
      </ark.nav>
    )
  },
  {
    name: 'PaginationRoot',
    props,
    emits,
  },
)
