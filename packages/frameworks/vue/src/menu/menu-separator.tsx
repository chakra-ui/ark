import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useMenuContext } from './menu-context'

export interface MenuSeparatorProps extends HTMLArkProps<'hr'> {}

export const MenuSeparator = defineComponent({
  name: 'MenuSeparator',
  setup(_, { attrs }) {
    const api = useMenuContext()

    return () => <ark.hr {...api.value.separatorProps} {...attrs} />
  },
})
