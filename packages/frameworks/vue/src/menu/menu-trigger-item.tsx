import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useMenuTriggerItemContext } from './menu-context'

export interface MenuTriggerItemProps extends HTMLArkProps<'div'> {}

export const MenuTriggerItem: ComponentWithProps<MenuTriggerItemProps> = defineComponent({
  name: 'MenuTriggerItem',
  setup(_, { slots, attrs }) {
    const triggerItemProps = useMenuTriggerItemContext()

    return () => (
      <ark.div {...triggerItemProps.value} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
