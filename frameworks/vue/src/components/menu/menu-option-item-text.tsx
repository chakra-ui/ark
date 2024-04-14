import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useMenuContext } from './menu-context'
import { useMenuOptionItemPropsContext } from './use-menu-option-item-context'

export interface MenuOptionItemTextProps extends HTMLArkProps<'div'> {}

export const MenuOptionItemText = defineComponent<MenuOptionItemTextProps>(
  (_, { slots, attrs }) => {
    const api = useMenuContext()
    const optionItemProps = useMenuOptionItemPropsContext()

    return () => (
      <ark.div {...api.value.getItemTextProps(optionItemProps)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'MenuOptionItemText',
  },
)
