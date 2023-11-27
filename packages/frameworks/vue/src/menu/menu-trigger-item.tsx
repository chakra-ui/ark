import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useMenuTriggerItemContext } from './menu-context'

export type MenuTriggerItemProps = HTMLArkProps<'div'>

export const MenuTriggerItem: ComponentWithProps<MenuTriggerItemProps> = defineComponent({
  name: 'MenuTriggerItem',
  setup(_, { slots, attrs }) {
    const getTriggerItemProps = useMenuTriggerItemContext()

    return () => (
      <ark.div {...getTriggerItemProps()} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
