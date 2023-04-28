import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { PaginationProvider } from './pagination-context'
import { usePagination, type UsePaginationContext } from './use-pagination'

export type PaginationProps = Assign<HTMLArkProps<'nav'>, UsePaginationContext>

export const Pagination: ComponentWithProps<PaginationProps> = defineComponent({
  name: 'Pagination',
  props: {
    count: {
      type: Number as PropType<PaginationProps['count']>,
      required: true,
    },
    dir: {
      type: String as PropType<PaginationProps['dir']>,
    },
    getRootNode: {
      type: Function as PropType<PaginationProps['getRootNode']>,
    },
    id: {
      type: String as PropType<PaginationProps['id']>,
    },
    ids: {
      type: Object as PropType<PaginationProps['ids']>,
    },
    page: {
      type: Number as PropType<PaginationProps['page']>,
    },
    pageSize: {
      type: Number as PropType<PaginationProps['pageSize']>,
    },
    siblingCount: {
      type: Number as PropType<PaginationProps['siblingCount']>,
    },
    translations: {
      type: Object as PropType<PaginationProps['translations']>,
    },
  },
  emits: ['change'],
  setup(props, { slots, attrs, emit, expose }) {
    const api = usePagination(emit, props)

    expose({
      context: api,
    })

    PaginationProvider(api)

    return () => (
      <ark.nav {...api.value.rootProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.nav>
    )
  },
})
