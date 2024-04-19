import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseMenuItemContext, useMenuItemContext } from './use-menu-item-context'

export type MenuItemContextProps = SlotsType<{
  default: UnwrapRef<UseMenuItemContext>
}>

export const MenuItemContext = defineComponent(
  (_, { slots }) => {
    const menuitem = useMenuItemContext()

    return () => slots.default(menuitem)
  },
  {
    name: 'MenuItemContext',
    slots: Object as MenuItemContextProps,
  },
)
