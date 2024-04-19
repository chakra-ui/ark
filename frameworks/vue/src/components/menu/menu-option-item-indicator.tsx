import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useMenuContext } from './use-menu-context'
import { useMenuOptionItemPropsContext } from './use-menu-option-item-context'

export interface MenuOptionItemIndicatorProps extends HTMLArkProps<'div'> {}

export const MenuOptionItemIndicator = defineComponent<MenuOptionItemIndicatorProps>(
  (_, { slots, attrs }) => {
    const api = useMenuContext()
    const optionItemProps = useMenuOptionItemPropsContext()

    return () => (
      <ark.div {...api.value.getItemIndicatorProps(optionItemProps)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'MenuOptionItemIndicator',
  },
)
