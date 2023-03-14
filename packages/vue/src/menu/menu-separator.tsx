import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useMenuContext } from './menu-context'

export type MenuSeparatorProps = HTMLArkProps<'hr'>

export const MenuSeparator: ComponentWithProps<MenuSeparatorProps> = defineComponent({
  name: 'MenuSeparator',
  setup(_, { attrs }) {
    const api = useMenuContext()

    return () => <ark.hr {...api.value.separatorProps} {...attrs} />
  },
})
