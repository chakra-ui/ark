import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useMenuContext } from './menu-context'

export interface MenuArrowProps extends HTMLArkProps<'div'> {}

export const MenuArrow = defineComponent<MenuArrowProps>(
  (_, { slots, attrs }) => {
    const api = useMenuContext()

    return () => (
      <ark.div {...api.value.arrowProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'MenuArrow',
  },
)
