import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useMenuContext } from './menu-context'

export type MenuArrowProps = HTMLArkProps<'div'>

export const MenuArrow: ComponentWithProps<MenuArrowProps> = defineComponent({
  name: 'MenuArrow',
  setup(_, { slots, attrs }) {
    const api = useMenuContext()

    return () => (
      <ark.div {...api.value.arrowProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
