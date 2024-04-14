import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useMenuContext } from './menu-context'

export interface MenuContextTriggerProps extends HTMLArkProps<'button'> {}

export const MenuContextTrigger = defineComponent<MenuContextTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useMenuContext()

    return () => (
      <ark.button {...api.value.contextTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'MenuContextTrigger',
  },
)
