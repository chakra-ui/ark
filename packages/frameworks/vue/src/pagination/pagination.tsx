import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { PaginationProvider } from './pagination-context'
import { emits, props } from './pagination.props'
import { usePagination, type UsePaginationProps } from './use-pagination'

export type PaginationProps = Assign<HTMLArkProps<'nav'>, UsePaginationProps>

export const Pagination = defineComponent({
  name: 'Pagination',
  props,
  emits,
  setup(props, { slots, attrs, emit }) {
    const api = usePagination(props, emit)
    PaginationProvider(api)

    return () => (
      <ark.nav {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.nav>
    )
  },
})
