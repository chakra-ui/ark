import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuTriggerItemContext } from './menu-context'

export interface MenuTriggerItemProps extends HTMLArkProps<'div'> {}

export const MenuTriggerItem = defineComponent<MenuTriggerItemProps>(
  (_, { slots, attrs }) => {
    const triggerItemProps = useMenuTriggerItemContext()

    return () => (
      <ark.div {...triggerItemProps.value} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'MenuTriggerItem',
  },
)
