import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { PaginationProvider } from './pagination-context'
import { usePagination, type UsePaginationProps } from './use-pagination'

export type PaginationProps = Assign<HTMLArkProps<'nav'>, UsePaginationProps>

const VueProps = createVueProps<PaginationProps>({
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
})

export const Pagination: ComponentWithProps<Partial<PaginationProps>> = defineComponent({
  name: 'Pagination',
  props: VueProps,
  emits: ['change', 'update:modelValue'],
  setup(props, { slots, attrs, emit }) {
    const api = usePagination(emit, props)

    PaginationProvider(api)

    return () => (
      <ark.nav {...api.value.rootProps} {...attrs}>
        {slots?.default?.(api.value)}
      </ark.nav>
    )
  },
})
