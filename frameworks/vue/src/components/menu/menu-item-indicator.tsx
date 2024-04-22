import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuOptionItemPropsContext } from './use-menu-option-item-props-context'

export interface MenuItemIndicatorProps extends HTMLArkProps<'div'> {}

export const MenuItemIndicator = defineComponent<MenuItemIndicatorProps>(
  (_, { slots, attrs }) => {
    const api = useMenuContext()
    const optionItemProps = useMenuOptionItemPropsContext()

    return () => (
      <ark.div {...api.value.getItemIndicatorProps(optionItemProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'MenuItemIndicator',
  },
)
