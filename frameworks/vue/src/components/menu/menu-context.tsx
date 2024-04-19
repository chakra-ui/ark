import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseMenuContext, useMenuContext } from './use-menu-context'

export type MenuContextProps = SlotsType<{
  default: UnwrapRef<UseMenuContext>
}>

export const MenuContext = defineComponent(
  (_, { slots }) => {
    const menu = useMenuContext()

    return () => slots.default(menu.value)
  },
  {
    name: 'MenuContext',
    slots: Object as MenuContextProps,
  },
)
