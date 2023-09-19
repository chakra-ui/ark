import { paginationAnatomy } from '@ark-ui/anatomy'
import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'

export type PaginationListItemProps = HTMLArkProps<'li'>

export const PaginationListItem: ComponentWithProps<PaginationListItemProps> = defineComponent({
  name: 'PaginationListItem',
  setup(_, { slots, attrs }) {
    return () => (
      <ark.li {...paginationAnatomy.build().list.attrs} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.li>
    )
  },
})
