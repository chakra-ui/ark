import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export interface MenuArrowTipProps extends HTMLArkProps<'div'> {}

export const MenuArrowTip = defineComponent<MenuArrowTipProps>(
  (_, { slots, attrs }) => {
    const api = useMenuContext()

    return () => (
      <ark.div {...api.value.arrowTipProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'MenuArrowTip',
  },
)
