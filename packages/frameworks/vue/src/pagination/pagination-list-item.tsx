import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { parts } from './pagination.anatomy'

export type PaginationListItemProps = HTMLArkProps<'li'>

export const PaginationListItem: ComponentWithProps<PaginationListItemProps> = defineComponent({
  name: 'PaginationListItem',
  setup(_, { slots, attrs }) {
    return () => (
      <ark.li {...parts.list.attrs} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.li>
    )
  },
})
