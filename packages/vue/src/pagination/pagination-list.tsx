import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { parts } from './pagination.anatomy'

export type PaginationListProps = HTMLArkProps<'ul'>

export const PaginationList: ComponentWithProps<PaginationListProps> = defineComponent({
  name: 'PaginationList',
  setup(_, { slots, attrs }) {
    return () => (
      <ark.ul {...parts.list.attrs} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.ul>
    )
  },
})
