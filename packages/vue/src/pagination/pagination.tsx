import type { Context as PaginationContext } from '@zag-js/pagination'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign, type Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { PaginationProvider } from './pagination-context'
import { usePagination } from './use-pagination'

export type UsePaginationProps = Assign<HTMLArkProps<'nav'>, PaginationContext>

const VueProps = createVueProps<UsePaginationProps>({
  count: {
    type: Number as PropType<UsePaginationProps['count']>,
    required: true,
  },
  dir: {
    type: String as PropType<UsePaginationProps['dir']>,
  },
  getRootNode: {
    type: Function as PropType<UsePaginationProps['getRootNode']>,
  },
  id: {
    type: String as PropType<UsePaginationProps['id']>,
  },
  ids: {
    type: Object as PropType<UsePaginationProps['ids']>,
  },
  page: {
    type: Number as PropType<UsePaginationProps['page']>,
  },
  pageSize: {
    type: Number as PropType<UsePaginationProps['pageSize']>,
  },
  siblingCount: {
    type: Number as PropType<UsePaginationProps['siblingCount']>,
  },
  translations: {
    type: Object as PropType<UsePaginationProps['translations']>,
  },
})

export const Pagination: ComponentWithProps<Partial<UsePaginationProps>> = defineComponent({
  name: 'Pagination',
  props: VueProps,
  emits: ['change'],
  setup(props, { slots, attrs, emit }) {
    const api = usePagination(emit, props)

    PaginationProvider(api)

    return () => (
      <ark.nav {...api.value.rootProps} {...attrs}>
        {() => slots?.default?.(api.value)}
      </ark.nav>
    )
  },
})

export type PaginationProps = Optional<PaginationContext, 'id'>
