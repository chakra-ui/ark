import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useMenuContext } from './menu-context'

export interface MenuIndicatorProps extends HTMLArkProps<'div'> {}

export const MenuIndicator = defineComponent<MenuIndicatorProps>(
  (_, { slots, attrs }) => {
    const api = useMenuContext()

    return () => (
      <ark.div {...api.value.indicatorProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'MenuIndicator',
  },
)
