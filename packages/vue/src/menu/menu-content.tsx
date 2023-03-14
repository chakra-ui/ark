import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { useMenuContext } from './menu-context'

export type MenuContentProps = HTMLArkProps<'div'>

export const MenuContent: ComponentWithProps<MenuContentProps> = defineComponent({
  name: 'MenuContent',
  setup(_, { slots, attrs }) {
    const api = useMenuContext()

    return () => (
      <ark.div {...api.value.contentProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
