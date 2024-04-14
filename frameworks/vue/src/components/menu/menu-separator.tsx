import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useMenuContext } from './menu-context'

export interface MenuSeparatorProps extends HTMLArkProps<'hr'> {}

export const MenuSeparator = defineComponent<MenuSeparatorProps>(
  (_, { attrs }) => {
    const api = useMenuContext()

    return () => <ark.hr {...api.value.separatorProps} {...attrs} />
  },
  {
    name: 'MenuSeparator',
  },
)
