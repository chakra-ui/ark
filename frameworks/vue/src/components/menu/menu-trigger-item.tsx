import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuTriggerItemContext } from './use-menu-trigger-item-context'

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
