import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuItemGroupContext } from './use-menu-item-group-context'

export interface MenuItemGroupLabelProps extends HTMLArkProps<'div'> {}

export const MenuItemGroupLabel = defineComponent<MenuItemGroupLabelProps>(
  (_, { slots, attrs }) => {
    const api = useMenuContext()
    const itemGroup = useMenuItemGroupContext()

    return () => (
      <ark.div {...api.value.getItemGroupLabelProps({ htmlFor: itemGroup.id })} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'MenuItemGroupLabel',
  },
)
